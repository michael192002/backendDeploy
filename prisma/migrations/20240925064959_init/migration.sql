-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "cafeId" TEXT,
    "start" TIMESTAMP(3),

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cafe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT,
    "location" TEXT NOT NULL,

    CONSTRAINT "Cafe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_address_key" ON "Employee"("email_address");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_phone_number_key" ON "Employee"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Cafe_name_key" ON "Cafe"("name");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
