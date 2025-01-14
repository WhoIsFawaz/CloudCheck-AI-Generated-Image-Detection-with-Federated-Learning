"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import AuthService from "@/services/auth-service";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  agree: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms and Conditions",
  }),
});

export default function RegisterPage() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      window.location.href = "/dashboard";
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      agree: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      // Register the user
      await AuthService.register({
        Username: values.username,
        Name: values.name,
        Password: values.password,
        Email: values.email,
      });

      // Log them in automatically
      const loginResponse = await AuthService.login({
        Username: values.username,
        Password: values.password,
      });

      if (
        loginResponse.validated &&
        loginResponse.token &&
        loginResponse.userid
      ) {
        login(loginResponse.token, loginResponse.userid);
        toast.success("Account created successfully");
        // Login function in auth context will handle redirection
      } else {
        throw new Error("Registration successful but login failed");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter your username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter your full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        type="password"
                        placeholder="Create a password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agree"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the{" "}
                        <Button
                          variant="link"
                          className="p-0 h-auto font-normal"
                          onClick={() => setTermsOpen(true)}
                          type="button"
                        >
                          Terms and Conditions
                        </Button>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>

      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Terms of Service and Privacy Policy</DialogTitle>
            <DialogDescription className="space-y-4">
              <p>By checking the box, you agree to the following:</p>
              <div className="space-y-4">
                <p>
                  1. Data Collection: We use federated learning to collect
                  anonymized, aggregated data insights from your usage to
                  improve our services.
                </p>
                <p>
                  2. Privacy: Your personal data remains on your device and is
                  not directly accessed by our servers.
                </p>
                <p>
                  3. Consent: Ticking the "I agree" checkbox indicates your
                  consent to these terms.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setTermsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
