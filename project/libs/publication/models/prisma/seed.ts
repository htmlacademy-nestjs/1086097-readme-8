import { PrismaClient } from '@prisma/client';

const FIRST_COMMENT_UUID = '39614113-7ad5-45b6-8093-06455437e1e2';
const SECOND_COMMENT_UUID = 'efd775e2-df55-4e0e-a308-58249f5ea202';

const PublicationUuid = {
  First: '39614113-7ad5-45b6-8093-06455437e1e2',
  Second: 'efd775e2-df55-4e0e-a308-58249f5ea202',
} as const;

const UserId = {
  First: '658170cbb954e9f5b905ccf4',
  Second: '6581762309c030b503e30512',
} as const;

const INIT_COUNT_VALUE = 0;


function getComments() {
  return [
    { id: FIRST_COMMENT_UUID, publicationId: PublicationUuid.First, userId: UserId.First, text: 'Ужааааас'},
    { id: SECOND_COMMENT_UUID, publicationId: PublicationUuid.Second, userId: UserId.Second, text: 'Какой кошмар' },
  ];
}

function getLikes() {
  return [
    { id: 'efd775e2-df55-4e0e-a308-58249f5ea203', publicationId: PublicationUuid.First, userId: UserId.First},
    { id: 'efd775e2-df55-4e0e-a308-58249f5ea204', publicationId: PublicationUuid.Second, userId: UserId.Second},
  ];
}

function getPublications() {
  return [
    {
      publicationId: PublicationUuid.First,
      userId: UserId.First,
      titleVideo: 'Ooops',
      video: 'https://youtu.be/n_Cu8z4re4U',
      isRepost: false,
      tags: ['sing', 'movie'],
      publicType: 'video',
      publicStatus: 'published',
      commentsCount: INIT_COUNT_VALUE,
      likesCount: INIT_COUNT_VALUE,

      titleText: undefined,
      announcement: undefined,
      text: undefined,
      quote: undefined,
      author: undefined,
      photo: undefined,
      link: undefined,
      descriptionLink: undefined,
      originalAuthorId: undefined,
      originalPublicationId: undefined
    },
    {
      publicationId: PublicationUuid.Second,
      userId: UserId.First,

      titleText: 'Ты где июль',
      announcement: 'Проносятся над степью стрижи, как трассы пуль',
      text: 'Ты где июль, ты где июль Какая даль, какая сказка, Не занесет февраль, не занесет февраль, Твой буйный зной и бешеные краски.',
      tags: ['julay'],
      isRepost: false,
      publicType: 'text',
      publicStatus: 'draft',
      commentsCount: INIT_COUNT_VALUE,
      likesCount: INIT_COUNT_VALUE,

      comments: [],
      likes: [{ userId: UserId.Second }],

      titleVideo: undefined,
      video: undefined,
      quote: undefined,
      author: undefined,
      photo: undefined,
      link: undefined,
      descriptionLink: undefined,
      originalAuthorId: undefined,
      originalPublicationId: undefined
    }
  ];
}

async function seedDb(prismaClient: PrismaClient) {

  // const mockLikes = getLikes();
  // for (const like of mockLikes) {
  //   await prismaClient.like.upsert({
  //     where: { id: like.id },
  //     update: {},
  //     create: {
  //       id: like.id,
  //       publicationId: like.publicationId,
  //       userId: like.userId,
  //     }
  //   });
  // }

  // const mockComments = getComments();
  // for (const comment of mockComments) {
  //   await prismaClient.comment.upsert({
  //     where: { id: comment.id },
  //     update: {},
  //     create: {
  //       id: comment.id,
  //       publicationId: comment.publicationId,
  //       userId: comment.userId,
  //       text: comment.text
  //     }
  //   });
  // }

  const mockPublications = getPublications();
  for (const publication of mockPublications) {
    await prismaClient.publication.upsert({
      where: { publicationId: publication.publicationId },
      update: {},
      create: {
        publicationId: publication.publicationId,
        userId: publication.userId,
        titleVideo: publication.titleVideo ? publication.titleVideo : '',
        video: publication.video ? publication.video : '',
        titleText: publication.titleText ? publication.titleText : '',
        announcement: publication.announcement ? publication.announcement : '',
        text: publication.text ? publication.text : '',
        quote: publication.quote ? publication.quote : '',
        author: publication.author ? publication.author : '',
        photo: publication.photo ? publication.photo : '',
        link: publication.link ? publication.link : '',
        descriptionLink: publication.descriptionLink ? publication.descriptionLink : '',

        tags: publication.tags ? publication.tags : undefined,
        publicType: publication.publicType,
        publicStatus: publication.publicStatus,
        isRepost: publication.isRepost,
        originalPublicationId: publication.originalPublicationId ? publication.originalPublicationId : '',
        originalAuthorId: publication.originalAuthorId ? publication.originalAuthorId : '',
        commentsCount: publication.commentsCount,
        likesCount: publication.likesCount,

        comments: publication.comments ? { create: publication.comments } : undefined,
        likes: publication.likes ? { create: publication.likes } : undefined,
      },
    });
  }

  console.info('Database was filledddd');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
