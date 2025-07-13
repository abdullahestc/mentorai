"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const fetchSubjectsFromBackend = (): Subject[] => [
    { title: "Türkçe", icon: "📖", progress: 75, path: "/turkce" },
    { title: "Matematik", icon: "➗", progress: 40, path: "/matematik" },
    { title: "Geometri", icon: "📐", progress: 60, path: "/geometri" },
    { title: "Fizik", icon: "🧲", progress: 30, path: "/fizik" },
    { title: "Kimya", icon: "⚗️", progress: 90, path: "/kimya" },
    { title: "Biyoloji", icon: "🧬", progress: 55, path: "/biyoloji" },
    { title: "Tarih", icon: "🏛️", progress: 20, path: "/tarih" },
    { title: "Coğrafya", icon: "🗺️", progress: 45, path: "/cografya" },
    { title: "Felsefe", icon: "💭", progress: 70, path: "/felsefe" },
    { title: "Din", icon: "🕌", progress: 35, path: "/din" },
]

type Subject = {
    title: string
    icon: string
    progress: number
    path: string
}

export default function Dersler() {
    const router = useRouter()
    const [subjects, setSubjects] = useState<Subject[]>([])

    useEffect(() => {
        const data = fetchSubjectsFromBackend()
        setSubjects(data)
    }, [])

    const overallProgress =
        subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length || 0

    return (
        <main className="container mx-auto px-4 py-8">
            <Card className="w-full mb-6">
                <CardContent className="flex items-center justify-between px-6 py-4">
                    <h2 className="text-2xl font-semibold">Genel İlerleme</h2>
                    <div className="flex flex-col gap-2 w-full max-w-md">
                        <Progress value={overallProgress} />
                        <p className="text-sm text-muted-foreground text-right">
                            %{Math.round(overallProgress)}
                        </p>
                    </div>
                </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {subjects.map((subject, index) => (
                    <Card
                        key={index}
                        onClick={() => router.push(subject.path)}
                        className="cursor-pointer transition-transform hover:scale-[1.02]"
                    >
                        <CardHeader className="text-center">
                            <div className="text-4xl">{subject.icon}</div>
                            <CardTitle className="text-lg font-semibold">{subject.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="px-6 pb-6">
                            <Progress value={subject.progress} className="w-full" />
                            <p className="text-sl text-muted-foreground mt-2 text-center">
                                Tamamlanma: %{subject.progress}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    )
}
