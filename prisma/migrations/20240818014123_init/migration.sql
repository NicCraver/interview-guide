-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "completedQuestions" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastQuizCompletedAt" TIMESTAMP(3),
ADD COLUMN     "lastQuizScore" INTEGER,
ADD COLUMN     "totalQuizzesTaken" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalScore" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "UserQuestionState" ADD COLUMN     "errorCollectionId" INTEGER,
ADD COLUMN     "lastAttemptAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnQuestions" (
    "tagId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "TagsOnQuestions_pkey" PRIMARY KEY ("tagId","questionId")
);

-- CreateTable
CREATE TABLE "ErrorCollection" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ErrorCollection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "Question_categoryId_questionTypeId_idx" ON "Question"("categoryId", "questionTypeId");

-- CreateIndex
CREATE INDEX "UserQuestionState_userId_status_idx" ON "UserQuestionState"("userId", "status");

-- AddForeignKey
ALTER TABLE "UserQuestionState" ADD CONSTRAINT "UserQuestionState_errorCollectionId_fkey" FOREIGN KEY ("errorCollectionId") REFERENCES "ErrorCollection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnQuestions" ADD CONSTRAINT "TagsOnQuestions_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnQuestions" ADD CONSTRAINT "TagsOnQuestions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ErrorCollection" ADD CONSTRAINT "ErrorCollection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
