"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const topics = [
  {
    title: "Felsefe’nin Alanı",
    konuCalismasi: true,
    tekrarlar: ["1. Tekrar", "2. Tekrar", "3. Tekrar", "4. Tekrar"],
    kaynaklar: ["1. Kaynak", "2. Kaynak", "3. Kaynak", "4.  Kaynak"],
  },
  {
    title: "Bilgi Felsefesi",
    konuCalismasi: true,
    tekrarlar: ["1. Tekrar", "2. Tekrar", "3. Tekrar", "4. Tekrar"],
    kaynaklar: ["1. Kaynak", "2. Kaynak", "3. Kaynak", "4. Kaynak"],
  },
  {
    title: "Varlık Felsefesi",
    konuCalismasi: true,
    tekrarlar: ["1. Tekrar", "2. Tekrar", "3. Tekrar", "4. Tekrar"],
    kaynaklar: ["1. Kaynak", "2. Kaynak", "3. Kaynak", "4. Kaynak"],
  },
  {
    title: "Ahlak Felsefesi",
    konuCalismasi: true,
    tekrarlar: ["1. Tekrar", "2. Tekrar", "3. Tekrar", "4. Tekrar"],
    kaynaklar: ["1. Kaynak", "2. Kaynak", "3. Kaynak", "4. Kaynak"],
  },
  {
    title: "Sanat Felsefesi",
    konuCalismasi: true,
    tekrarlar: ["1. Tekrar", "2. Tekrar", "3. Tekrar", "4. Tekrar"],
    kaynaklar: ["1. Kaynak", "2. Kaynak", "3. Kaynak", "4. Kaynak"],
  },
  {
    title: "Din Felsefesi",
    konuCalismasi: true,
    tekrarlar: ["1. Tekrar", "2. Tekrar", "3. Tekrar", "4. Tekrar"],
    kaynaklar: ["1. Kaynak", "2. Kaynak", "3. Kaynak", "4. Kaynak"],
  },
  {
    title: "Siyaset Felsefesi",
    konuCalismasi: true,
    tekrarlar: ["1. Tekrar", "2. Tekrar", "3. Tekrar", "4. Tekrar"],
    kaynaklar: ["1. Kaynak", "2. Kaynak", "3. Kaynak", "4. Kaynak"],
  },
  {
    title: "Bilim Felsefesi",
    konuCalismasi: true,
    tekrarlar: ["1. Tekrar", "2. Tekrar", "3. Tekrar", "4. Tekrar"],
    kaynaklar: ["1. Kaynak", "2. Kaynak", "3. Kaynak", "4. Kaynak"],
  },
];

export default function Felsefe() {
  const [checkedStates, setCheckedStates] = useState<{
    [key: string]: boolean;
  }>({});

  const isChecked = useCallback(
    (key: string) => checkedStates[key] || false,
    [checkedStates]
  );

  const handleCheck = (key: string) => {
    const isTurningOff = checkedStates[key] === true;

    setCheckedStates((prev) => {
      const updated = { ...prev, [key]: !prev[key] };

      if (key.startsWith("konu-") && isTurningOff) {
        const topicIdx = parseInt(key.split("-")[1]);
        for (let i = 0; i < topics[topicIdx].tekrarlar.length; i++) {
          updated[`tekrar-${topicIdx}-${i}`] = false;
        }
        for (let i = 0; i < topics[topicIdx].kaynaklar.length; i++) {
          updated[`kaynak-${topicIdx}-${i}`] = false;
        }
      }

      if (key.startsWith("tekrar-") && isTurningOff) {
        const [, topicIdxStr, startIdxStr] = key.split("-");
        const topicIdx = parseInt(topicIdxStr);
        const startIdx = parseInt(startIdxStr);
        const total = topics[topicIdx].tekrarlar.length;
        for (let i = startIdx + 1; i < total; i++) {
          updated[`tekrar-${topicIdx}-${i}`] = false;
        }
      }

      if (key.startsWith("kaynak-") && isTurningOff) {
        const [, topicIdxStr, startIdxStr] = key.split("-");
        const topicIdx = parseInt(topicIdxStr);
        const startIdx = parseInt(startIdxStr);
        const total = topics[topicIdx].kaynaklar.length;
        for (let i = startIdx + 1; i < total; i++) {
          updated[`kaynak-${topicIdx}-${i}`] = false;
        }
      }

      return updated;
    });
  };

  const isEnabled = (
    section: "tekrarlar" | "kaynaklar",
    topicIdx: number,
    idx: number
  ) => {
    const prefix = section === "tekrarlar" ? "tekrar" : "kaynak";
    if (idx === 0) return isChecked(`konu-${topicIdx}`);
    return isChecked(`${prefix}-${topicIdx}-${idx - 1}`);
  };

  const progress = useMemo(() => {
    const total = topics.reduce((sum, topic) => {
      let count = 0;
      if (topic.konuCalismasi) count += 1;
      if (topic.tekrarlar.length > 0) count += 1;
      return sum + count;
    }, 0);

    const done = topics.reduce((sum, topic, idx) => {
      let completed = 0;
      if (topic.konuCalismasi && isChecked(`konu-${idx}`)) completed += 1;
      if (topic.tekrarlar.length > 0 && isChecked(`tekrar-${idx}-0`))
        completed += 1;
      return sum + completed;
    }, 0);

    return total === 0 ? 0 : Math.round((done / total) * 100);
  }, [checkedStates, isChecked]);

  return (
    <>
      <main className="container mx-auto px-4">
        <Card className="w-full max-w-full mx-auto my-6">
          <CardContent className="flex flex-col gap-4 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-semibold tracking-tight">FELSEFE</h3>
              <div className="flex items-center gap-4 w-1/2">
                <Button variant="outline">Kaydet</Button>
                <Progress
                  value={progress}
                  className="w-full transition-all duration-1000 ease-in-out delay-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-full mx-auto my-6">
          {topics.map((topic, topicIdx) => (
            <Card key={topicIdx} className="w-full">
              <CardHeader>
                <CardTitle>{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-6">
                  {topic.konuCalismasi && (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`konu-${topicIdx}`}
                        checked={isChecked(`konu-${topicIdx}`)}
                        onCheckedChange={() => handleCheck(`konu-${topicIdx}`)}
                      />
                      <Label htmlFor={`konu-${topicIdx}`}>Konu Çalışması</Label>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                      {topic.tekrarlar.map((label, i) => (
                        <div
                          className="flex items-center gap-2"
                          key={`tekrar-${topicIdx}-${i}`}
                        >
                          <Checkbox
                            id={`tekrar-${topicIdx}-${i}`}
                            checked={isChecked(`tekrar-${topicIdx}-${i}`)}
                            onCheckedChange={() =>
                              handleCheck(`tekrar-${topicIdx}-${i}`)
                            }
                            disabled={!isEnabled("tekrarlar", topicIdx, i)}
                          />
                          <Label htmlFor={`tekrar-${topicIdx}-${i}`}>
                            {label}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-3">
                      {topic.kaynaklar.map((label, i) => (
                        <div
                          className="flex items-center gap-2"
                          key={`kaynak-${topicIdx}-${i}`}
                        >
                          <Checkbox
                            id={`kaynak-${topicIdx}-${i}`}
                            checked={isChecked(`kaynak-${topicIdx}-${i}`)}
                            onCheckedChange={() =>
                              handleCheck(`kaynak-${topicIdx}-${i}`)
                            }
                            disabled={!isEnabled("kaynaklar", topicIdx, i)}
                          />
                          <Label htmlFor={`kaynak-${topicIdx}-${i}`}>
                            {label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
