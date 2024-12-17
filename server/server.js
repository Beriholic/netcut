import express from "express";
import bodyParser from "body-parser";
import next from "next";
import { getOrNewClipboard, updateClipboard } from "./repo";
import { startCron } from "./cron";
import logger from "./logger";

const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const jsonParser = bodyParser.json();

app.prepare().then(() => {
  const server = express();

  server.post("/api/clip/get", jsonParser, async (req, res) => {
    const { name } = req.body;

    if (name === undefined || name.length === 0) {
      return res
        .status(400)
        .json({ error: "Bad Request， no clip name provided" });
    }
    try {
      const clip = await getOrNewClipboard(name);
      res.status(200).json(clip);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(error);
    }
  });

  server.post("/api/clip/update", jsonParser, async (req, res) => {
    const clip = req.body;
    if (clip === undefined) {
      return res.status(400).json({ error: "Bad Request， no clip provided" });
    }
    try {
      const clipName = await updateClipboard(clip);
      return res
        .status(200)
        .json({ message: `Clip ${clipName} saved successfully` });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(error);
    }
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    logger.info(`Ready on http://localhost:${port}`);
    startCron();
  });
});
