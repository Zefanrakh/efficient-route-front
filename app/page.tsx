"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  /* ----------------------------- HOOK -------------------------------- */

  const router = useRouter();
  useEffect(() => {
    router.replace("/routes");
  }, [router]);

  /* ----------------------------- RENDER -------------------------------- */

  return <></>;
}
