"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function Header() {
    const { state } = useSidebar();

    const isCollapsed = state === "collapsed";

    return (
        <header
            className={`fixed top-0 right-0 z-50 flex flex-col bg-white dark:bg-background transition-all duration-300
        ${isCollapsed ? "ml-16 w-[calc(100%-4rem)]" : "ml-64 w-[calc(100%-16rem)]"}
      `}
        >
            <div
                className={`flex shrink-0 items-center gap-2 px-4 transition-all duration-300 
          ${isCollapsed ? "h-12" : "h-16"}
        `}
            >
                <SidebarTrigger
                    className={`transition-all duration-300 ${
                        isCollapsed ? "-ml-0" : "-ml-1"
                    }`}
                />
            </div>

            <Separator className="h-px w-full transition-all duration-300" />
        </header>
    );
}
