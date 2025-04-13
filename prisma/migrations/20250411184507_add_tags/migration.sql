-- AlterTable
ALTER TABLE "products" ADD COLUMN     "tags" TEXT[];

-- CreateIndex
CREATE INDEX "products_tags_idx" ON "products" USING GIN ("tags");
