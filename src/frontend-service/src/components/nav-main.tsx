"use client";

import { type LucideIcon } from "lucide-react";

import { useAuth } from "@/context/auth-context";

import { Collapsible } from "./ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    authRequired: number;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { isAuthenticated } = useAuth();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          // Check if the item should be displayed based on authentication requirement
          (isAuthenticated
            ? item.authRequired === 0 || item.authRequired === 1
            : item.authRequired === 0 || item.authRequired === -1)
            ? (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <a href={item.url}>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </a>
              </Collapsible>
            )
            : null
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
