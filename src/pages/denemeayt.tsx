"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination"
import { format, parseISO, startOfWeek, startOfMonth } from "date-fns"
import { tr } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type ViewMode = "all" | "week" | "month"
type Bolum = "sayisal" | "ea" | "sozel" | "dil"

type Row = {
  ad: string
  tarih: string
  genelNet: number
  dersNetleri: Record<string, number | null>
}

const AYT_FIELDS: Record<Bolum, string[]> = {
  sayisal: ["Matematik", "Fizik", "Kimya", "Biyoloji"],
  ea: ["Matematik", "Edebiyat", "Tarih-1", "Coğrafya-1"],
  sozel: ["Edebiyat", "Tarih", "Coğrafya", "Felsefe"],
  dil: ["Dil"],
}

const chartConfig = { AYT: { label: "AYT Net", color: "var(--chart-1)" } }

function toTrDateLabel(value: string | number | Date) {
  return new Date(value).toLocaleDateString("tr-TR", { month: "short", day: "numeric" })
}

function groupBy(rows: Row[], mode: ViewMode) {
  if (mode === "all") return rows.map(r => ({ key: r.tarih, date: r.tarih, AYT: r.genelNet }))
  const map = new Map<string, { sum: number; count: number; anyDate: string }>()
  for (const r of rows) {
    const d = parseISO(r.tarih)
    const bucket = mode === "week" ? startOfWeek(d, { weekStartsOn: 1 }) : startOfMonth(d)
    const key = bucket.toISOString().slice(0, 10)
    const item = map.get(key) || { sum: 0, count: 0, anyDate: key }
    item.sum += r.genelNet
    item.count += 1
    map.set(key, item)
  }
  return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([key, v]) => ({ key, date: v.anyDate, AYT: v.sum / v.count }))
}

const seedRows: Row[] = [
  { ad: "AYT Deneme 1", tarih: "2024-07-01", dersNetleri: { Matematik: 32.5, Fizik: 10.2, Kimya: 11.1, Biyoloji: 12.0 }, genelNet: 65.8 },
  { ad: "AYT Deneme 2", tarih: "2024-07-04", dersNetleri: { Matematik: 31.0, Fizik: 9.8, Kimya: 10.6, Biyoloji: 11.4 }, genelNet: 62.8 },
  { ad: "AYT Deneme 3", tarih: "2024-07-07", dersNetleri: { Matematik: 33.1, Fizik: 10.7, Kimya: 11.4, Biyoloji: 12.3 }, genelNet: 67.5 },
  { ad: "AYT Deneme 4", tarih: "2024-07-10", dersNetleri: { Matematik: 34.0, Fizik: 11.0, Kimya: 11.9, Biyoloji: 12.5 }, genelNet: 69.4 },
  { ad: "AYT Deneme 5", tarih: "2024-07-13", dersNetleri: { Matematik: 29.7, Fizik: 9.1, Kimya: 10.0, Biyoloji: 10.9 }, genelNet: 59.7 },
  { ad: "AYT Deneme 6", tarih: "2024-07-16", dersNetleri: { Matematik: 35.2, Fizik: 11.6, Kimya: 12.1, Biyoloji: 12.8 }, genelNet: 71.7 },
  { ad: "AYT Deneme 7", tarih: "2024-07-19", dersNetleri: { Matematik: 33.9, Fizik: 10.9, Kimya: 11.7, Biyoloji: 12.4 }, genelNet: 68.9 },
  { ad: "AYT Deneme 8", tarih: "2024-07-22", dersNetleri: { Matematik: 34.6, Fizik: 11.2, Kimya: 11.9, Biyoloji: 12.6 }, genelNet: 70.3 },
  { ad: "AYT Deneme 9", tarih: "2024-07-25", dersNetleri: { Matematik: 36.0, Fizik: 11.9, Kimya: 12.3, Biyoloji: 12.9 }, genelNet: 73.1 },
  { ad: "AYT Deneme 10", tarih: "2024-07-28", dersNetleri: { Matematik: 35.5, Fizik: 11.5, Kimya: 12.0, Biyoloji: 12.7 }, genelNet: 71.7 },
  { ad: "AYT Deneme 11", tarih: "2024-07-31", dersNetleri: { Matematik: 34.2, Fizik: 10.8, Kimya: 11.5, Biyoloji: 12.3 }, genelNet: 68.8 },
  { ad: "AYT Deneme 12", tarih: "2024-08-03", dersNetleri: { Matematik: 37.0, Fizik: 12.1, Kimya: 12.5, Biyoloji: 13.1 }, genelNet: 74.7 },
]

export default function DenemeAYT() {
  const [bolum, setBolum] = useState<Bolum>("sayisal")
  const [rows, setRows] = useState<Row[]>(seedRows)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [viewMode, setViewMode] = useState<ViewMode>("all")
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const pageCount = Math.max(1, Math.ceil(rows.length / perPage))
  const start = (page - 1) * perPage
  const current = rows.slice(start, start + perPage)

  React.useEffect(() => {
    if (page > pageCount) setPage(pageCount)
  }, [page, pageCount])

  const go = (p: number) => setPage(Math.min(Math.max(1, p), pageCount))
  const windowSize = 2
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1).filter(
      (p) => p === 1 || p === pageCount || (p >= page - windowSize && p <= page + windowSize)
  )

  const dersler = AYT_FIELDS[bolum]
  const mainChartData = useMemo(() => groupBy(rows, viewMode), [rows, viewMode])

  const perLessonSeries = useMemo(() => {
    const series: Record<string, { date: string; v: number }[]> = {}
    for (const d of dersler) series[d] = []
    for (const r of rows) {
      for (const d of dersler) {
        const v = r.dersNetleri[d]
        if (typeof v === "number") series[d].push({ date: r.tarih, v })
      }
    }
    return series
  }, [rows, dersler])

  const [form, setForm] = useState<Record<string, string>>({ ad: "", tarih: "" })

  function parseNum(v: string) { const n = Number(v.replace(",", ".")); return isNaN(n) ? 0 : n }
  function net(d: number, y: number) { return d - y / 4 }

  function addRow() {
    if (!form.ad || !form.tarih) return
    const dersNetleri: Record<string, number> = {}
    let total = 0
    for (const d of dersler) {
      const dogru = parseNum(form[`${d}-D`] || "0")
      const yanlis = parseNum(form[`${d}-Y`] || "0")
      const n = net(dogru, yanlis)
      dersNetleri[d] = Number(n.toFixed(2))
      total += n
    }
    const newRow: Row = { ad: form.ad, tarih: form.tarih, genelNet: Number(total.toFixed(2)), dersNetleri }
    setRows(prev => [newRow, ...prev])
    setOpenDrawer(false)
  }

  return (
      <main className="container mx-auto px-4 py-6 space-y-10">
          <Card>
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <CardTitle>AYT Deneme Netleri</CardTitle>
                <Select value={bolum} onValueChange={(v) => setBolum(v as Bolum)}>
                  <SelectTrigger className="w-[160px]"><SelectValue placeholder="Bölüm" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sayisal">Sayısal</SelectItem>
                    <SelectItem value="ea">EA</SelectItem>
                    <SelectItem value="sozel">Sözel</SelectItem>
                    <SelectItem value="dil">Dil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Select value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
                <SelectTrigger className="w-[160px]"><SelectValue placeholder="Tümü" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="week">Hafta</SelectItem>
                  <SelectItem value="month">Ay</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[240px] md:h-[280px] w-full">
                <AreaChart data={mainChartData}>
                  <defs>
                    <linearGradient id="fillAYT" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="35%" stopColor="#96fff6" stopOpacity={0.8} />
                      <stop offset="65%" stopColor="#5ec281" stopOpacity={0.4} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" tickFormatter={(v) => toTrDateLabel(v)} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={(v) => toTrDateLabel(v)} indicator="dot" />} />
                  <Area dataKey="AYT" type="monotone" fill="url(#fillAYT)" stroke="#96fff6" strokeWidth={2} connectNulls />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <div className={`grid grid-cols-1 ${dersler.length >= 4 ? "md:grid-cols-2 xl:grid-cols-4" : dersler.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"} gap-6`}>
            {dersler.map((d, i) => (
                <Card key={d}>
                  <CardHeader><CardTitle>{d} Net</CardTitle></CardHeader>
                  <CardContent>
                    <ChartContainer config={{ AYT: { label: d, color: "var(--chart-1)" } }} className="h-[160px] md:h-[180px] w-full">
                      <AreaChart data={perLessonSeries[d] || []}>
                        <defs>
                          <linearGradient id={`fill-${i}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="35%" stopColor="#96fff6" stopOpacity={0.8} />
                            <stop offset="65%" stopColor="#5ec281" stopOpacity={0.4} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="date" tickFormatter={(v) => toTrDateLabel(v)} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={(v) => toTrDateLabel(v)} indicator="dot" />} />
                        <Area dataKey="v" type="monotone" fill={`url(#fill-${i})`} stroke="#96fff6" strokeWidth={2} connectNulls />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Filtrele</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-end gap-4">
                <div className="flex flex-col gap-1 w-[200px]">
                  <Label>Deneme Adı</Label>
                  <Input placeholder="Deneme adı" />
                </div>
                <div className="flex flex-col gap-1 w-[200px]">
                  <Label>Tarih</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full text-left">
                        {selectedDate ? format(selectedDate, "PPP", { locale: tr }) : "Tarih seç"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="ml-auto flex gap-2 mt-6">
                  <Button variant="outline" className="h-10">Filtrele</Button>
                  <Button className="h-10" onClick={() => setOpenDrawer(true)}>Ekle</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deneme Sonuçları Tablosu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ad</TableHead>
                      <TableHead>Tarih</TableHead>
                      {dersler.map(d => (
                          <TableHead key={d}>{d} Net</TableHead>
                      ))}
                      <TableHead>Genel Net</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {current.map((item, index) => (
                        <TableRow key={start + index}>
                          <TableCell>{item.ad}</TableCell>
                          <TableCell>{item.tarih}</TableCell>
                          {dersler.map(d => (
                              <TableCell key={d}>{item.dersNetleri[d] ?? "-"}</TableCell>
                          ))}
                          <TableCell>{item.genelNet}</TableCell>
                        </TableRow>
                    ))}
                    {current.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={2 + dersler.length + 1} className="text-center text-muted-foreground">Kayıt yok</TableCell>
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="text-sm text-muted-foreground">
                  {(rows.length === 0 ? 0 : start + 1) + "–" + Math.min(start + perPage, rows.length)} / {rows.length}
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Sayfa Boyutu</Label>
                  <Select value={String(perPage)} onValueChange={(v) => { const n = Number(v); setPerPage(n); setPage(1) }}>
                    <SelectTrigger className="w-[90px] h-9"><SelectValue placeholder={String(perPage)} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                    </SelectContent>
                  </Select>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); go(page - 1) }} aria-disabled={page === 1} />
                      </PaginationItem>
                      {pages.map((p, idx) => {
                        const prev = pages[idx - 1]
                        const showEllipsis = prev && p - prev > 1
                        return (
                            <React.Fragment key={p}>
                              {showEllipsis && (
                                  <PaginationItem>
                                    <PaginationEllipsis />
                                  </PaginationItem>
                              )}
                              <PaginationItem>
                                <PaginationLink href="#" isActive={p === page} onClick={(e) => { e.preventDefault(); go(p) }}>
                                  {p}
                                </PaginationLink>
                              </PaginationItem>
                            </React.Fragment>
                        )
                      })}
                      <PaginationItem>
                        <PaginationNext href="#" onClick={(e) => { e.preventDefault(); go(page + 1) }} aria-disabled={page === pageCount} />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </CardContent>
          </Card>

          <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
            <DrawerContent className="max-w-full mx-auto">
              <DrawerHeader>
                <DrawerTitle>AYT Deneme Ekle</DrawerTitle>
              </DrawerHeader>
              <div className="px-4 pb-6 max-h-[70vh] overflow-y-auto flex justify-center">
                <div className="flex flex-col gap-4 w-full max-w-xl">
                  <Input placeholder="Deneme Adı" className="w-full" value={form.ad || ""} onChange={(e) => setForm({ ...form, ad: e.target.value })} />
                  <div className="flex items-center gap-4 w-full">
                    <Label className="w-24">Tarih</Label>
                    <Input type="date" className="flex-1" value={form.tarih || ""} onChange={(e) => setForm({ ...form, tarih: e.target.value })} />
                  </div>
                  {dersler.map((d) => (
                      <div key={d} className="flex items-center justify-between gap-4 w-full">
                        <Label className="w-32">{d}</Label>
                        <Input placeholder="Doğru" className="flex-1" value={form[`${d}-D`] || ""} onChange={(e) => setForm({ ...form, [`${d}-D`]: e.target.value })} />
                        <Input placeholder="Yanlış" className="flex-1" value={form[`${d}-Y`] || ""} onChange={(e) => setForm({ ...form, [`${d}-Y`]: e.target.value })} />
                      </div>
                  ))}
                  <div className="flex justify-end">
                    <Button onClick={addRow}>Kaydet</Button>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        
      </main>
  )
}
