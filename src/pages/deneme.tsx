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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// 🔹 Ortak veri
const tableData = [
  { ad: "Deneme 1", tarih: "2024-07-01", tür: "TYT", sıralama: "5.320", genelNet: 92.5 },
  { ad: "Deneme 2", tarih: "2024-07-03", tür: "AYT", sıralama: "3.900", genelNet: 88.0 },
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
  { ad: "Deneme 16", tarih: "2024-07-31", tür: "AYT", sıralama: "3.610", genelNet: 6.0 },
  { ad: "Deneme 17", tarih: "2024-08-02", tür: "TYT", sıralama: "5.100", genelNet: 9.7 },
  { ad: "Deneme 18", tarih: "2024-08-04", tür: "AYT", sıralama: "3.430", genelNet: 4.3 },
  { ad: "Deneme 19", tarih: "2024-08-06", tür: "TYT", sıralama: "4.820", genelNet: 1.5 },
  { ad: "Deneme 20", tarih: "2024-08-08", tür: "AYT", sıralama: "3.570", genelNet: 85.6 },
  { ad: "Deneme 21", tarih: "2024-08-10", tür: "TYT", sıralama: "5.250", genelNet: 0.2 },
  { ad: "Deneme 22", tarih: "2024-08-12", tür: "AYT", sıralama: "3.800", genelNet: 8.8 },
  { ad: "Deneme 23", tarih: "2024-08-14", tür: "TYT", sıralama: "4.970", genelNet: 92.9 },
  { ad: "Deneme 24", tarih: "2024-08-16", tür: "AYT", sıralama: "3.480", genelNet: 85.0 },
  { ad: "Deneme 25", tarih: "2024-08-18", tür: "TYT", sıralama: "4.660", genelNet: 89.2 },
  { ad: "Deneme 26", tarih: "2024-08-20", tür: "AYT", sıralama: "3.690", genelNet: 87.1 },
  { ad: "Deneme 27", tarih: "2024-08-22", tür: "TYT", sıralama: "5.140", genelNet: 91.3 },
  { ad: "Deneme 28", tarih: "2024-08-24", tür: "AYT", sıralama: "3.530", genelNet: 84.9 },
  { ad: "Deneme 29", tarih: "2024-08-26", tür: "TYT", sıralama: "4.820", genelNet: 88.5 },
  { ad: "Deneme 30", tarih: "2024-08-28", tür: "AYT", sıralama: "3.670", genelNet: 86.2 },
  { ad: "Deneme 31", tarih: "2024-08-30", tür: "TYT", sıralama: "4.950", genelNet: 90.7 },
  { ad: "Deneme 32", tarih: "2024-09-01", tür: "AYT", sıralama: "3.400", genelNet: 5.8 },
  { ad: "Deneme 33", tarih: "2024-09-03", tür: "TYT", sıralama: "5.190", genelNet: 92.2 },
  { ad: "Deneme 34", tarih: "2024-09-05", tür: "AYT", sıralama: "3.750", genelNet: 87.0 },
  { ad: "Deneme 35", tarih: "2024-09-07", tür: "TYT", sıralama: "4.740", genelNet: 89.0 },
  { ad: "Deneme 36", tarih: "2024-09-09", tür: "AYT", sıralama: "3.610", genelNet: 86.4 },
  { ad: "Deneme 37", tarih: "2024-09-11", tür: "TYT", sıralama: "5.010", genelNet: 91.8 },
  { ad: "Deneme 38", tarih: "2024-09-13", tür: "AYT", sıralama: "3.540", genelNet: 85.3 },
  { ad: "Deneme 39", tarih: "2024-09-15", tür: "TYT", sıralama: "4.880", genelNet: 90.1 },
  { ad: "Deneme 40", tarih: "2024-09-17", tür: "AYT", sıralama: "3.490", genelNet: 84.7 },
]


// 🔧 Grafik verisine uygun dönüştürme
const chartData = tableData.map((item) => ({
  date: item.tarih,
  TYT: item.tür === "TYT" ? item.genelNet : null,
  AYT: item.tür === "AYT" ? item.genelNet : null,
}))

const chartConfig = {
  TYT: {
    label: "TYT Net",
    color: "var(--chart-1)",
  },
  AYT: {
    label: "AYT Net",
    color: "var(--chart-2)",
  },
}

export default function ChartAndTablePage() {
  const [timeRange, setTimeRange] = React.useState("all")

  return (
      <main className="container mx-auto px-4 py-6 space-y-10">
        {/* 📊 GRAFİK */}
        <Card className="pt-0">
          <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
            <div className="grid flex-1 gap-1">
              <CardTitle>Deneme Netleri - Area Chart</CardTitle>
              <CardDescription>Son 4 denemeye göre TYT / AYT net değişimi</CardDescription>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex">
                <SelectValue placeholder="Hepsi" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">Tümü</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <ChartContainer
                config={chartConfig}
                className="aspect-auto h-[250px] w-full"
            >
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
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                      const date = new Date(value)
                      return date.toLocaleDateString("tr-TR", {
                        month: "short",
                        day: "numeric",
                      })
                    }}
                />
                <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                          labelFormatter={(value) => {
                            return new Date(value).toLocaleDateString("tr-TR", {
                              month: "short",
                              day: "numeric",
                            })
                          }}
                          indicator="dot"
                      />
                    }
                />
                <Area
                    dataKey="TYT"
                    type="monotone"
                    fill="url(#fillTYT)"
                    stroke="#ffcb63"
                    connectNulls
                    strokeWidth={2}
                />
                <Area
                    dataKey="AYT"
                    type="monotone"
                    fill="url(#fillAYT)"
                    stroke="#96fff6"
                    connectNulls
                    strokeWidth={2}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
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
      </main>
  )
}
