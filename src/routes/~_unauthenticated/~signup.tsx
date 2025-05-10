import useUser from "@/hooks/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

const signUpFormSchema = z.object({
  name: z.string().nonempty({
    message: "Please enter your name",
  }),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(1, {
    message: "Please enter a password",
  }),
});

export type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;

export const Route = createFileRoute("/_unauthenticated/signup")({
  component: SignUpLayout,
});

function SignUpLayout() {
  const navigate = Route.useNavigate();

  const { useSignUp } = useUser();
  const { mutateAsync } = useSignUp();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const form = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormSchemaType) => {
    try {
      const res = await mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (res.data.status === "Success") {
        navigate({
          to: "/login",
        });
      }
      if (res.data.status === "Error") {
        setShowError(true);
      }
    } catch (e) {
      console.log(e);
      setShowError(true);
    } finally {
      form.reset();
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="flex h-full w-full flex-col items-center justify-center p-6 lg:w-1/2 lg:p-20">
        <div className="flex w-full max-w-lg flex-col gap-3">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-medium">"Sign Up"</span>
          </div>
        </div>
        <div className="mt-4 flex w-full max-w-lg flex-col">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              {/* name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="name"
                        placeholder="Enter your name"
                        className={cn(
                          "h-14 border border-transparent bg-slate-800 py-2.5 text-base text-white shadow-none placeholder:text-slate-500 hover:border-slate-600"
                        )}
                        {...field}
                      />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your Email"
                        className={cn(
                          "h-14 border border-transparent bg-slate-800 py-2.5 text-base text-white shadow-none placeholder:text-slate-500 hover:border-slate-600"
                        )}
                        {...field}
                      />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className={cn(
                            "h-14 border border-transparent bg-slate-800 py-2.5 text-base text-white shadow-none placeholder:text-slate-500 hover:border-slate-600"
                          )}
                          {...field}
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-100 underline hover:bg-transparent hover:text-blue-400"
                                onClick={() => {
                                  setShowPassword((prev) => !prev);
                                }}
                              >
                                {showPassword ? (
                                  <span>Hide</span>
                                ) : (
                                  <span>Show</span>
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {showPassword ? "Hide password" : "Show password"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {showError && (
                <span className="text-sm text-red-500">
                  something went wrong, please try again...!
                </span>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="mt-0 flex h-14 w-full items-center rounded-2xl border-none bg-primary hover:bg-primary-400"
                disabled={
                  form.watch("name") === "" ||
                  form.watch("email") === "" ||
                  form.watch("password") === ""
                }
              >
                <span className="text-base">Create</span>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
