"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBar() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [curDate, setCurDate] = useState(new Date());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  setTimeout(() => {
    setCurDate(new Date());
  }, 1000);

  return (
    <div className="bg-surface-variant flex items-center justify-between p-4 rounded-b-2xl">
      <div className="flex flex-row items-center space-x-2">
        <button
          className="text-xl"
          onClick={() => {
            router.push("/");
          }}
        >
          NetCut
        </button>
        <div className="text-sm">网络剪贴板</div>
      </div>
      <div className="invisible sm:visible">{curDate.toLocaleString()}</div>
    </div>
  );
}
