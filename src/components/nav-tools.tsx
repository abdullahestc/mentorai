"use client"

import Link from "next/link"
import { House } from "lucide-react"

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
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
                            <Link href={tool.url} className="flex items-center gap-2">
                                <tool.icon />
                                <span className="group-data-[collapsible=icon]/sidebar-wrapper:hidden">
                                    {tool.name}
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
