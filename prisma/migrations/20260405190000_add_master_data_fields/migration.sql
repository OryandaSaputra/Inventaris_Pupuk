ALTER TABLE "Garden"
ADD COLUMN "code" TEXT,
ADD COLUMN "address" TEXT;

WITH ordered_gardens AS (
  SELECT "id", ROW_NUMBER() OVER (ORDER BY "createdAt", "name") AS row_num
  FROM "Garden"
)
UPDATE "Garden" AS g
SET "code" = CONCAT('KBN-', LPAD(ordered_gardens.row_num::text, 3, '0'))
FROM ordered_gardens
WHERE g."id" = ordered_gardens."id"
  AND g."code" IS NULL;

ALTER TABLE "Garden"
ALTER COLUMN "code" SET NOT NULL;

CREATE UNIQUE INDEX "Garden_code_key" ON "Garden"("code");

ALTER TABLE "Supplier"
ADD COLUMN "address" TEXT,
ADD COLUMN "email" TEXT;

CREATE UNIQUE INDEX "Supplier_email_key" ON "Supplier"("email");