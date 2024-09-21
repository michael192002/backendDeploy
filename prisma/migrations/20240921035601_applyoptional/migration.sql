-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "cafeId" TEXT,
    CONSTRAINT "Employee_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("cafeId", "email_address", "gender", "id", "name", "phone_number") SELECT "cafeId", "email_address", "gender", "id", "name", "phone_number" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_email_address_key" ON "Employee"("email_address");
CREATE UNIQUE INDEX "Employee_phone_number_key" ON "Employee"("phone_number");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
