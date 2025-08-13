// /pages/api/ask.ts
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
    api: { bodyParser: false }, // streaming için kapalı
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method Not Allowed" });
        return;
    }

    try {
        // Body'yi manuel oku
        const buffers: Uint8Array[] = [];
        for await (const chunk of req) buffers.push(chunk);
        const bodyString = Buffer.concat(buffers).toString();
        const { messages } = JSON.parse(bodyString);

        if (!messages || !Array.isArray(messages)) {
            res.status(400).json({ error: "Messages array is required" });
            return;
        }

        // SSE başlıkları
        res.writeHead(200, {
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
        });
        res.flushHeaders?.();

        // OpenAI stream isteği
        const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o", // istersen gpt-4o-mini daha hızlı
                messages,
                stream: true,
            }),
        });

        if (!upstream.body) {
            res.write(`data: ${JSON.stringify({ error: "No response body" })}\n\n`);
            res.end();
            return;
        }

        const reader = upstream.body.getReader();
        const decoder = new TextDecoder("utf-8");

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk
                .split("\n")
                .map(l => l.trim())
                .filter(l => l.startsWith("data:"));

            for (const line of lines) {
                const msg = line.replace(/^data:\s*/, "");
                if (msg === "[DONE]") {
                    res.write("data: [DONE]\n\n");
                    res.end();
                    return;
                }
                res.write(`data: ${msg}\n\n`);
            }
        }
    } catch (err) {
        console.error("OpenAI API error:", err);
        res.write(`data: ${JSON.stringify({ error: "Internal Server Error" })}\n\n`);
        res.end();
    }
}
