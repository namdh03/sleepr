import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto';

@Injectable()
export class NotificationsService {
  async notifyEmail(data: NotifyEmailDto) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log('Sending email to:', data.email);
  }
}
