import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/ui/header"
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    const noLayoutRoutes = ["/login"];

    const isLayoutVisible = !noLayoutRoutes.includes(router.pathname);
  return (
    <>
        {isLayoutVisible ? (
        <SidebarProvider>
            <AppSidebar />
            <Header />
            <SidebarInset>
                <main className="pt-16">
                    <Component {...pageProps} />
                </main>
            </SidebarInset>
        </SidebarProvider>
        ) : (
            <Component {...pageProps} />
        )}
    </>
  );
}
