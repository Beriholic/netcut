import cron from "node-cron";
import { deleteExpiredClipborad } from "./repo";
import logger from "./logger";

function regDeleteExpiredClipboradJob() {
  const time = "0 0 * * *";

  logger.info(`Running delete expired clipboard job at ${time}`);
  cron.schedule(time, deleteExpiredClipborad);
  logger.info(`Delete expired clipboard job registered.`);
}

export async function startCron() {
  logger.info("Starting cron job...");
  regDeleteExpiredClipboradJob();
  logger.info("Cron job started.");
}
