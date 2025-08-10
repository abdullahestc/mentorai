import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useState } from "react";
import axios from 'axios';
import api from "@/lib/api";
import Link from "next/link"
import Image from "next/image"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            console.log("Giriş başarılı:", response.data);
            alert("Giriş başarılı! Token'ınız konsolda loglandı.");

            localStorage.setItem('token', response.data.access_token);

            window.location.href = '/dersler';

        } catch (err: any) {
            console.error("Giriş hatası:", err.response);

            const errorMessage = err.response?.data?.message || "Bir hata oluştu. Lütfen tekrar deneyin.";
            setError(errorMessage);
        }
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="flex flex-col md:flex-row p-0 h-[400px]">
                    {/* Form */}
                    <div className="w-full md:w-1/2 p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full justify-center">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Hoş Geldiniz</h1>
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="email">E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@örnek.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Parola</Label>
                                    <Link
                                        href="#"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                        Parola mı unuttum
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                            <Button type="submit" className="w-full">
                                Giriş
                            </Button>

                            <div className="text-center text-sm">
                                Hesabınız yok mu? Hemen{" "}
                                <Link href="/register" className="underline underline-offset-4">
                                    Oluşturalım
                                </Link>
                            </div>
                        </form>
                    </div>

                    <Separator
                        orientation="vertical"
                        className="hidden md:block h-full w-px bg-gray-300"
                    />

                    <div className="relative hidden md:flex w-1/2 items-center justify-center p-4">
                        <Image
                            src="/robokoclogo.png"
                            alt="Image"
                            width={192}
                            height={192}
                            className="w-48 h-auto object-contain"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                Burdan <a href="#">Hizmet Şartlarımızı</a> ve{" "}
                <a href="#">Gizlilik Politikamızı</a> görebilirsiniz.
            </div>
        </div>
    )
}
