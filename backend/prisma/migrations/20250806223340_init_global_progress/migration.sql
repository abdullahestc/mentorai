-- CreateTable
CREATE TABLE "public"."GlobalProgress" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "checkedStates" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "GlobalProgress_pkey" PRIMARY KEY ("id")
);
