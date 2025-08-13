"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

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

const lessons = [
  { k: "turkce", l: "Türkçe" },
  { k: "matematik", l: "Matematik" },
  { k: "sosyal", l: "Sosyal" },
  { k: "fen", l: "Fen" },
] as const

const seedRows: Row[] = [
  { ad: "Deneme 1", tarih: "2024-07-01", genelNet: 92.5 },
  { ad: "Deneme 2", tarih: "2024-07-05", genelNet: 88.0 }
]

const formSchema = z.object({
  ad: z.string().min(1, "Deneme adı zorunlu"),
  tarih: z.string().min(1, "Tarih zorunlu"),
  dogruYanlis: z.record(z.string(), z.object({
    dogru: z.string().optional(),
    yanlis: z.string().optional()
  }))
})

export default function DenemeTYT() {
  const [rows, setRows] = useState<Row[]>(seedRows)
  const [openDrawer, setOpenDrawer] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ad: "",
      tarih: "",
      dogruYanlis: lessons.reduce((acc, l) => {
        acc[l.k] = { dogru: "", yanlis: "" }
        return acc
      }, {} as Record<string, { dogru: string; yanlis: string }>)
    }
  })

  function parseNum(v: string) { const n = Number(v.replace(",", ".")); return isNaN(n) ? 0 : n }
  function net(d: number, y: number) { return d - y / 4 }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const tNet = net(parseNum(values.dogruYanlis.turkce?.dogru || "0"), parseNum(values.dogruYanlis.turkce?.yanlis || "0"))
    const mNet = net(parseNum(values.dogruYanlis.matematik?.dogru || "0"), parseNum(values.dogruYanlis.matematik?.yanlis || "0"))
    const sNet = net(parseNum(values.dogruYanlis.sosyal?.dogru || "0"), parseNum(values.dogruYanlis.sosyal?.yanlis || "0"))
    const fNet = net(parseNum(values.dogruYanlis.fen?.dogru || "0"), parseNum(values.dogruYanlis.fen?.yanlis || "0"))

    const total = tNet + mNet + sNet + fNet
    const newRow: Row = {
      ad: values.ad,
      tarih: values.tarih,
      turkceNet: Number(tNet.toFixed(2)),
      matematikNet: Number(mNet.toFixed(2)),
      sosyalNet: Number(sNet.toFixed(2)),
      fenNet: Number(fNet.toFixed(2)),
      genelNet: Number(total.toFixed(2)),
    }
    setRows(prev => [newRow, ...prev])
    setOpenDrawer(false)
    form.reset()
  }

  return (
      <main className="container mx-auto px-4 py-6 space-y-10">
        <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
          <DrawerContent className="max-w-full mx-auto">
            <DrawerHeader>
              <DrawerTitle>TYT Deneme Ekle</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-6 max-h-[70vh] overflow-y-auto flex justify-center">
              <div className="flex flex-col gap-4 w-full max-w-xl">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="ad"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Deneme Adı</FormLabel>
                              <FormControl><Input {...field} placeholder="Deneme adı" /></FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tarih"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tarih</FormLabel>
                              <FormControl><Input type="date" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                    {lessons.map((l) => (
                        <div key={l.k} className="flex items-center gap-4">
                          <Label className="w-24">{l.l}</Label>
                          <FormField
                              control={form.control}
                              name={`dogruYanlis.${l.k}.dogru`}
                              render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormControl><Input placeholder="Doğru" {...field} /></FormControl>
                                  </FormItem>
                              )}
                          />
                          <FormField
                              control={form.control}
                              name={`dogruYanlis.${l.k}.yanlis`}
                              render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormControl><Input placeholder="Yanlış" {...field} /></FormControl>
                                  </FormItem>
                              )}
                          />
                        </div>
                    ))}
                    <div className="flex justify-end">
                      <Button type="submit">Kaydet</Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </main>
  )
}
