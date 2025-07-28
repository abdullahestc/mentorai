// app/program/page.tsx veya pages/program.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const dersProgrami = [
    {
        gun: "Pazartesi",
        dersler: [
            { saat: "09:00", konu: "Matematik - Fonksiyonlar" },
            { saat: "11:00", konu: "Fizik - Hareket" },
        ],
    },
    {
        gun: "Salı",
        dersler: [
            { saat: "10:00", konu: "Türkçe - Paragraf" },
            { saat: "13:00", konu: "Kimya - Atom Modelleri" },
        ],
    },
]

export default function Program() {
    return (
        <div className="p-6 space-y-6">
            {dersProgrami.map((gunluk, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle className="text-xl">{gunluk.gun}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {gunluk.dersler.map((ders, i) => (
                            <div key={i}>
                                <p className="font-medium text-sm text-muted-foreground">
                                    {ders.saat}
                                </p>
                                <p className="text-base">{ders.konu}</p>
                                {i < gunluk.dersler.length - 1 && <Separator className="my-2" />}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
