-- CreateEnum
CREATE TYPE "LIST_NAME" AS ENUM ('TODO', 'DOING', 'DONE');

-- CreateTable
CREATE TABLE "AdaCard" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "lista" "LIST_NAME" NOT NULL DEFAULT 'TODO',

    CONSTRAINT "AdaCard_pkey" PRIMARY KEY ("id")
);
