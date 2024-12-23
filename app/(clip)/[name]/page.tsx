"use client";
import { clipboardApi } from "@/app/api/clipboard";
import { ClipBoard } from "@/app/api/model";
import { Button, SnackbarProvider } from "actify";
import { useEffect, useState } from "react";

export default function ClipboardDetail({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const [name, setName] = useState<string>();
  const [clipboard, setClipBoard] = useState<ClipBoard | null>(null);
  const [clipContent, setClipContent] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      const name = (await params).name;
      setName(name);
    };

    fetchName();
  }, [params]);

  useEffect(() => {
    if (!name) return;

    const fetchClipboard = async () => {
      try {
        const clip = await clipboardApi.loadClipboard(name);
        setClipBoard(clip);
        setClipContent(clip.content);
      } catch (err) {
        alert("load clipboard failed");
        console.log(err);
      }
    };

    fetchClipboard();
  }, [name]);

  const updateClipboard = async () => {
    if (clipboard === null) {
      return;
    }
    const res = await clipboardApi.updateClipboard({
      ...clipboard,
      content: clipContent,
    });
    if (res) {
      alert("保存成功");
      setClipBoard({
        ...clipboard,
        content: clipContent,
      });
    }
  };

  return (
    <div className="flex flex-row justify-center h-[calc(100vh-10%)] space-x-4">
      <textarea
        className="mt-2 w-full max-w-4xl p-4 outline-none text-base text-on-surface border-2 border-on-surface resize-none bg-surface rounded-2xl"
        placeholder="在此输入..."
        rows={20}
        value={clipContent}
        onChange={(e) => {
          setClipContent(e.target.value);
        }}
      />
      <div className="mt-2 flex flex-col w-36">
        <SnackbarProvider>
          {(state) => (
            <>
              <Button
                variant="tonal"
                className="mb-2"
                onPress={updateClipboard}
              >
                保存
              </Button>
              <Button
                variant="tonal"
                onPress={() => {
                  navigator.clipboard.writeText(clipContent);
                  state.add("复制成功");
                }}
              >
                复制
              </Button>
            </>
          )}
        </SnackbarProvider>
        <div className="text-xs border-2 border-on-surface rounded-lg p-2 my-4 space-y-4">
          <div>
            <div>创建时间：</div>
            <div className="text-primary">
              {clipboard?.createdAt.toLocaleString()}
            </div>
          </div>
          <div>
            <div>修改时间：</div>
            <div className="text-primary">
              {clipboard?.updatedAt.toLocaleString()}
            </div>
          </div>
          <div>
            <div>过期时间：</div>
            <div className="text-primary">
              {clipboard?.expiredAt.toLocaleString()}
            </div>
          </div>
        </div>
        <SnackbarProvider>
          {(state) => (
            <Button
              onPress={() => {
                const url = window.location.href;
                navigator.clipboard.writeText(url);
                state.add("已复制");
              }}
            >
              分享
            </Button>
          )}
        </SnackbarProvider>
      </div>
    </div>
  );
}
