-- CreateEnum
CREATE TYPE "login_type" AS ENUM ('facebook', 'google', 'others');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "email_address" VARCHAR(50) NOT NULL,
    "mobile_number" INTEGER NOT NULL,
    "password" VARCHAR,
    "is_first_time" BOOLEAN NOT NULL DEFAULT true,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "website" VARCHAR NOT NULL,
    "mobile_number" INTEGER NOT NULL,
    "coords" JSONB NOT NULL,
    "email_address" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "product_name" VARCHAR NOT NULL,
    "brand_name" VARCHAR NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "shop_id" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_uuid_key" ON "user"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_address_key" ON "user"("email_address");

-- CreateIndex
CREATE UNIQUE INDEX "shop_id_key" ON "shop"("id");

-- CreateIndex
CREATE UNIQUE INDEX "shop_uuid_key" ON "shop"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "shop_name_key" ON "shop"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_uuid_key" ON "Product"("uuid");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
