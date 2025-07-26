"use client"

import * as React from "react"
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
  CardDescription,
} from "@/components/ui/card"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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

import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import {ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"

const tableData = [
  { ad: "Deneme 1", tarih: "2024-07-01", tür: "TYT", sıralama: "5.320", genelNet: 92.5 },
  { ad: "Deneme 2", tarih: "2024-07-01", tür: "AYT", sıralama: "3.900", genelNet: 88.0 },
  { ad: "Deneme 3", tarih: "2024-07-05", tür: "TYT", sıralama: "4.120", genelNet: 90.2 },
  { ad: "Deneme 4", tarih: "2024-07-07", tür: "AYT", sıralama: "3.500", genelNet: 85.4 },
  { ad: "Deneme 5", tarih: "2024-07-09", tür: "TYT", sıralama: "4.980", genelNet: 91.1 },
  { ad: "Deneme 6", tarih: "2024-07-11", tür: "AYT", sıralama: "3.700", genelNet: 87.3 },
  { ad: "Deneme 7", tarih: "2024-07-13", tür: "TYT", sıralama: "5.210", genelNet: 89.4 },
  { ad: "Deneme 8", tarih: "2024-07-15", tür: "AYT", sıralama: "3.620", genelNet: 84.6 },
  { ad: "Deneme 9", tarih: "2024-07-17", tür: "TYT", sıralama: "4.890", genelNet: 93.0 },
  { ad: "Deneme 10", tarih: "2024-07-19", tür: "AYT", sıralama: "3.450", genelNet: 86.9 },
  { ad: "Deneme 11", tarih: "2024-07-21", tür: "TYT", sıralama: "4.740", genelNet: 88.6 },
  { ad: "Deneme 12", tarih: "2024-07-23", tür: "AYT", sıralama: "3.580", genelNet: 85.2 },
  { ad: "Deneme 13", tarih: "2024-07-25", tür: "TYT", sıralama: "5.010", genelNet: 90.8 },
  { ad: "Deneme 14", tarih: "2024-07-27", tür: "AYT", sıralama: "3.790", genelNet: 87.7 },
  { ad: "Deneme 15", tarih: "2024-07-29", tür: "TYT", sıralama: "4.530", genelNet: 92.1 },
  { ad: "Deneme 16", tarih: "2024-07-31", tür: "AYT", sıralama: "3.610", genelNet: 66.0 },
  { ad: "Deneme 17", tarih: "2024-08-02", tür: "TYT", sıralama: "5.100", genelNet: 79.7 },
  { ad: "Deneme 18", tarih: "2024-08-04", tür: "AYT", sıralama: "3.430", genelNet: 54.3 },
  { ad: "Deneme 19", tarih: "2024-08-06", tür: "TYT", sıralama: "4.820", genelNet: 41.5 },
  { ad: "Deneme 20", tarih: "2024-08-08", tür: "AYT", sıralama: "3.570", genelNet: 85.6 },
  { ad: "Deneme 21", tarih: "2024-08-10", tür: "TYT", sıralama: "5.250", genelNet: 50.2 },
  { ad: "Deneme 22", tarih: "2024-08-12", tür: "AYT", sıralama: "3.800", genelNet: 68.8 },
  { ad: "Deneme 23", tarih: "2024-08-14", tür: "TYT", sıralama: "4.970", genelNet: 92.9 },
  { ad: "Deneme 24", tarih: "2024-08-16", tür: "AYT", sıralama: "3.480", genelNet: 85.0 },
  { ad: "Deneme 25", tarih: "2024-08-18", tür: "TYT", sıralama: "4.660", genelNet: 89.2 },
  { ad: "Deneme 26", tarih: "2024-08-20", tür: "AYT", sıralama: "3.690", genelNet: 87.1 },
  { ad: "Deneme 27", tarih: "2024-08-22", tür: "TYT", sıralama: "5.140", genelNet: 91.3 },
  { ad: "Deneme 28", tarih: "2024-08-24", tür: "AYT", sıralama: "3.530", genelNet: 84.9 },
  { ad: "Deneme 29", tarih: "2024-08-26", tür: "TYT", sıralama: "4.820", genelNet: 88.5 },
  { ad: "Deneme 30", tarih: "2024-08-28", tür: "AYT", sıralama: "3.670", genelNet: 86.2 },
  { ad: "Deneme 31", tarih: "2024-08-30", tür: "TYT", sıralama: "4.950", genelNet: 90.7 },
  { ad: "Deneme 32", tarih: "2024-09-01", tür: "AYT", sıralama: "3.400", genelNet: 65.8 },
  { ad: "Deneme 33", tarih: "2024-09-03", tür: "TYT", sıralama: "5.190", genelNet: 92.2 },
  { ad: "Deneme 34", tarih: "2024-09-05", tür: "AYT", sıralama: "3.750", genelNet: 87.0 },
  { ad: "Deneme 35", tarih: "2024-09-07", tür: "TYT", sıralama: "4.740", genelNet: 89.0 },
  { ad: "Deneme 36", tarih: "2024-09-09", tür: "AYT", sıralama: "3.610", genelNet: 86.4 },
  { ad: "Deneme 37", tarih: "2024-09-11", tür: "TYT", sıralama: "5.010", genelNet: 91.8 },
  { ad: "Deneme 38", tarih: "2024-09-13", tür: "AYT", sıralama: "3.540", genelNet: 85.3 },
  { ad: "Deneme 39", tarih: "2024-09-15", tür: "TYT", sıralama: "4.880", genelNet: 90.1 },
  { ad: "Deneme 40", tarih: "2024-09-17", tür: "AYT", sıralama: "3.490", genelNet: 84.7 },
]

const chartData = tableData.map((item) => ({
  date: item.tarih,
  TYT: item.tür === "TYT" ? item.genelNet : null,
  AYT: item.tür === "AYT" ? item.genelNet : null,
}))

const chartConfig = {
  TYT: { label: "TYT Net", color: "var(--chart-1)" },
  AYT: { label: "AYT Net", color: "var(--chart-2)" },
}

export default function Deneme() {
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const [drawerType, setDrawerType] = React.useState<"TYT" | "AYT" | null>(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>()

  const openDrawerWithType = (type: "TYT" | "AYT") => {
    setDrawerType(type)
    setOpenDrawer(true)
    setDialogOpen(false)
  }

  return (
      <main className="container mx-auto px-4 py-6 space-y-10">
        {/* 📊 GRAFİK */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div>
              <CardTitle>Deneme Netleri - Area Chart</CardTitle>
              <CardDescription>TYT / AYT net değişimi</CardDescription>
            </div>
            <Select value="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Tümü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="fillTYT" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="35%" stopColor="#ffcb63" stopOpacity={0.8} />
                    <stop offset="65%" stopColor="#ce6e12" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="fillAYT" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="35%" stopColor="#96fff6" stopOpacity={0.8} />
                    <stop offset="65%" stopColor="#5ec281" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="date"
                    tickFormatter={(value) =>
                        new Date(value).toLocaleDateString("tr-TR", {
                          month: "short",
                          day: "numeric",
                        })
                    }
                />
                <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                          labelFormatter={(value) =>
                              new Date(value).toLocaleDateString("tr-TR", {
                                month: "short",
                                day: "numeric",
                              })
                          }
                          indicator="dot"
                      />
                    }
                />
                <Area dataKey="TYT" type="monotone" fill="url(#fillTYT)" stroke="#ffcb63" strokeWidth={2} connectNulls />
                <Area dataKey="AYT" type="monotone" fill="url(#fillAYT)" stroke="#96fff6" strokeWidth={2} connectNulls />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 🧩 FİLTRE ALANI */}
        <Card>
          <CardHeader>
            <CardTitle>Filtrele</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-end gap-4">
              {/* Deneme Adı */}
              <div className="flex flex-col gap-1 w-[200px]">
                <Label>Deneme Adı</Label>
                <Input placeholder="Deneme adı"/>
              </div>

              {/* Tarih */}
              <div className="flex flex-col gap-1 w-[200px]">
                <Label>Tarih</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full text-left">
                      {selectedDate
                          ? format(selectedDate, "PPP", { locale: tr })
                          : "Tarih seç"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Tür */}
              <div className="flex flex-col gap-1 w-[200px]">
                <Label>Tür</Label>
                <Select>
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Tür seç" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TYT">TYT</SelectItem>
                    <SelectItem value="AYT">AYT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filtrele ve Ekle Butonları */}
              <div className="ml-auto flex gap-2 mt-6">
                <Button variant="outline" className="h-10">Filtrele</Button>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-10">Ekle</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Deneme Türü Seç</DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center gap-4">
                      <Button onClick={() => openDrawerWithType("TYT")}>TYT</Button>
                      <Button onClick={() => openDrawerWithType("AYT")}>AYT</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* 📋 TABLO */}
        <Card>
          <CardHeader>
            <CardTitle>Deneme Sonuçları Tablosu</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ad</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Tür</TableHead>
                  <TableHead>Sıralama</TableHead>
                  <TableHead>Genel Net</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.ad}</TableCell>
                      <TableCell>{item.tarih}</TableCell>
                      <TableCell>{item.tür}</TableCell>
                      <TableCell>{item.sıralama}</TableCell>
                      <TableCell>{item.genelNet}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 📥 DRAWER */}
        <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
          <DrawerContent className="max-w-full mx-auto">
            <DrawerHeader>
              <DrawerTitle>
                {drawerType === "TYT" ? "TYT Deneme Ekle" : "AYT Deneme Ekle"}
              </DrawerTitle>
            </DrawerHeader>

            <div className="px-4 pb-6 max-h-[70vh] overflow-y-auto flex justify-center">
              <div className="flex flex-col gap-4 w-full max-w-xl">
                <Input placeholder="Deneme Adı" className="w-full" />
                {/* Ders inputları */}
                {(drawerType === "TYT"
                        ? ["Türkçe", "Sosyal", "Matematik", "Fen"]
                        : ["Türkçe", "Sosyal", "Matemetik", "Fen"]
                ).map((label) => (
                    <div
                        key={label}
                        className="flex items-center justify-between gap-4 w-full"
                    >
                      <Label className="w-24">{label}</Label>
                      <Input placeholder="Doğru" className="flex-1" />
                      <Input placeholder="Yanlış" className="flex-1" />
                    </div>
                ))}

                {/* Genel inputlar */}
               
                <Input placeholder="Sıralama Örn: 5.320" className="w-full" />
              </div>
            </div>
          </DrawerContent>
        </Drawer>

      </main>
  )
}
