import { Subscriber } from '@project/core';
import { NewsletterDto } from '@project/email-subscriber';
import dayjs from 'dayjs';

export const getNewPublications = ({ publications, id }: NewsletterDto, { dateLastNotify }: Subscriber) => {
  const result = publications.filter(
    (publication) =>
      publication.userId !== id &&
      dayjs(publication.createAt).isAfter(dateLastNotify)
  );

  return result;
};
