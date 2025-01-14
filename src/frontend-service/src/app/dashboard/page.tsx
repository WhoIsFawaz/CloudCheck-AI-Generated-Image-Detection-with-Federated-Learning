"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, ImageIcon, UserIcon, LogIn } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function QuickAction({ title, description, icon, href }: QuickActionProps) {
  return (
    <Card className="hover:bg-accent transition-colors">
      <Link href={href}>
        <CardHeader>
          <div className="flex items-center gap-4">
            {icon}
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        </CardHeader>
      </Link>
    </Card>
  );
}

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();

  const quickActions = [
    {
      title: "Login",
      description: "Login to gain access to our image checking API service",
      authRequired: -1,
      icon: <LogIn className="h-8 w-8" />,
      href: "/auth/login",
    },
    {
      title: "Image Checker",
      description: "Check if an image is real or AI-generated",
      authRequired: 0,
      icon: <ImageIcon className="h-8 w-8" />,
      href: "/dashboard/image-checker",
    },
    {
      title: "Profile Settings",
      description: "Manage your account settings",
      authRequired: 1,
      icon: <UserIcon className="h-8 w-8" />,
      href: "/dashboard/profile",
    },
    {
      title: "API",
      description: "Manage your API keys and integrations",
      authRequired: 1,
      icon: <Code className="h-8 w-8" />,
      href: "/dashboard/api",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to CloudCheck. Get started with the quick actions below.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {quickActions.map((action) =>
                (isAuthenticated
                  ? action.authRequired === 0 || action.authRequired === 1
                  : action.authRequired === 0 || action.authRequired === -1)
                  ? <QuickAction key={action.href} {...action} />
                  : null
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your recent image checks and system activities will appear here.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Image Checker Service
                  </span>
                  <span className="text-sm text-green-500">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Local Training Service
                  </span>
                  <span className="text-sm text-green-500">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">API Service</span>
                  <span className="text-sm text-green-500">Operational</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
