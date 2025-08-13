"use client"

import * as React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

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

const seedRows: Row[] = [
  {
    ad: "AYT Deneme 1",
    tarih: "2024-07-01",
    dersNetleri: {
      Matematik: 32.5,
      Fizik: 10.2,
      Kimya: 11.1,
      Biyoloji: 12.0
    },
    genelNet: 65.8
  },
]

const formSchema = z.object({
  ad: z.string().min(1, "Deneme adı zorunlu"),
  tarih: z.string().min(1, "Tarih seçiniz"),
  dogruYanlis: z.record(z.string(), z.object({
    dogru: z.string().optional(),
    yanlis: z.string().optional()
  }))
})

export default function DenemeAYT() {
  const [bolum] = useState<Bolum>("sayisal")
  const [rows, setRows] = useState<Row[]>(seedRows)
  const [openDrawer, setOpenDrawer] = useState(false)

  const dersler = AYT_FIELDS[bolum]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ad: "",
      tarih: "",
      dogruYanlis: dersler.reduce((acc, d) => {
        acc[d] = { dogru: "", yanlis: "" }
        return acc
      }, {} as Record<string, { dogru: string; yanlis: string }>)
    }
  })

  function parseNum(v: string) {
    const n = Number(v.replace(",", "."))
    return isNaN(n) ? 0 : n
  }

  function net(d: number, y: number) {
    return d - y / 4
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const dersNetleri: Record<string, number> = {}
    let total = 0
    for (const d of dersler) {
      const dogru = parseNum(values.dogruYanlis[d]?.dogru || "0")
      const yanlis = parseNum(values.dogruYanlis[d]?.yanlis || "0")
      const n = net(dogru, yanlis)
      dersNetleri[d] = Number(n.toFixed(2))
      total += n
    }
    const newRow: Row = {
      ad: values.ad,
      tarih: values.tarih,
      genelNet: Number(total.toFixed(2)),
      dersNetleri
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
              <DrawerTitle>AYT Deneme Ekle</DrawerTitle>
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
                              <FormControl>
                                <Input {...field} placeholder="Deneme Adı" />
                              </FormControl>
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
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                    {dersler.map((d) => (
                        <div key={d} className="flex items-center gap-4">
                          <Label className="w-32">{d}</Label>
                          <FormField
                              control={form.control}
                              name={`dogruYanlis.${d}.dogru`}
                              render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormControl>
                                      <Input placeholder="Doğru" {...field} />
                                    </FormControl>
                                  </FormItem>
                              )}
                          />
                          <FormField
                              control={form.control}
                              name={`dogruYanlis.${d}.yanlis`}
                              render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormControl>
                                      <Input placeholder="Yanlış" {...field} />
                                    </FormControl>
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
