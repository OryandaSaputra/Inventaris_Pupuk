-- CreateIndex
CREATE INDEX "DeliveryReceipt_createdById_idx" ON "DeliveryReceipt"("createdById");

-- CreateIndex
CREATE INDEX "DeliveryReceipt_supplyOrderId_receivedDate_idx" ON "DeliveryReceipt"("supplyOrderId", "receivedDate");

-- CreateIndex
CREATE INDEX "SupplyOrder_createdAt_idx" ON "SupplyOrder"("createdAt");

-- CreateIndex
CREATE INDEX "SupplyOrder_contractEndDate_idx" ON "SupplyOrder"("contractEndDate");

-- CreateIndex
CREATE INDEX "SupplyOrder_gardenId_contractEndDate_idx" ON "SupplyOrder"("gardenId", "contractEndDate");
