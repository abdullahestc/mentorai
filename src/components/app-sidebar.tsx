import * as React from "react";
import {
  Frame,
  PieChart,
  SquareTerminal,
  SquareCode,
  ClockFading,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { NavTools } from "@/components/nav-tools"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  
  navMain: [
    {
      title: "Dersler",
      url: "dersler",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Türkçe",
          url: "turkce",
        },
        {
          title: "Matematik",
          url: "matematik",
        },
        {
          title: "Geometri",
          url: "geometri",
        },
        {
          title: "Fizik",
          url: "fizik",
        },
        {
          title: "Kimya",
          url: "kimya",
        },
        {
          title: "Biyoloji",
          url: "biyoloji",
        },
        {
          title: "Tarih",
          url: "tarih",
        },
        {
          title: "Coğrafya",
          url: "cografya",
        },
        {
          title: "Felsefe",
          url: "felsefe",
        },
        {
          title: "Din",
          url: "din",
        },
      ],
    },
  ],
  projects: [
    {
      name: "AI Asistan",
      url: "asistan",
      icon: Frame,
    },
    {
      name: "Deneme Takip",
      url: "deneme",
      icon: PieChart,
    },
    {
      name: "Haftalık Program",
      url: "program",
      icon: SquareCode,
    },
    {
      name: "Çalışma Vakti",
      url: "pomodoro",
      icon: ClockFading,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center justify-center p-4">
        <a href="/" className="block">
          <img
              src="/robokoclogo.png"
              alt="Logo"
              className="h-10 hidden group-[data-collapsed=false]/sidebar:block transition-all"
          />
          <img
              src="/robokocico.svg"
              alt="Logo Icon"
              className="h-10 block group-[data-collapsed=false]/sidebar:hidden transition-all"
          />
        </a>
        <Separator/>
      </SidebarHeader>
      <SidebarContent>
        <NavTools />
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
