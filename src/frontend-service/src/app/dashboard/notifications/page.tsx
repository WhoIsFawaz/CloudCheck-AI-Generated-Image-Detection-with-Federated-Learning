"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Bell, CheckCircle2, Info, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function NotificationsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Notifications</h1>
        <p className="text-muted-foreground mt-2">
          Examples of different notification types and alerts
        </p>
      </div>

      <div className="grid gap-6">
        {/* Alerts Section */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>
                This is a default alert with an example link.{" "}
                <a href="#" className="underline">
                  Click here
                </a>{" "}
                to learn more.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error Alert</AlertTitle>
              <AlertDescription>
                Something went wrong! Please try again later.
              </AlertDescription>
            </Alert>

            <Alert className="border-yellow-500 text-yellow-500">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning Alert</AlertTitle>
              <AlertDescription>
                Please be careful with this action.
              </AlertDescription>
            </Alert>

            <Alert className="border-green-500 text-green-500">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success Alert</AlertTitle>
              <AlertDescription>
                Your action was completed successfully!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Toast Notifications Section */}
        <Card>
          <CardHeader>
            <CardTitle>Toast Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                onClick={() =>
                  toast.success("Operation completed successfully!", {
                    description: "Your changes have been saved.",
                  })
                }
                className="bg-green-500 hover:bg-green-600"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Success Toast
              </Button>

              <Button
                onClick={() =>
                  toast.info("New update available", {
                    description:
                      "Click to learn more about the latest features.",
                  })
                }
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-50"
              >
                <Info className="mr-2 h-4 w-4" />
                Info Toast
              </Button>

              <Button
                onClick={() =>
                  toast.warning("Please proceed with caution", {
                    description: "This action cannot be undone.",
                  })
                }
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Warning Toast
              </Button>

              <Button
                onClick={() =>
                  toast.error("Operation failed", {
                    description: "Please try again or contact support.",
                  })
                }
                variant="destructive"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Error Toast
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Notifications Example */}
        <Card>
          <CardHeader>
            <CardTitle>Real-time Notifications Example</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() =>
                toast("New Message", {
                  description:
                    "You have received a new message from the system.",
                  icon: <Bell className="h-4 w-4" />,
                  duration: 4000,
                })
              }
              variant="outline"
              className="w-full"
            >
              <Bell className="mr-2 h-4 w-4" />
              Simulate Real-time Notification
            </Button>
          </CardContent>
        </Card>

        {/* Advanced Toast Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Advanced Toast Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() =>
                  toast("Action Required", {
                    description: "Do you want to proceed with this action?",
                    action: {
                      label: "Confirm",
                      onClick: () => toast.success("Action confirmed!"),
                    },
                    cancel: {
                      label: "Cancel",
                      onClick: () => toast.error("Action cancelled"),
                    },
                  })
                }
                variant="outline"
              >
                Interactive Toast
              </Button>

              <Button
                onClick={() => {
                  const toastId = toast.loading("Processing your request...");
                  setTimeout(() => {
                    toast.dismiss(toastId);
                    toast.success("Process completed!");
                  }, 2000);
                }}
                variant="outline"
              >
                Loading Toast
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
