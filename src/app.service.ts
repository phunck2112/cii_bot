import { Injectable } from '@nestjs/common';
import axios from 'axios';

const API =
  'https://api.telegram.org/bot1936565766:AAHaKM-6fPRilJNdbguoBqmUnt_m_zrFlhw';
const URI = '/webhook/1936565766:AAHaKM-6fPRilJNdbguoBqmUnt_m_zrFlhw';
const WEBHOOK_URL = `https://7357d69e3757.ngrok.io${URI}`;

@Injectable()
export class AppService {
  // async getError(req: any, res: any) {
  //   console.log('Body', req.body);
  //   const chatId = -425012585;
  //   const chatMessage = req.body.message.text || 'No message';
  //   await axios
  //     .post(`${API}/sendMessage`, {
  //       chat_id: chatId,
  //       text: chatMessage,
  //     })
  //     .then((result) => console.log(result.data))
  //     .catch((error) => console.log('Send message Error: ', error));

  //   return res.send();
  // }

  async setWebhook() {
    const setWebhook = await axios
      .get(`${API}/setWebhook?url=${WEBHOOK_URL}`)
      .then((result) => JSON.stringify(result.data))
      .catch((error) => console.error(error));

    console.log(setWebhook);
  }

  async sendMessage(message) {
    await axios
      .post(`${API}/sendMessage`, {
        chat_id: -425012585,
        text: message,
      })
      .then((result) => console.log(message.deviceName))
      .catch((error) => console.log('Send message Error: ', error));
  }
}
