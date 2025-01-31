import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { MailService } from './mail.service';
import { getMailerAsyncOptions } from '@project/helpers';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions('appnotify.mail'))
  ],
  providers: [
    MailService
  ],
  exports: [
    MailService
  ]
})
export class MailModule {}
