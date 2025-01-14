"use client";

import {
  Cloud,
  ImageIcon,
  KeyRound,
  LayoutDashboard,
  UserCircle,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

const data = {
  teams: [
    {
      name: "CloudCheck",
      logo: Cloud,
      plan: "Free Team",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      authRequired: 0,
      items: [],
    },
    {
      title: "Image Checker ",
      url: "/dashboard/image-checker",
      icon: ImageIcon,
      authRequired: 0,
      items: [],
    },
    {
      title: "API Management",
      url: "/dashboard/api",
      icon: KeyRound,
      authRequired: 1,
      items: [],
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: UserCircle,
      authRequired: 1,
      items: [],
    },
  ],
  projects: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
