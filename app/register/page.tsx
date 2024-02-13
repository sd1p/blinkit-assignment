"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      await axios.post("/api/auth/register", {
        email,
        password,
        username,
      });

      toast.success("Account created");

      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(true);
    }
  }, [email, password, username, router]);

  return (
    <div className="flex  content-center items-center justify-center h-screen">
      <div className="flex flex-col gap-2 w-1/4  items-center border-slate-600 border-[1px] p-4 rounded-md">
        <div className="pb-4">
          <h2>Create an account</h2>
        </div>
        <Input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
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
        <Button size="form" disabled={loading} onClick={handleSubmit}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}
