import { ClipBoard } from "@/app/api/model";
import { PrismaClient } from "@prisma/client";
import logger from "./logger";

const prisma = new PrismaClient();

async function newBlankClipboard(name: string) {
  const expiredTime = 1000 * 60 * 60 * 24 * 3; // 3 days

  try {
    const clip = prisma.clipboard.create({
      data: {
        name: name,
        content: "",
        createdAt: new Date(),
        expiredAt: new Date(Date.now() + expiredTime),
        updatedAt: new Date(),
      },
    });
    return clip;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.code === "P2002") {
      logger.warn("Duplicate clipboard creation ignored.");
      return null;
    }
    throw err;
  }
}

async function getClipByName(name: string) {
  return prisma.clipboard.findFirst({
    where: {
      name: name,
    },
    select: {
      name: true,
      content: true,
      expiredAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getOrNewClipboard(name: string) {
  let clip = await getClipByName(name);
  if (clip === null) {
    clip = await newBlankClipboard(name);
  }
  return clip;
}

export async function updateClipboard(clip: ClipBoard) {
  const res = await prisma.clipboard
    .update({
      where: {
        name: clip.name,
      },
      data: {
        content: clip.content,
      },
    })
    .catch((err) => {
      logger.error("Update clipboard failed: " + err);
      throw err;
    });
  return res.content;
}

export async function deleteExpiredClipborad() {
  const res = await prisma.clipboard.deleteMany({
    where: {
      expiredAt: {
        lt: new Date(),
      },
    },
  });
  logger.info(`Expired clipboard deleted. Count: ${res.count}`);
}
