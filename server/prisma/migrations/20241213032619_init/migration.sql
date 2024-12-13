-- CreateTable
CREATE TABLE "clipboard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "expiredAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "clipboard_name_key" ON "clipboard"("name");
