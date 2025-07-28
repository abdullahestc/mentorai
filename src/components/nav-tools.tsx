"use client"

import {AlarmClock, House } from "lucide-react"



import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

export function NavTools() {
    const tools = [
        {
            name: "Ana Sayfa",
            url: "/",
            icon: House,
        },
    ]

    return (
        <SidebarGroup>
            <SidebarMenu>
                {tools.map((tool) => (
                    <SidebarMenuItem key={tool.name}>
                        <SidebarMenuButton tooltip={tool.name} asChild>
                            <a href={tool.url} className="flex items-center gap-2">
                                <tool.icon />
                                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">
                  {tool.name}
                </span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
