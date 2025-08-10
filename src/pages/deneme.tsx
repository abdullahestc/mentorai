"use client";

import * as React from "react";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

type ChartPoint = { date: Date; net: number };

const trTick = (d: number | Date) =>
    new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short" });

function ColumnBlock({
                         chartTitle,
                         initialData,
                         buttonHref,
                     }: {
    chartTitle: string;
    initialData: ChartPoint[];
    buttonHref: string;
}) {
    const router = useRouter();
    const data = initialData;

    const chartData = useMemo(
        () => data.map((p) => ({ ...p, date: +p.date })),
        [data]
    );

    const denemeSayisi = data.length;
    const maxNet = data.length ? Math.max(...data.map((d) => d.net)) : 0;

    return (
        <div className="flex min-h-0 flex-col gap-6">
            <Card className="w-full">
                <CardHeader className="pb-3 text-center">
                    <CardTitle className="text-xl">{chartTitle}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="date"
                                    type="number"
                                    domain={["auto", "auto"]}
                                    scale="time"
                                    tickFormatter={trTick}
                                />
                                <Tooltip
                                    labelFormatter={(v) =>
                                        new Date(v as number).toLocaleDateString("tr-TR", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })
                                    }
                                />
                                <Area
                                    type="monotone"
                                    dataKey="net"
                                    stroke="#6366f1"
                                    fill="#6366f1"
                                    fillOpacity={0.2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2 text-center">
                    <CardTitle>Girilen Deneme Sayısı</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold">{denemeSayisi}</div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2 text-center">
                    <CardTitle>En Yüksek Net</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold">{maxNet}</div>
                </CardContent>
            </Card>

            <Button
                className="h-12 text-base w-full"
                onClick={() => router.push(buttonHref)}
            >
                Deneme Ekle
            </Button>
        </div>
    );
}

const dataSol: ChartPoint[] = [
    { date: new Date(2025, 0, 4), net: 62 },
    { date: new Date(2025, 0, 12), net: 66 },
    { date: new Date(2025, 1, 5), net: 71 },
    { date: new Date(2025, 1, 22), net: 73 },
    { date: new Date(2025, 2, 3), net: 75 },
    { date: new Date(2025, 2, 27), net: 78 },
    { date: new Date(2025, 3, 15), net: 80 },
    { date: new Date(2025, 3, 18), net: 112.5 },
];

const dataSag: ChartPoint[] = [
    { date: new Date(2025, 0, 6), net: 45 },
    { date: new Date(2025, 0, 28), net: 49 },
    { date: new Date(2025, 1, 8), net: 52 },
    { date: new Date(2025, 1, 25), net: 56 },
    { date: new Date(2025, 2, 14), net: 58 },
    { date: new Date(2025, 3, 2), net: 61 },
    { date: new Date(2025, 3, 29), net: 63 },
];

export default function Deneme() {
    return (
        <main className="w-full overflow-hidden">
            <div className="mx-auto max-w-8xl h-full p-4">
                <div className="flex h-full flex-col gap-8 lg:flex-row">
                    <div className="flex-1 min-h-0 overflow-auto">
                        <ColumnBlock
                            chartTitle="TYT Net Grafiği"
                            initialData={dataSol}
                            buttonHref="/denemetyt"
                        />
                    </div>

                   
                    <div className="flex-1 min-h-0 overflow-auto">
                        <ColumnBlock
                            chartTitle="AYT Net Grafiği"
                            initialData={dataSag}
                            buttonHref="/denemeayt"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
