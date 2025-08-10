"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from "recharts"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectItem } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { Table } from "@/components/ui/table"
import { TableBody } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table"
import { TableHead } from "@/components/ui/table"
import { TableHeader } from "@/components/ui/table"
import { TableRow } from "@/components/ui/table"
import { Popover } from "@/components/ui/popover"
import { PopoverTrigger } from "@/components/ui/popover"
import { PopoverContent } from "@/components/ui/popover"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"

import { format, parseISO, startOfWeek, startOfMonth } from "date-fns"
import { tr } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Types
type ViewMode = "all" | "week" | "month"

type Row = {
  ad: string
  tarih: string
  turkceNet?: number | null
  matematikNet?: number | null
  sosyalNet?: number | null
  fenNet?: number | null
  genelNet: number
}

type LessonKey = "turkce" | "matematik" | "sosyal" | "fen"
type FormState =
    & { ad: string; tarih: string; siralama: string }
    & { [K in LessonKey as `${K}D`]: string }
    & { [K in LessonKey as `${K}Y`]: string }

const lessons = [
  { k: "turkce", l: "Türkçe" },
  { k: "matematik", l: "Matematik" },
  { k: "sosyal", l: "Sosyal" },
  { k: "fen", l: "Fen" },
] as const

// Seed data
const seedRows: Row[] = [
  { ad: "Deneme 1", tarih: "2024-07-01", genelNet: 92.5 },
  { ad: "Deneme 2", tarih: "2024-07-01", genelNet: 88.0 },
  { ad: "Deneme 3", tarih: "2024-07-05", genelNet: 90.2 },
  { ad: "Deneme 4", tarih: "2024-07-07", genelNet: 85.4 },
  { ad: "Deneme 5", tarih: "2024-07-09", genelNet: 91.1 },
  { ad: "Deneme 6", tarih: "2024-07-11", genelNet: 87.3 },
  { ad: "Deneme 7", tarih: "2024-07-13", genelNet: 89.4 },
  { ad: "Deneme 8", tarih: "2024-07-15", genelNet: 84.6 },
  { ad: "Deneme 9", tarih: "2024-07-17", genelNet: 93.0 },
  { ad: "Deneme 10", tarih: "2024-07-19", genelNet: 86.9 },
  { ad: "Deneme 11", tarih: "2024-07-21", genelNet: 88.6 },
  { ad: "Deneme 12", tarih: "2024-07-23", genelNet: 85.2 },
  { ad: "Deneme 13", tarih: "2024-07-25", genelNet: 90.8 },
  { ad: "Deneme 14", tarih: "2024-07-27", genelNet: 87.7 },
  { ad: "Deneme 15", tarih: "2024-07-29", genelNet: 92.1 },
  { ad: "Deneme 16", tarih: "2024-07-31", genelNet: 66.0 },
  { ad: "Deneme 17", tarih: "2024-08-02", genelNet: 79.7 },
  { ad: "Deneme 18", tarih: "2024-08-04", genelNet: 54.3 },
  { ad: "Deneme 19", tarih: "2024-08-06", genelNet: 41.5 },
  { ad: "Deneme 20", tarih: "2024-08-08", genelNet: 85.6 },
  { ad: "Deneme 21", tarih: "2024-08-10", genelNet: 50.2 },
  { ad: "Deneme 22", tarih: "2024-08-12", genelNet: 68.8 },
  { ad: "Deneme 23", tarih: "2024-08-14", genelNet: 92.9 },
  { ad: "Deneme 24", tarih: "2024-08-16", genelNet: 85.0 },
  { ad: "Deneme 25", tarih: "2024-08-18", genelNet: 89.2 },
  { ad: "Deneme 26", tarih: "2024-08-20", genelNet: 87.1 },
  { ad: "Deneme 27", tarih: "2024-08-22", genelNet: 91.3 },
  { ad: "Deneme 28", tarih: "2024-08-24", genelNet: 84.9 },
  { ad: "Deneme 29", tarih: "2024-08-26", genelNet: 88.5 },
  { ad: "Deneme 30", tarih: "2024-08-28", genelNet: 86.2 },
  { ad: "Deneme 31", tarih: "2024-08-30", genelNet: 90.7 },
  { ad: "Deneme 32", tarih: "2024-09-01", genelNet: 65.8 },
  { ad: "Deneme 33", tarih: "2024-09-03", genelNet: 92.2 },
  { ad: "Deneme 34", tarih: "2024-09-05", genelNet: 87.0 },
  { ad: "Deneme 35", tarih: "2024-09-07", genelNet: 89.0 },
  { ad: "Deneme 36", tarih: "2024-09-09", genelNet: 86.4 },
  { ad: "Deneme 37", tarih: "2024-09-11", genelNet: 91.8 },
  { ad: "Deneme 38", tarih: "2024-09-13", genelNet: 85.3 },
  { ad: "Deneme 39", tarih: "2024-09-15", genelNet: 90.1 },
  { ad: "Deneme 40", tarih: "2024-09-17", genelNet: 84.7 },
]

const chartConfig = {
  TYT: { label: "TYT Net", color: "var(--chart-1)" },
}

function groupBy(rows: Row[], mode: ViewMode) {
  if (mode === "all") return rows.map(r => ({ key: r.tarih, date: r.tarih, TYT: r.genelNet }))
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
      .map(([key, v]) => ({ key, date: v.anyDate, TYT: v.sum / v.count }))
}

function toTrDateLabel(value: string | number | Date) {
  return new Date(value).toLocaleDateString("tr-TR", { month: "short", day: "numeric" })
}

export default function Denemetyt() {
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

  const mainChartData = useMemo(() => groupBy(rows, viewMode), [rows, viewMode])

  const perLessonSeries = useMemo(() => {
    const make = (key: keyof Row) =>
        rows
            .filter(r => typeof r[key] === "number")
            .map(r => ({ date: r.tarih, v: r[key] as number }))
    return {
      turkce: make("turkceNet"),
      matematik: make("matematikNet"),
      sosyal: make("sosyalNet"),
      fen: make("fenNet"),
    }
  }, [rows])

  const [form, setForm] = useState<FormState>({
    ad: "",
    tarih: "",
    turkceD: "",
    turkceY: "",
    matematikD: "",
    matematikY: "",
    sosyalD: "",
    sosyalY: "",
    fenD: "",
    fenY: "",
    siralama: "",
  })

  const setFormField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }))

  function parseNum(v: string) { const n = Number(v.replace(",", ".")); return isNaN(n) ? 0 : n }
  function net(d: number, y: number) { return d - y / 4 }

  function addRow() {
    if (!form.ad || !form.tarih) return
    const turkce = net(parseNum(form.turkceD), parseNum(form.turkceY))
    const mat = net(parseNum(form.matematikD), parseNum(form.matematikY))
    const sosyal = net(parseNum(form.sosyalD), parseNum(form.sosyalY))
    const fen = net(parseNum(form.fenD), parseNum(form.fenY))
    const total = turkce + mat + sosyal + fen
    const newRow: Row = {
      ad: form.ad,
      tarih: form.tarih,
      turkceNet: Number(turkce.toFixed(2)),
      matematikNet: Number(mat.toFixed(2)),
      sosyalNet: Number(sosyal.toFixed(2)),
      fenNet: Number(fen.toFixed(2)),
      genelNet: Number(total.toFixed(2)),
    }
    setRows(prev => [newRow, ...prev])
    setOpenDrawer(false)
  }

  return (
      <main className="container mx-auto px-4 py-6 space-y-10">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div>
              <CardTitle>TYT Deneme Netleri</CardTitle>
            </div>
            <Select value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Tümü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="week">Hafta</SelectItem>
                <SelectItem value="month">Ay</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <AreaChart data={mainChartData}>
                <defs>
                  <linearGradient id="fillTYT" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="35%" stopColor="#ffcb63" stopOpacity={0.8} />
                    <stop offset="65%" stopColor="#ce6e12" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickFormatter={(v) => toTrDateLabel(v)} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={(v) => toTrDateLabel(v)} indicator="dot" />} />
                <Area dataKey="TYT" type="monotone" fill="url(#fillTYT)" stroke="#ffcb63" strokeWidth={2} connectNulls />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card>
            <CardHeader><CardTitle>Türkçe Net</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer config={{ TYT: { label: "Türkçe", color: "var(--chart-1)" } }} className="h-[180px] w-full">
                <AreaChart data={perLessonSeries.turkce}>
                  <defs>
                    <linearGradient id="fillTr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="35%" stopColor="#ffcb63" stopOpacity={0.8} />
                      <stop offset="65%" stopColor="#ce6e12" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" tickFormatter={(v) => toTrDateLabel(v)} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={(v) => toTrDateLabel(v)} indicator="dot" />} />
                  <Area dataKey="v" type="monotone" fill="url(#fillTr)" stroke="#ffcb63" strokeWidth={2} connectNulls />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Matematik Net</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer config={{ TYT: { label: "Matematik", color: "var(--chart-1)" } }} className="h-[180px] w-full">
                <AreaChart data={perLessonSeries.matematik}>
                  <defs>
                    <linearGradient id="fillMat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="35%" stopColor="#ffcb63" stopOpacity={0.8} />
                      <stop offset="65%" stopColor="#ce6e12" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" tickFormatter={(v) => toTrDateLabel(v)} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={(v) => toTrDateLabel(v)} indicator="dot" />} />
                  <Area dataKey="v" type="monotone" fill="url(#fillMat)" stroke="#ffcb63" strokeWidth={2} connectNulls />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Sosyal Net</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer config={{ TYT: { label: "Sosyal", color: "var(--chart-1)" } }} className="h-[180px] w-full">
                <AreaChart data={perLessonSeries.sosyal}>
                  <defs>
                    <linearGradient id="fillSos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="35%" stopColor="#ffcb63" stopOpacity={0.8} />
                      <stop offset="65%" stopColor="#ce6e12" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" tickFormatter={(v) => toTrDateLabel(v)} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={(v) => toTrDateLabel(v)} indicator="dot" />} />
                  <Area dataKey="v" type="monotone" fill="url(#fillSos)" stroke="#ffcb63" strokeWidth={2} connectNulls />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Fen Net</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer config={{ TYT: { label: "Fen", color: "var(--chart-1)" } }} className="h-[180px] w-full">
                <AreaChart data={perLessonSeries.fen}>
                  <defs>
                    <linearGradient id="fillFen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="35%" stopColor="#ffcb63" stopOpacity={0.8} />
                      <stop offset="65%" stopColor="#ce6e12" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" tickFormatter={(v) => toTrDateLabel(v)} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={(v) => toTrDateLabel(v)} indicator="dot" />} />
                  <Area dataKey="v" type="monotone" fill="url(#fillFen)" stroke="#ffcb63" strokeWidth={2} connectNulls />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ad</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Türkçe Net</TableHead>
                  <TableHead>Matematik Net</TableHead>
                  <TableHead>Sosyal Net</TableHead>
                  <TableHead>Fen Net</TableHead>
                  <TableHead>Genel Net</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {current.map((item, index) => (
                    <TableRow key={start + index}>
                      <TableCell>{item.ad}</TableCell>
                      <TableCell>{item.tarih}</TableCell>
                      <TableCell>{item.turkceNet ?? "-"}</TableCell>
                      <TableCell>{item.matematikNet ?? "-"}</TableCell>
                      <TableCell>{item.sosyalNet ?? "-"}</TableCell>
                      <TableCell>{item.fenNet ?? "-"}</TableCell>
                      <TableCell>{item.genelNet}</TableCell>
                    </TableRow>
                ))}
                {current.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">Kayıt yok</TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>

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
              <DrawerTitle>TYT Deneme Ekle</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-6 max-h-[70vh] overflow-y-auto flex justify-center">
              <div className="flex flex-col gap-4 w-full max-w-xl">
                <Input
                    placeholder="Deneme Adı"
                    className="w-full"
                    value={form.ad}
                    onChange={(e) => setFormField("ad", e.target.value)}
                />
                <div className="flex items-center gap-4 w-full">
                  <Label className="w-24">Tarih</Label>
                  <Input
                      type="date"
                      className="flex-1"
                      value={form.tarih}
                      onChange={(e) => setFormField("tarih", e.target.value)}
                  />
                </div>
                {lessons.map((x) => {
                  const dKey = `${x.k}D` as `${LessonKey}D`
                  const yKey = `${x.k}Y` as `${LessonKey}Y`
                  return (
                      <div key={x.k} className="flex items-center justify-between gap-4 w-full">
                        <Label className="w-24">{x.l}</Label>
                        <Input
                            placeholder="Doğru"
                            className="flex-1"
                            value={form[dKey]}
                            onChange={(e) => setFormField(dKey, e.target.value)}
                        />
                        <Input
                            placeholder="Yanlış"
                            className="flex-1"
                            value={form[yKey]}
                            onChange={(e) => setFormField(yKey, e.target.value)}
                        />
                      </div>
                  )
                })}
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
