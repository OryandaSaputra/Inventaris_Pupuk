-- CreateEnum
CREATE TYPE "SupplyBudgetType" AS ENUM ('EKSPLOITASI', 'INVESTASI');

-- Step 1: add new columns as nullable / with temporary flexibility
ALTER TABLE "SupplyOrder"
ADD COLUMN "budgetType" "SupplyBudgetType",
ADD COLUMN "contractStartDate" TIMESTAMP(3),
ADD COLUMN "freightCost" DECIMAL(18,2),
ADD COLUMN "grandTotal" DECIMAL(18,2),
ADD COLUMN "ppnAmount" DECIMAL(18,2),
ADD COLUMN "totalCost" DECIMAL(18,2),
ADD COLUMN "unitPrice" DECIMAL(18,2);

-- Step 2: backfill old rows
UPDATE "SupplyOrder"
SET
  "contractStartDate" = "sp2bjDate",
  "budgetType" = 'EKSPLOITASI',
  "unitPrice" = 0,
  "freightCost" = 0,
  "totalCost" = 0,
  "ppnAmount" = 0,
  "grandTotal" = 0
WHERE
  "contractStartDate" IS NULL
  OR "budgetType" IS NULL
  OR "unitPrice" IS NULL
  OR "freightCost" IS NULL
  OR "totalCost" IS NULL
  OR "ppnAmount" IS NULL
  OR "grandTotal" IS NULL;

-- Step 3: make columns required
ALTER TABLE "SupplyOrder"
ALTER COLUMN "budgetType" SET NOT NULL,
ALTER COLUMN "contractStartDate" SET NOT NULL,
ALTER COLUMN "freightCost" SET NOT NULL,
ALTER COLUMN "grandTotal" SET NOT NULL,
ALTER COLUMN "ppnAmount" SET NOT NULL,
ALTER COLUMN "totalCost" SET NOT NULL,
ALTER COLUMN "unitPrice" SET NOT NULL;

-- Step 4: drop old column that has been replaced
ALTER TABLE "SupplyOrder"
DROP COLUMN "sp2bjDate";