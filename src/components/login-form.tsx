import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="flex flex-col md:flex-row p-0 h-[400px]">
                    {/* Form */}
                    <div className="w-full md:w-1/2 p-6 md:p-8">
                        <form className="flex flex-col gap-6 h-full justify-center">
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
                                />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Parola</Label>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                        Parola mı unuttum
                                    </a>
                                </div>
                                <Input id="password" type="password" required />
                            </div>

                            <Button type="submit" className="w-full">
                                Giriş
                            </Button>

                            <div className="text-center text-sm">
                                Hesabınız yok mu? Hemen{" "}
                                <a href="#" className="underline underline-offset-4">
                                    Oluşturalım
                                </a>
                            </div>
                        </form>
                    </div>
                    
                    <Separator
                        orientation="vertical"
                        className="hidden md:block h-full w-px bg-gray-300"
                    />
                    
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
                Burdan <a href="#">Hizmet Şartlarımızı</a> ve{" "}
                <a href="#">Gizlilik Politikamızı</a> görebilirsiniz.
            </div>
        </div>
    );
}
