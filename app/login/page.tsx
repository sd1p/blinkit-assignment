"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      const status = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!status?.ok) {
        toast.error("Invalid Credentials");
      } else {
        toast.success("Welcome Back!");
        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [email, password, router]);

  return (
    <div className="flex flex-col content-center items-center justify-center h-screen">
      <div className="flex flex-col gap-2 w-1/4  items-center border-slate-600 border-[1px] p-4 rounded-md">
        <div className="pb-4">
          <h2>Login</h2>
        </div>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disabled={loading} size="form" onClick={handleSubmit}>
          Sign In
        </Button>
      </div>

      <div className="py-2">
        <p className="text-slate-400 font-light text-sm">
          Don't have an account?{" "}
          <Link className="text-blue-600" href={"/register"}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
