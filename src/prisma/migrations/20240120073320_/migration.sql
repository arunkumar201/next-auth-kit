-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isTwoFactorEnabled" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "forgotPasswordToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "forgotPasswordToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "twoFactorToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "twoFactorToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorConfirmation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TwoFactorConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "forgotPasswordToken_token_key" ON "forgotPasswordToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "forgotPasswordToken_token_email_key" ON "forgotPasswordToken"("token", "email");

-- CreateIndex
CREATE UNIQUE INDEX "twoFactorToken_token_key" ON "twoFactorToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "twoFactorToken_token_email_key" ON "twoFactorToken"("token", "email");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorConfirmation_userId_key" ON "TwoFactorConfirmation"("userId");

-- AddForeignKey
ALTER TABLE "TwoFactorConfirmation" ADD CONSTRAINT "TwoFactorConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
