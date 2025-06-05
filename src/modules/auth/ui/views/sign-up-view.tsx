"use client"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useForm } from "react-hook-form"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { signUpSchema } from "../../validation/sign-up-validation"
import { authClient } from "@/lib/auth-client"
import { OctagonAlertIcon } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"

const SignUpView = () => {
  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = (data: z.infer<typeof signUpSchema>) => {
    try {
      setError(null)
      setIsLoading(true)
      authClient?.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            router.push("/")
          },
          onError: ({ error }) => {
            setError(error?.message || "An error occurred")
          },
        }
      )
    } catch {
      setError("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-pink-50 dark:from-black dark:to-zinc-900 p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="flex flex-col items-center gap-2 pb-2">
          <img src="/logo.svg" alt="Logo" className="h-12 w-auto mb-2" />
          <CardTitle className="text-2xl font-bold text-center">
            Sign up to Coach.ai
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...signUpForm}>
            <form
              onSubmit={signUpForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={signUpForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        autoComplete="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="email"
                /*  rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                }} */
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="password"
                /*  rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }} */
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signUpForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!!error && (
                <Alert variant="destructive">
                  <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-600"
              >
                Sign Up
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full">
                  {/*   <GithubIcon className="h-4 w-4" /> */}
                  <span>Github</span>
                </Button>
                <Button variant="outline" className="w-full">
                  {/* <GoogleIcon className="h-4 w-4" /> */}
                  <span>Google</span>
                </Button>
              </div>
            </form>
          </Form>
          <div className="text-center text-sm text-muted-foreground pt-4">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-in" className="text-primary hover:underline">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUpView
