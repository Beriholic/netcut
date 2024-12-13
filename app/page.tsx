"use client";

import { getRandomString } from "@/utils/util";
import { Button, TextField } from "actify";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [clipName, setClipName] = useState("");

  const enterClipBoard = () => {
    if (clipName === "") {
      const radomName = getRandomString(8);
      router.push(`/${radomName}`);
      return;
    }

    router.push(`/${clipName}`);
  };

  return (
    <div className="flex justify-center items-center space-x-4  h-[calc(100vh-50%)] ">
      <TextField
        variant="outlined"
        label="剪贴板名称"
        inputMode="text"
        onInput={(e) => {
          setClipName(e.currentTarget.value);
        }}
      />
      <Button variant="tonal" onPress={enterClipBoard}>
        查看剪贴板
      </Button>
    </div>
  );
}
