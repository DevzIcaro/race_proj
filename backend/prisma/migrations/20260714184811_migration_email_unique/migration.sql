/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Pessoa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_email_key" ON "Pessoa"("email");
