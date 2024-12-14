import express from "express";
import bodyParser from "body-parser";
import next from "next";
import { getClipByName, saveClip } from "./repo";

const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const jsonParser = bodyParser.json();

app.prepare().then(() => {
  const server = express();

  server.post("/api/clip/get", async (req, res) => {
    const clipName = req.query.name;
    if (clipName === undefined || clipName === "") {
      return res
        .status(400)
        .json({ error: "Bad Request， no clip name provided" });
    }
    try {
      const clip = await getClipByName({ name: clipName });
      res.status(200).json(clip);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(error);
    }
  });

  server.post("/api/clip/save", jsonParser, async (req, res) => {
    const clip = req.body;
    if (clip === undefined) {
      return res.status(400).json({ error: "Bad Request， no clip provided" });
    }
    try {
      await saveClip({ clip: clip });
      return res.status(200).json({ message: "Clip saved successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(error);
    }
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  });
});
