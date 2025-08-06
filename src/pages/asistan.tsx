"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


const topicVideoMap: { pattern: RegExp; url: string }[] = [
    { pattern: /asal(?:\s*sayı(?:lar)?)?/i, url: "https://www.youtube.com/watch?v=F9mdf3x6FUg" },
    { pattern: /\bebob\b/i, url: "https://www.youtube.com/watch?v=aAzGkC1mgDk" },
    { pattern: /\bekok\b/i, url: "https://www.youtube.com/watch?v=aAzGkC1mgDk" },
    { pattern: /türev/i, url: "https://www.youtube.com/watch?v=PAzv2FmiuU8" },
    { pattern: /integral/i, url: "https://www.youtube.com/watch?v=GrA7cp1RYuA" },
    { pattern: /üslü\s*sayı(?:lar)?/i, url: "https://www.youtube.com/watch?v=6vGJgiW5ZYc" },
    { pattern: /çarpan(?:lara)?\s*ayırma/i, url: "https://www.youtube.com/watch?v=-JYKSqZcEaA" },
];

export default function Asistan() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [youtubeLinks, setYoutubeLinks] = useState<{ title: string; url: string }[]>([]);

    const controllerRef = useRef<AbortController | null>(null);
    const messageHistoryRef = useRef<{ role: "user" | "assistant"; content: string }[]>([]);

    async function askQuestion(prompt?: string) {
        const query = prompt || question;
        if (!query) return;

        setAnswer("");
        setYoutubeLinks([]);
        setLoading(true);

        messageHistoryRef.current.push({
            role: "user",
            content: query,
        });

        controllerRef.current = new AbortController();

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer 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`,
                },
                body: JSON.stringify({
                    model: "gpt-4o",
                    stream: true,
                    messages: messageHistoryRef.current,
                }),
                signal: controllerRef.current.signal,
            });

            const reader = response.body?.getReader();
            const decoder = new TextDecoder("utf-8");
            if (!reader) throw new Error("Yanıt akışı başlatılamadı.");

            let done = false;
            let resultText = "";

            while (!done) {
                const { value, done: streamDone } = await reader.read();
                done = streamDone;
                const chunk = decoder.decode(value);
                const lines = chunk
                    .split("\n")
                    .map((line) => line.trim())
                    .filter((line) => line !== "" && line.startsWith("data:"));

                for (const line of lines) {
                    const message = line.replace(/^data:\s*/, "");
                    if (message === "[DONE]") return;

                    try {
                        const json = JSON.parse(message);
                        const content = json.choices?.[0]?.delta?.content;
                        if (content) {
                            resultText += content;
                            setAnswer((prev) => prev + content);
                        }
                    } catch {
                        
                    }
                }
            }

            messageHistoryRef.current.push({
                role: "assistant",
                content: resultText,
            });

            const matched = topicVideoMap.filter(({ pattern }) =>
                pattern.test(resultText.toLowerCase())
            );

            if (matched.length > 0) {
                const links = matched.map(({ pattern, url }) => {
                    const topic = pattern.toString().replace(/[\/\\^$.*+?()[\]{}]/g, "");
                    return {
                        title: `📺 ${topic[0].toUpperCase() + topic.slice(1)} Videosu`,
                        url,
                    };
                });
                setYoutubeLinks(links);
            }
        } catch {
            setAnswer("Bir hata oluştu. Lütfen tekrar dene.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        askQuestion(
            "Sen bir eğitim asistanısın. Sayfa açıldığında öğrencilere tüm derslerde (matematik, fizik, edebiyat, tarih, biyoloji, coğrafya vs.) yardımcı olacak şekilde yönlendirici bir mesaj ver. Hazırsan seni dinliyorum gibi sıcak bir giriş yap. Eğer kullanıcı bir konu hakkında video isterse, konuyla alakalı YouTube video bağlantıları da önerebilirsin."
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
                        onKeyDown={(e) => e.key === "Enter" && askQuestion()}
                    />
                    <Button onClick={() => askQuestion()} disabled={loading}>
                        {loading ? "Cevaplanıyor..." : "Sor"}
                    </Button>
                    {answer && (
                        <>
                            <Textarea
                                value={answer}
                                readOnly
                                className="min-h-[200px] bg-muted resize-none"
                            />
                            {youtubeLinks.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">📚 Kaynaklar</h3>
                                    <ul className="list-disc ml-4">
                                        {youtubeLinks.map((link, i) => (
                                            <li key={i}>
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 underline"
                                                >
                                                    {link.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
