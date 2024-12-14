import { ClipBoard } from "@/api/model";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllClip() {
  const clips = prisma.clipboard.findMany();
  return clips;
}

export async function getClipByName({ name }: Readonly<{ name: string }>) {
  const clip = prisma.clipboard.findFirst({
    where: {
      name: name,
    },
  });
  return clip;
}

export async function saveClip({ clip }: Readonly<{ clip: ClipBoard }>) {
  await prisma.clipboard.create({
    data: {
      id: clip.id,
      name: clip.name,
      content: clip.content,
      expiredAt: clip.expiredAt,
      createdAt: clip.createdAt,
      updatedAt: clip.updatedAt,
    },
  });
}
