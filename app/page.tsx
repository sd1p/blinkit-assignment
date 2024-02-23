"use client";
import Gallary from "@/components/Gallary";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: userSession } = useSession();

  useEffect(() => {
    if (!userSession?.user) {
      router.push("/login");
    } else {
      router.push("/");
    }
  }, [router, userSession]);

  return (
    <>
      {!userSession?.user ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <Gallary />
        </>
      )}
    </>
  );
}
