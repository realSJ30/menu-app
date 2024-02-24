import { ShoppingBasket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createUserWithEmailPassword } from "@/firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z.string().email().min(5).max(50),
  password: z.string().min(3).max(50),
});

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (!loading) {
      setLoading(true);
      const user = await createUserWithEmailPassword(values);
      if (!user) {
        form.setError("email", { message: "Email already exist!" });
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <Container>
          <div className="flex flex-col w-[450px] justify-center items-center gap-y-4 border rounded-xl shadow-lg p-8">
            <ShoppingBasket size={32} />
            <h1 className="font-bold text-xl">Register to MyMenu</h1>
            <hr />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="email@sample.io"
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
                          disabled={loading}
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={loading} className="w-full">
                  Create Account
                </Button>
                <Separator />
                <p>Have an account?</p>
                <Button
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/")}
                >
                  Sign in
                </Button>
              </form>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Register;
