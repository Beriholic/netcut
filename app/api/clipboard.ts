import { ClipBoard } from "./model";

const baseUrl = "http://localhost:3000";

interface ClipBoardApi {
  loadClipboard(name: string): Promise<ClipBoard>;
  updateClipboard(clip: ClipBoard): Promise<boolean>;
}

async function loadClipboard(name: string) {
  return await fetch(`${baseUrl}/api/clip/get`, {
    method: "POST",
    body: JSON.stringify({
      name: name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch clipboard");
      }
      console.log(res);
      return res.json();
    })
    .then((data) => {
      return data as ClipBoard;
    })
    .catch((err) => {
      console.error("get clipboard by name failed", err);
      throw err;
    });
}

async function updateClipboard(clip: ClipBoard) {
  return await fetch(`${baseUrl}/api/clip/update`, {
    method: "POST",
    body: JSON.stringify(clip),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update clipboard");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return true;
    })
    .catch((err) => {
      console.error("get clipboard by name failed", err);
      throw err;
    });
}
export const clipboardApi: ClipBoardApi = {
  loadClipboard,
  updateClipboard,
};
