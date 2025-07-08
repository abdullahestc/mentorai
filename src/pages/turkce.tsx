import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Turkce() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </div>
      </header>

      {/* Başlık ve Buton Satırı */}
      <div className="flex items-center justify-between px-5 mt-4">
        <h3 className="text-3xl font-semibold tracking-tight">TÜRKÇE</h3>
        <Button variant="outline">Kaydet</Button>
      </div>

      {/* Card */}
      <Card className="w-full max-w-sm ml-5 mt-4">
        <CardHeader>
          <CardTitle>Sözlükte anlam</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {[
                "Konu Çalışması",
                "1. Tekrar",
                "2. Tekrar",
                "3. Tekrar",
                "4. Tekrar",
                "5. Tekrar",
                "1. Kaynak",
                "2. Kaynak",
                "3. Kaynak",
                "4. Kaynak",
              ].map((label, index) => (
                <div className="flex items-center gap-2" key={index}>
                  <Checkbox id={`checkbox-${index}`} />
                  <Label htmlFor={`checkbox-${index}`}>{label}</Label>
                </div>
              ))}
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
