-- CreateTable
CREATE TABLE "Carro" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "equipeId" TEXT NOT NULL,

    CONSTRAINT "Carro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Corrida" (
    "id" TEXT NOT NULL,
    "nome_grand_prix" TEXT NOT NULL,

    CONSTRAINT "Corrida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipe" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Equipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inscricao" (
    "id" TEXT NOT NULL,
    "num_inscricao" INTEGER NOT NULL,
    "desc_inscricao" TEXT NOT NULL,
    "pilotoId" TEXT NOT NULL,
    "carroId" TEXT NOT NULL,
    "corridaId" TEXT NOT NULL,

    CONSTRAINT "Inscricao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pessoa" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Piloto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "equipeId" TEXT NOT NULL,

    CONSTRAINT "Piloto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pista" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "corridaId" TEXT NOT NULL,

    CONSTRAINT "Pista_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Carro" ADD CONSTRAINT "Carro_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "Equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscricao" ADD CONSTRAINT "Inscricao_pilotoId_fkey" FOREIGN KEY ("pilotoId") REFERENCES "Piloto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscricao" ADD CONSTRAINT "Inscricao_carroId_fkey" FOREIGN KEY ("carroId") REFERENCES "Carro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscricao" ADD CONSTRAINT "Inscricao_corridaId_fkey" FOREIGN KEY ("corridaId") REFERENCES "Corrida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Piloto" ADD CONSTRAINT "Piloto_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "Equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pista" ADD CONSTRAINT "Pista_corridaId_fkey" FOREIGN KEY ("corridaId") REFERENCES "Corrida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
