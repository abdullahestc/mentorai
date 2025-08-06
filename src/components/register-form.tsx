"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

const BOLUMLER = ["Sayısal", "Sözel", "EA", "Dil"] as const;
const SINIFLAR = ["9", "10", "11", "12", "Mezun"] as const;
const OZEL_DERS_LISTESI = [
    "Türkçe",
    "Matematik",
    "Geometri",
    "Fizik",
    "Kimya",
    "Biyoloji",
    "Tarih",
    "Coğrafya",
    "Felsefe",
    "Din",
];

type NetSatiri = { ders: string; net: number | string };
type MezunDeneyimi = { yil: string; siralama: number | string };
type SaatAraligi = { baslangic: string; bitis: string };

export function RegisterForm({
                                 className,
                                 ...props
                             }: React.ComponentProps<"div">) {
    // Temel durumlar
    const [bolum, setBolum] = useState<(typeof BOLUMLER)[number]>("Sayısal");
    const [sinif, setSinif] = useState<(typeof SINIFLAR)[number]>("12");
    const [okul, setOkul] = useState<string>("");
    const [dershane, setDershane] = useState<string>("");

    // Mezun deneyi/sıralama (çoklu)
    const [mezunDeneyimleri, setMezunDeneyimleri] = useState<MezunDeneyimi[]>([]);

    // Özel ders (çoklu)
    const [ozelDersler, setOzelDersler] = useState<string[]>([]);


    // TYT / AYT / Hedef netler (dinamik)
    const [tytNetOrt, setTytNetOrt] = useState<NetSatiri[]>([
        { ders: "Türkçe", net: 0 },
        { ders: "Sosyal", net: 0 },
        { ders: "Matematik", net: 0 },
        { ders: "Fen", net: 0 },
    ]);

    const [aytNetOrt, setAytNetOrt] = useState<NetSatiri[]>(
        bolum === "Sayısal"
            ? [
                { ders: "Matematik", net: 0 },
                { ders: "Fizik", net: 0 },
                { ders: "Kimya", net: 0 },
                { ders: "Biyoloji", net: 0 },
            ]
            : bolum === "EA"
                ? [
                    { ders: "Matematik", net: 0 },
                    { ders: "Edebiyat", net: 0 },
                    { ders: "Coğrafya-1", net: 0 },
                ]
                : bolum === "Sözel"
                    ? [
                        { ders: "Edebiyat", net: 0 },
                        { ders: "Tarih-1", net: 0 },
                        { ders: "Coğrafya-1", net: 0 },
                        { ders: "Tarih-2", net: 0 },
                        { ders: "Coğrafya-2", net: 0 },
                        { ders: "Felsefe Grubu", net: 0 },
                        { ders: "Din", net: 0 },
                    ]
                    : [{ ders: "Yabancı Dil", net: 0 }]
    );

    const [obp, setObp] = useState<number | string>("");
    const [hedefOkul, setHedefOkul] = useState<string>("");
    const [hedefBolum, setHedefBolum] = useState<string>("");
    const [hedefSiralama, setHedefSiralama] = useState<number | string>("");
    const [bolumuSecmeSebebi, setBolumuSecmeSebebi] = useState<string>("");
    const [hedefNetler, setHedefNetler] = useState<NetSatiri[]>([]);

    // Çalışma alışkanlıkları
    const [ortCalismaSuresiSaat, setOrtCalismaSuresiSaat] = useState<number | string>("");
    const [calismaSaatAraliklari, setCalismaSaatAraliklari] = useState<SaatAraligi[]>([]);
    const [ozelKonularDurum, setOzelKonularDurum] = useState<string>("");
    const [denemeTakip, setDenemeTakip] = useState<boolean>(false);
    const [kaynaklar, setKaynaklar] = useState<string>("");

    // Öğrenme tercihleri
    const [ogrenmeStili, setOgrenmeStili] = useState<string[]>([]);
    const [dersBazliStrateji, setDersBazliStrateji] = useState<string>("");
    const [calismaYontemi, setCalismaYontemi] = useState<"Konu" | "Soru" | "Dengeli">("Dengeli");
    const [tekBasinaMi, setTekBasinaMi] = useState<"Tek başıma" | "Birileriyle">("Tek başıma");

    // Motivasyon & yaşam tarzı
    const [sinavKaygi, setSinavKaygi] = useState<string>("");
    const [motivasyonDusunce, setMotivasyonDusunce] = useState<string>("");
    const [sosyalDestek, setSosyalDestek] = useState<string>("");
    const [uykuBeslenme, setUykuBeslenme] = useState<string>("");
    const [geriCekenEtmen, setGeriCekenEtmen] = useState<string>("");

    // helpers
    const toggleSet = (arr: string[], setArr: (v: string[]) => void, v: string) => {
        setArr(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
    };

    const addRow = <T,>(arr: T[], setArr: (v: T[]) => void, row: T) => setArr([...arr, row]);
    const removeRow = <T,>(arr: T[], setArr: (v: T[]) => void, idx: number) =>
        setArr(arr.filter((_, i) => i !== idx));

    // bölüm değişince AYT defaultlarını sıfırdan vermek istersen:
    React.useEffect(() => {
        setAytNetOrt(
            bolum === "Sayısal"
                ? [
                    { ders: "Matematik", net: 0 },
                    { ders: "Fizik", net: 0 },
                    { ders: "Kimya", net: 0 },
                    { ders: "Biyoloji", net: 0 },
                ]
                : bolum === "EA"
                    ? [
                        { ders: "Matematik", net: 0 },
                        { ders: "Edebiyat", net: 0 },
                        { ders: "Coğrafya-1", net: 0 },
                    ]
                    : bolum === "Sözel"
                        ? [
                            { ders: "Edebiyat", net: 0 },
                            { ders: "Tarih-1", net: 0 },
                            { ders: "Coğrafya-1", net: 0 },
                            { ders: "Tarih-2", net: 0 },
                            { ders: "Coğrafya-2", net: 0 },
                            { ders: "Felsefe Grubu", net: 0 },
                            { ders: "Din", net: 0 },
                        ]
                        : [{ ders: "Yabancı Dil", net: 0 }]
        );
    }, [bolum]);
    const [dershaneVarMi, setDershaneVarMi] = useState(false);
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            bolum,
            sinif,
            okul: sinif !== "Mezun" ? okul : undefined,
            dershane,
            mezunDeneyimleri: sinif === "Mezun" ? mezunDeneyimleri : [],
            ozelDersler,
            tytNetOrt,
            aytNetOrt,
            obp,
            hedefOkul,
            hedefBolum,
            hedefSiralama,
            bolumuSecmeSebebi,
            hedefNetler,
            ortCalismaSuresiSaat,
            calismaSaatAraliklari,
            ozelKonularDurum,
            denemeTakip,
            kaynaklar,
            ogrenmeStili,
            dersBazliStrateji,
            calismaYontemi,
            tekBasinaMi,
            sinavKaygi,
            motivasyonDusunce,
            sosyalDestek,
            uykuBeslenme,
            geriCekenEtmen,
        };
        console.log("Register payload:", payload);
        // await fetch("/api/register", { method: "POST", body: JSON.stringify(payload) })
        alert("Kayıt formu gönderildi! (Konsolu kontrol et)");
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0 w-full max-w-full">
                <CardContent className="flex flex-col md:flex-row p-0 h-[600px] w-full">
                    {/* Sol: Form */}
                    <div className="w-full md:w-3/5 p-6 md:p-8">
                        <form onSubmit={onSubmit} className="flex flex-col gap-6 h-full w-full">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Kayıt Ol</h1>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Bilgilerini doldur, sana özel koçluk deneyimini başlatalım.
                                </p>
                            </div>

                            <ScrollArea className="h-[400px] w-full">
                                <div className="space-y-6 w-full pr-5">
                                    <Accordion type="multiple">
                                        {/* Akademik Durum */}
                                        <AccordionItem value="akademik">
                                            <AccordionTrigger className="text-base font-semibold">
                                                Akademik Durum
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="grid gap-2 w-full">
                                                        <Label>Bölüm</Label>
                                                        <Select value={bolum} onValueChange={(v: any) => setBolum(v)}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Seçiniz" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {BOLUMLER.map((b) => (
                                                                    <SelectItem key={b} value={b}>{b}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="grid gap-2 w-full">
                                                        <Label>Sınıf</Label>
                                                        <Select value={sinif} onValueChange={(v: any) => setSinif(v)}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Seçiniz" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {SINIFLAR.map((s) => (
                                                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="flex items-center gap-2 md:col-span-2">
                                                        <Checkbox
                                                            id="dershane"
                                                            checked={dershaneVarMi}
                                                            onCheckedChange={(checked) => setDershaneVarMi(!!checked)}
                                                        />
                                                        <Label htmlFor="dershane">Dershaneye gidiyorum</Label>
                                                    </div>
                                                </div>


                                                {sinif === "Mezun" && (
                                                    <div className="mt-4 space-y-3">
                                                        <Label className="font-medium">
                                                            Mezun Deneyimleri (Yıl + Sıralama)
                                                        </Label>
                                                        {mezunDeneyimleri.map((m, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="grid grid-cols-10 gap-3 items-end p-1"
                                                            >
                                                                <div className="col-span-4">
                                                                    <Label>Yıl</Label>
                                                                    <Input
                                                                        placeholder="YYYY"
                                                                        value={m.yil}
                                                                        onChange={(e) => {
                                                                            const next = [...mezunDeneyimleri];
                                                                            next[idx].yil = e.target.value;
                                                                            setMezunDeneyimleri(next);
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-span-4">
                                                                    <Label>Sıralama</Label>
                                                                    <Input
                                                                        type="number"
                                                                        min={1}
                                                                        placeholder="35000"
                                                                        value={m.siralama}
                                                                        onChange={(e) => {
                                                                            const v = e.target.value;
                                                                            const next = [...mezunDeneyimleri];
                                                                            next[idx].siralama = v === "" ? "" : Number(v);
                                                                            setMezunDeneyimleri(next);
                                                                        }}
                                                                    />
                                                                </div>
                                                                
                                                                <div className="col-span-2">
                                                                    <Button
                                                                        variant="destructive"
                                                                        type="button"
                                                                        className="w-full"
                                                                        onClick={() =>
                                                                            removeRow(mezunDeneyimleri, setMezunDeneyimleri, idx)
                                                                        }
                                                                    >
                                                                        Sil
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ))}

                                                        {/* Yeni deneyim ekleme kısmı */}
                                                        <div className="flex items-center gap-3 p-1">
                                                            <Button
                                                                type="button"
                                                                variant="secondary"
                                                                onClick={() =>
                                                                    addRow(mezunDeneyimleri, setMezunDeneyimleri, {
                                                                        yil: "",
                                                                        siralama: "",
                                                                    })
                                                                }
                                                            >
                                                                + Deneyim Ekle
                                                            </Button>
                                                            <div className="flex items-center gap-2">
                                                                <Label htmlFor="ekNot" className="whitespace-nowrap">
                                                                    OBP
                                                                </Label>
                                                                <Input
                                                                    id="ekNot"
                                                                    placeholder="Örn:84.52"
                                                                    value={""}
                                                                   
                                                                    className="w-full"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* Özel Ders */}
                                        <AccordionItem value="ozelders">
                                            <AccordionTrigger className="text-base font-semibold">
                                                Özel Ders
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="grid gap-2">
                                                    <Label>Hangi derslerden özel ders alıyorsun?</Label>
                                                    <div className="grid grid-cols-2 md:grid-cols-2 gap-2 mt-1">
                                                        {OZEL_DERS_LISTESI.map((d) => (
                                                            <label key={d} className="flex items-center gap-2 rounded-xl border p-2 cursor-pointer">
                                                                <Checkbox
                                                                    checked={ozelDersler.includes(d)}
                                                                    onCheckedChange={() => toggleSet(ozelDersler, setOzelDersler, d)}
                                                                />
                                                                <span className="text-sm">{d}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* Netler */}
                                        <AccordionItem value="netler">
                                            <AccordionTrigger className="text-base font-semibold">
                                                TYT / AYT Net Ortalamaları
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {/* TYT */}
                                                <div className="space-y-2">
                                                    <Label className="font-medium">Ortalama TYT Net </Label>
                                                    {tytNetOrt.map((n, idx) => (
                                                        <div key={idx} className="grid grid-cols-10 gap-2 items-end">
                                                            <div className="col-span-7">
                                                                <Label className="px-3 py-2 border rounded">
                                                                    {n.ders || "Ders adı girilmedi"}
                                                                </Label>
                                                            </div>
                                                            <div className="col-span-3">
                                                                <Label className="mb-2">Net</Label>
                                                                <Input
                                                                    type="number"
                                                                    min={0}
                                                                    max={40}
                                                                    step="0.5"
                                                                    value={n.net}
                                                                    onChange={(e) => {
                                                                        const v = e.target.value;
                                                                        const next = [...tytNetOrt];
                                                                        next[idx].net = v === "" ? "" : Number(v);
                                                                        setTytNetOrt(next);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                   
                                                </div>

                                                <Separator className="my-4" />

                                                {/* AYT */}
                                                <div className="space-y-2">
                                                    <Label className="font-medium">AYT Net Ort ({bolum})</Label>
                                                    {aytNetOrt.map((n, idx) => (
                                                        <div key={idx} className="grid grid-cols-10 gap-2 items-end">
                                                            <div className="col-span-7">
                                                                <Label>Ders</Label>
                                                                <Input
                                                                    value={n.ders}
                                                                    onChange={(e) => {
                                                                        const next = [...aytNetOrt];
                                                                        next[idx].ders = e.target.value;
                                                                        setAytNetOrt(next);
                                                                    }}
                                                                    placeholder="Ders adı"
                                                                />
                                                            </div>
                                                            <div className="col-span-3">
                                                                <Label className="mb-2">Net</Label>
                                                                <Input
                                                                    type="number"
                                                                    min={0}
                                                                    max={40}
                                                                    step="0.5"
                                                                    value={n.net}
                                                                    onChange={(e) => {
                                                                        const v = e.target.value;
                                                                        const next = [...aytNetOrt];
                                                                        next[idx].net = v === "" ? "" : Number(v);
                                                                        setAytNetOrt(next);
                                                                    }}
                                                                />
                                                            </div>
                                                            
                                                        </div>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="hedefler">
                                            <AccordionTrigger className="text-base font-semibold">
                                                Hedefler
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                
                                                {/* OBP ve hedefler */}
                                                <div className="grid gap-2 p-1">
                                                    <Label>Hedef Okul</Label>
                                                    <Input
                                                        placeholder="Örn: Boğaziçi Üniversitesi"
                                                        value={hedefOkul}
                                                        onChange={(e) => setHedefOkul(e.target.value)}
                                                    />
                                                </div>

                                                <div className="grid gap-2 mt-3 p-1">
                                                    <Label>Hedef Bölüm</Label>
                                                    <Input
                                                        placeholder="Örn: Bilgisayar Müh."
                                                        value={hedefBolum}
                                                        onChange={(e) => setHedefBolum(e.target.value)}
                                                    />
                                                </div>
                                                <div className="grid gap-2 mt-3 p-1">
                                                    <Label>Bölümü seçme sebebi</Label>
                                                    <Textarea placeholder="Neden bu bölümü istiyorsun?" value={bolumuSecmeSebebi} onChange={(e) => setBolumuSecmeSebebi(e.target.value)} />
                                                </div>

                                                <div className="grid gap-2 mt-3 p-1">
                                                    <Label>Hedef Sıralama</Label>
                                                    <Input
                                                        type="number"
                                                        min={1}
                                                        placeholder="Örn: 15000"
                                                        value={hedefSiralama}
                                                        onChange={(e) => setHedefSiralama(e.target.value === "" ? "" : Number(e.target.value))}
                                                    />
                                                </div>

                                                {/* Hedef netler */}
                                                <div className="mt-4 space-y-2">
                                                    <Label className="font-medium">Hedef Netler</Label>
                                                    {hedefNetler.map((n, idx) => (
                                                        <div key={idx} className="grid grid-cols-12 gap-2 items-end">
                                                            <div className="col-span-7 pl-1">
                                                                <Label>Ders</Label>
                                                                <Input
                                                                    value={n.ders}
                                                                    onChange={(e) => {
                                                                        const next = [...hedefNetler];
                                                                        next[idx].ders = e.target.value;
                                                                        setHedefNetler(next);
                                                                    }}
                                                                    placeholder="Ders adı"
                                                                />
                                                            </div>
                                                            <div className="col-span-3">
                                                                <Label>Net</Label>
                                                                <Input
                                                                    type="number"
                                                                    min={0}
                                                                    max={40}
                                                                    step="0.5"
                                                                    value={n.net}
                                                                    onChange={(e) => {
                                                                        const v = e.target.value;
                                                                        const next = [...hedefNetler];
                                                                        next[idx].net = v === "" ? "" : Number(v);
                                                                        setHedefNetler(next);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <Button type="button" variant="destructive" className="w-full" onClick={() => removeRow(hedefNetler, setHedefNetler, idx)}>
                                                                    Sil
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <Button type="button" variant="secondary" onClick={() => addRow(hedefNetler, setHedefNetler, { ders: "", net: "" })}>
                                                        + Hedef Net Ekle
                                                    </Button>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* Çalışma Alışkanlıkları */}
                                        <AccordionItem value="calisma">
                                            <AccordionTrigger className="text-base font-semibold">
                                                Çalışma Alışkanlıkları
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="grid grid-cols-1  gap-3">
                                                    <div className="grid gap-2 p-1">
                                                        <Label>Ortalama Çalışma Süresi (saat/gün)</Label>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            max={24}
                                                            step="0.5"
                                                            placeholder="Örn: 3.5"
                                                            value={ortCalismaSuresiSaat}
                                                            onChange={(e) => setOrtCalismaSuresiSaat(e.target.value === "" ? "" : Number(e.target.value))}
                                                        />
                                                    </div>
                                                </div>
                                                <Separator className="my-4" />
                                                <div className="mt-3 space-y-2">
                                                    <Label>Hangi saat aralıklarında çalışmayı seversin?</Label>
                                                    {calismaSaatAraliklari.map((s, idx) => (
                                                        <div key={idx} className="grid grid-cols-12 gap-2 items-end">
                                                            <div className="col-span-5 pl-1">
                                                                <Label>Başlangıç</Label>
                                                                <Input
                                                                    type="time"
                                                                    value={s.baslangic}
                                                                    onChange={(e) => {
                                                                        const next = [...calismaSaatAraliklari];
                                                                        next[idx].baslangic = e.target.value;
                                                                        setCalismaSaatAraliklari(next);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-span-5">
                                                                <Label>Bitiş</Label>
                                                                <Input
                                                                    type="time"
                                                                    value={s.bitis}
                                                                    onChange={(e) => {
                                                                        const next = [...calismaSaatAraliklari];
                                                                        next[idx].bitis = e.target.value;
                                                                        setCalismaSaatAraliklari(next);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <Button type="button" variant="destructive" className="w-full" onClick={() => removeRow(calismaSaatAraliklari, setCalismaSaatAraliklari, idx)}>
                                                                    Sil
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                        onClick={() => addRow(calismaSaatAraliklari, setCalismaSaatAraliklari, { baslangic: "", bitis: "" })}
                                                    >
                                                        + Aralık Ekle
                                                    </Button>
                                                </div>
                                                <Separator className="my-4" />
                                                <div className="grid gap-2 mt-4">
                                                    <Label>Paragraf / Problem / Geometri gibi özel konularda durumun</Label>
                                                    <RadioGroup
                                                        value={ozelKonularDurum}
                                                        onValueChange={setOzelKonularDurum}
                                                        className="flex flex-row gap-4"
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="iyi" id="iyi" />
                                                            <Label htmlFor="iyi">İyi</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="orta" id="orta" />
                                                            <Label htmlFor="orta">Orta</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="kotu" id="kotu" />
                                                            <Label htmlFor="kotu">Kötü</Label>
                                                        </div>
                                                    </RadioGroup>
                                                    
                                                </div>
                                                <Separator className="my-4" />
                                                <div className="flex items-center gap-3 mt-3">
                                                    <Switch checked={denemeTakip} onCheckedChange={setDenemeTakip} />
                                                    <Label className="!m-0">Deneme sonuçlarını düzenli takip ediyor musun?</Label>
                                                </div>
                                                <Separator className="my-4" />
                                                <div className="grid gap-2 mt-3 p-1">
                                                    <Label>Hangi kaynakları kullanıyorsun? (Yayınevleri, platformlar, dijital araçlar vs.)</Label>
                                                    <Textarea placeholder="Örn: 3D TYT Matematik, Palme Biyoloji, Kunduz, Notion..." value={kaynaklar} onChange={(e) => setKaynaklar(e.target.value)} />
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* Öğrenme Tercihleri */}
                                        <AccordionItem value="ogrenme">
                                            <AccordionTrigger className="text-base font-semibold">
                                                Öğrenme Tercihleri
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="grid gap-2">
                                                    <Label>En iyi nasıl öğreniyorsun?</Label>
                                                    <div className="grid grid-cols-2 md:grid-cols-2 gap-2 mt-1">
                                                        {["Video", "Not çıkarma", "Soru çözerek", "Anlatarak"].map((opt) => (
                                                            <label key={opt} className="flex items-center gap-2 border rounded-xl p-2 cursor-pointer">
                                                                <Checkbox
                                                                    checked={ogrenmeStili.includes(opt)}
                                                                    onCheckedChange={() => toggleSet(ogrenmeStili, setOgrenmeStili, opt)}
                                                                />
                                                                <span className="text-sm">{opt}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                                <Separator className="my-4" />
                                                <div className="grid gap-2 mt-3 p-1">
                                                    <Label>Her ders için ayrı bir stratejin var mı?</Label>
                                                    <Textarea placeholder="Örn: Paragraf için süreli çözüm, matematik için konu+deneme..." value={dersBazliStrateji} onChange={(e) => setDersBazliStrateji(e.target.value)} />
                                                </div>
                                                <Separator className="my-4" />
                                                <div className="grid gap-2 mt-3">
                                                    <Label>Konu çalışması mı soru çözümü mü daha ağırlıklı gidiyor?</Label>
                                                    <RadioGroup value={calismaYontemi} onValueChange={(v: any) => setCalismaYontemi(v)} className="flex flex-wrap gap-4">
                                                        {["Konu", "Soru", "Dengeli"].map((opt) => (
                                                            <div key={opt} className="flex items-center space-x-2">
                                                                <RadioGroupItem id={`cy_${opt}`} value={opt} />
                                                                <Label htmlFor={`cy_${opt}`}>{opt}</Label>
                                                            </div>
                                                        ))}
                                                    </RadioGroup>
                                                </div>
                                                <Separator className="my-4" />
                                                <div className="grid gap-2 mt-3">
                                                    <Label>Tek başına mı daha verimli çalışıyorsun, birileriyle mi?</Label>
                                                    <RadioGroup value={tekBasinaMi} onValueChange={(v: any) => setTekBasinaMi(v)} className="flex flex-wrap gap-4">
                                                        {["Tek başıma", "Birileriyle"].map((opt) => (
                                                            <div key={opt} className="flex items-center space-x-2">
                                                                <RadioGroupItem id={`tb_${opt}`} value={opt} />
                                                                <Label htmlFor={`tb_${opt}`}>{opt}</Label>
                                                            </div>
                                                        ))}
                                                    </RadioGroup>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* Motivasyon & Yaşam Tarzı */}
                                        <AccordionItem value="motivasyon">
                                            <AccordionTrigger className="text-base font-semibold">
                                                Motivasyon & Yaşam Tarzı
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="grid gap-2 p-1">
                                                    <Label>Sınavla ilgili en büyük korkun veya kaygın ne?</Label>
                                                    <Textarea value={sinavKaygi} onChange={(e) => setSinavKaygi(e.target.value)} />
                                                </div>
                                                <Separator className="my-4" />
                                                <div className="grid gap-2 mt-3 p-1">
                                                    <Label>Motivasyonun düştüğünde ne yapıyorsun?</Label>
                                                    <Textarea value={motivasyonDusunce} onChange={(e) => setMotivasyonDusunce(e.target.value)} />
                                                </div>
                                                <Separator className="my-4" />
                                                <div className="grid gap-2 mt-3 p-1">
                                                    <Label>Sosyal destek alıyor musun? (Aile, öğretmen, arkadaş)</Label>
                                                    <Textarea value={sosyalDestek} onChange={(e) => setSosyalDestek(e.target.value)} />
                                                </div>
                                                <Separator className="my-4" />
                                                <div className="grid gap-2 mt-3 p-1">
                                                    <Label>Uyku ve beslenme düzenin nasıl?</Label>
                                                    <Textarea value={uykuBeslenme} onChange={(e) => setUykuBeslenme(e.target.value)} />
                                                </div>
                                                <Separator className="my-4" />
                                                <div className="grid gap-2 mt-3 p-1">
                                                    <Label>Sence en çok ne seni geriye çekiyor?</Label>
                                                    <Textarea value={geriCekenEtmen} onChange={(e) => setGeriCekenEtmen(e.target.value)} />
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </ScrollArea>

                            <div className="mt-4 sticky bottom-0 bg-white p-4 border-t w-full">
                                <Button type="submit" className="w-full">Kaydı Tamamla</Button>
                                <div className="text-center text-sm mt-2">
                                    Zaten hesabın var mı?{" "}
                                    <a href="/login" className="underline underline-offset-4">
                                        Giriş yap
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Dikey Ayraç */}
                    <Separator
                        orientation="vertical"
                        className="hidden md:block h-full w-px bg-gray-300"
                    />

                    {/* Sağ: Görsel */}
                    <div className="relative hidden md:flex w-1/2 items-center justify-center p-4">
                        <img
                            src="/robokoclogo.png"
                            alt="Image"
                            className="w-48 h-auto object-contain"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                Buradan <a href="#">Hizmet Şartlarımızı</a> ve{" "}
                <a href="#">Gizlilik Politikamızı</a> görebilirsiniz.
            </div>
        </div>
    );
}
