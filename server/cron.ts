import cron from "node-cron";
import { deleteExpiredClipborad } from "./repo";

function regDeleteExpiredClipboradJob() {
  const time = "0 0 * * *";

  console.log("Running delete expired clipboard job...");
  cron.schedule(time, deleteExpiredClipborad);
  console.log("Delete expired clipboard job completed.");
}

export async function startCron() {
  console.log("Starting cron job...");
  regDeleteExpiredClipboradJob();
  console.log("Cron job started.");
}
