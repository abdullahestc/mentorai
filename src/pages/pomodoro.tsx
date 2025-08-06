"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Mode = "pomodoro" | "shortBreak" | "longBreak";

const DURATIONS: Record<Mode, number> = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const MODE_LABELS: Record<Mode, string> = {
  pomodoro: "Pomodoro",
  shortBreak: "Kısa Mola",
  longBreak: "Uzun Mola",
};

export default function PomodoroApp() {
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState(DURATIONS["pomodoro"]);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mod değişimi
  useEffect(() => {
    setTimeLeft(DURATIONS[mode]);
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [mode]);

  // Sayaç
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(DURATIONS[mode]);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-muted px-4">
        <Card className="w-full max-w-2xl text-center p-10 space-y-8 shadow-2xl rounded-3xl">
          <CardHeader>
            <CardTitle className="text-4xl font-bold">Pomodoro Zamanlayıcı</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Mod Seçimi */}
            <div className="flex justify-center gap-4">
              {(["pomodoro", "shortBreak", "longBreak"] as Mode[]).map((m) => (
                  <Button
                      key={m}
                      variant={mode === m ? "default" : "secondary"}
                      onClick={() => setMode(m)}
                      className={cn("text-lg px-6 py-3")}
                  >
                    {MODE_LABELS[m]}
                  </Button>
              ))}
            </div>

            {/* Süre */}
            <div className="text-8xl font-mono font-semibold">{formatTime(timeLeft)}</div>

            {/* İlerleme */}
            <Progress value={(timeLeft / DURATIONS[mode]) * 100} className="h-4" />

            {/* Kontroller */}
            <div className="flex justify-center gap-6">
              <Button className="text-lg px-6 py-3" onClick={() => setIsRunning((prev) => !prev)}>
                {isRunning ? "Durdur" : "Başlat"}
              </Button>
              <Button className="text-lg px-6 py-3" variant="secondary" onClick={handleReset}>
                Sıfırla
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
