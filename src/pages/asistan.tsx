"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Asistan() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const historyRef = useRef<{ role: "user" | "assistant"; content: string }[]>([
        {
            role: "system",
            content: `Sen bir eğitim asistanısın. Aşağıdaki tüm derslerde öğrencilere yardımcı olabilirsin:
      - Matematik
      - Geometri
      - Coğrafya
      - Din Kültürü
      - Tarih
      - Türkçe
      - Edebiyat
      - Felsefe
      - Kimya
      - Biyoloji
      - Fizik
      - Paragraf
      Samimi, motive edici, kolay anlaşılır ve öğrenciyi cesaretlendiren bir dil kullan. Konuya uygun net ve doğru bilgiler ver.`,
        },
    ]);

    async function sendQuestion(prompt?: string) {
        const query = prompt || question;
        if (!query) return;

        setAnswer("");
        setLoading(true);
        historyRef.current.push({ role: "user", content: query });

        try {
            const res = await fetch("/api/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: historyRef.current }),
            });

            if (!res.body) throw new Error("Akış başlatılamadı");

            const reader = res.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let buffer = "";
            let fullText = "";

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() || "";

                for (const raw of lines) {
                    const line = raw.trim();
                    if (!line.startsWith("data:")) continue;

                    const data = line.replace(/^data:\s*/, "");
                    if (data === "[DONE]") {
                        historyRef.current.push({ role: "assistant", content: fullText });
                        setLoading(false);
                        return;
                    }

                    try {
                        const json = JSON.parse(data);
                        const delta = json.choices?.[0]?.delta?.content;
                        if (delta) {
                            fullText += delta;
                            setAnswer((prev) => prev + delta);
                        }
                    } catch {
                        
                    }
                }
            }
        } catch (e) {
            console.error(e);
            setAnswer("Bir hata oluştu. Lütfen tekrar dene.");
        } finally {
            setLoading(false);
            setQuestion("");
        }
    }

    useEffect(() => {
        sendQuestion(
            "🎓 Merhaba! Ben senin yanındaki eğitim asistanınım 🤗. Matematik, geometri, coğrafya, din kültürü, tarih, türkçe, edebiyat, felsefe, kimya, biyoloji, fizik, paragraf ve daha birçok derste sana yardımcı olabilirim 📚. İstediğin konuyu yaz, birlikte çözelim! 💪"
        );
    }, []);

    return (
        <main className="container mx-auto px-4 py-8">
            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Asistan</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Input
                        placeholder="Bana bir şey sor..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendQuestion()}
                    />
                    <Button onClick={() => sendQuestion()} disabled={loading}>
                        {loading ? "Cevaplanıyor..." : "Sor"}
                    </Button>
                    {answer && (
                        <Textarea
                            value={answer}
                            readOnly
                            className="min-h-[200px] bg-muted resize-none"
                        />
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
