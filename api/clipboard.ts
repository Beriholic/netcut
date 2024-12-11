import { ClipBoard } from "./model";

export function loadOrNewClipboard(name: string): ClipBoard {
  const expiredTime = 1000 * 60 * 60 * 24 * 7; // 7 days

  return {
    id: 114514,
    name: name,
    content: "Nothing",
    expiredAt: new Date(Date.now() + expiredTime),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
