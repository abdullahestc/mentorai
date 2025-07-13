import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/ui/header"
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
        <SidebarProvider>
            <AppSidebar />
            <Header />
            <SidebarInset>
                <main className="pt-16">
                    <Component {...pageProps} />
                </main>
            </SidebarInset>
        </SidebarProvider>
    </>
  );
}
