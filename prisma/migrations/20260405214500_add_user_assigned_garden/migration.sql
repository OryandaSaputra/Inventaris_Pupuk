ALTER TABLE "User"
ADD COLUMN "assignedGardenId" TEXT;

CREATE INDEX "User_assignedGardenId_idx" ON "User"("assignedGardenId");

ALTER TABLE "User"
ADD CONSTRAINT "User_assignedGardenId_fkey"
FOREIGN KEY ("assignedGardenId")
REFERENCES "Garden"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;