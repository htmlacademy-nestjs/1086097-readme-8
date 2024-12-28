-- CreateEnum
CREATE TYPE "PublicationStatus" AS ENUM ('Published', 'Draft');

-- CreateEnum
CREATE TYPE "PublicationType" AS ENUM ('Video', 'Text', 'Quote', 'Photo', 'Link');

-- CreateTable
CREATE TABLE "publications" (
    "publication_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title_video" TEXT,
    "video" TEXT,
    "titleText" TEXT,
    "announcement" TEXT,
    "text" TEXT,
    "quote" TEXT,
    "author" TEXT,
    "photo" TEXT,
    "link" TEXT,
    "description_link" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publicType" "PublicationType" NOT NULL,
    "publicStatus" "PublicationStatus" NOT NULL,
    "is_repost" BOOLEAN NOT NULL DEFAULT false,
    "originalAuthorId" TEXT,
    "originalPublicationId" TEXT,
    "comments_count" INTEGER NOT NULL,
    "likes_count" INTEGER NOT NULL,

    CONSTRAINT "publications_pkey" PRIMARY KEY ("publication_id")
);

-- CreateTable
CREATE TABLE "comments" (
    "comment_id" TEXT NOT NULL,
    "publication_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "likes" (
    "like_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "publication_id" TEXT NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("like_id")
);

-- CreateIndex
CREATE INDEX "publications_titleText_idx" ON "publications"("titleText");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("publication_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("publication_id") ON DELETE CASCADE ON UPDATE CASCADE;
