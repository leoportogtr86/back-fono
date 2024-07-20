-- CreateTable
CREATE TABLE "Fonoaudiologo" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(100) NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fonoaudiologo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crianca" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "responsavel_nome" VARCHAR(100) NOT NULL,
    "responsavel_contato" VARCHAR(100) NOT NULL,
    "fonoaudiologo_responsavelId" INTEGER NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Crianca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "id" SERIAL NOT NULL,
    "criancaId" INTEGER NOT NULL,
    "fonoaudiologoId" INTEGER NOT NULL,
    "data_avaliacao" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "resultado" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intervencao" (
    "id" SERIAL NOT NULL,
    "criancaId" INTEGER NOT NULL,
    "fonoaudiologoId" INTEGER NOT NULL,
    "data_intervencao" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "resultados_obtidos" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Intervencao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fonoaudiologo_email_key" ON "Fonoaudiologo"("email");

-- AddForeignKey
ALTER TABLE "Crianca" ADD CONSTRAINT "Crianca_fonoaudiologo_responsavelId_fkey" FOREIGN KEY ("fonoaudiologo_responsavelId") REFERENCES "Fonoaudiologo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_criancaId_fkey" FOREIGN KEY ("criancaId") REFERENCES "Crianca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_fonoaudiologoId_fkey" FOREIGN KEY ("fonoaudiologoId") REFERENCES "Fonoaudiologo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intervencao" ADD CONSTRAINT "Intervencao_criancaId_fkey" FOREIGN KEY ("criancaId") REFERENCES "Crianca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intervencao" ADD CONSTRAINT "Intervencao_fonoaudiologoId_fkey" FOREIGN KEY ("fonoaudiologoId") REFERENCES "Fonoaudiologo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
