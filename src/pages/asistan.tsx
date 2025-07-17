"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Asistan() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const askQuestion = async () => {
        if (!question.trim()) return;

        setLoading(true);
        setAnswer("");

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer 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`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo", // Eğer çalışmazsa "gpt-3.5-turbo" deneyebilirsin
                    messages: [{ role: "user", content: question }],
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("OpenAI API Hatası:", data);
                setAnswer("Hata oluştu: " + (data?.error?.message || "Bilinmeyen hata"));
            } else if (data?.choices?.[0]?.message?.content) {
                setAnswer(data.choices[0].message.content);
            } else {
                console.error("Beklenmeyen cevap yapısı:", data);
                setAnswer("Cevap alınamadı. Yapı beklenen formatta değil.");
            }
        } catch (error) {
            console.error("İstek sırasında hata:", error);
            setAnswer("Ağ bağlantısı hatası veya bilinmeyen bir sorun oluştu.");
        }

        setLoading(false);
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Asistan GPT</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Input
                        placeholder="Bana bir şey sor..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && askQuestion()}
                    />
                    <Button onClick={askQuestion} disabled={loading}>
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
