import { Injectable } from '@nestjs/common';
import axios from 'axios';
import Modals from './modals';

const API =
  'https://api.telegram.org/bot2121747561:AAGuyuDNbmXE_tIDL9Lmc1Xrn74WV0ZmHbE';
const URI = '/webhook/2121747561:AAGuyuDNbmXE_tIDL9Lmc1Xrn74WV0ZmHbE';
const WEBHOOK_URL = `https://cii.ninextech.com${URI}`;

@Injectable()
export class AppService {
  async getError(req: any, res: any) {
    // console.log('Body', req.body);
    const chatId = req.body.message.chat.id;
    const chatMessage = req.body.message.text || 'No message';
    let messageToSend;

    if (chatMessage.search('CIIUN-') >= 0) {
      const deviceId = chatMessage.replace('CIIUN-', '');
      const dataIndex = Modals.userData.findIndex(
        (el) => el.deviceId == deviceId,
      );

      if (dataIndex >= 0) {
        Modals.userData.splice(dataIndex, 1);
      }

      Modals.userData.push({ chatId, deviceId });
      messageToSend = `Ok nha! Đã ghi nhận dãy số: ${deviceId}`;
    } else {
      messageToSend =
        'Sai cú pháp rồi ku. Nhập lại như này này:\nVí dụ: CIIUN-XXX\nTrong đó, XXX là dãy số được gửi từ Phú đĩ 😎.';
    }

    await axios
      .post(`${API}/sendMessage`, {
        chat_id: chatId,
        text: messageToSend,
      })
      // .then((result) => console.log(result.data))
      .catch((error) => console.log('Send message Error: ', error));
    return res.send();
  }

  async setWebhook() {
    const setWebhook = await axios
      .get(`${API}/setWebhook?url=${WEBHOOK_URL}`)
      .then((result) => JSON.stringify(result.data))
      .catch((error) => console.error(error));

    console.log(setWebhook);
  }

  async sendMessage(message) {
    const userData = Modals.userData.find(
      (el) => el.deviceId == message.deviceId,
    );
    const chatId = userData ? userData.chatId : null;
    if (chatId) {
      await axios
        .post(`${API}/sendMessage`, {
          chat_id: chatId,
          text: message,
        })
        // .then((result) => console.log(message))
        .catch((error) => console.log('Send message Error: ', error));
    }
  }

  async sendDeviceId(message) {
    await axios
      .post(`${API}/sendMessage`, {
        chat_id: 1175265598,
        text: message.data,
      })
      // .then((result) => console.log(message))
      .catch((error) => console.log('Send message Error: ', error));
  }
}
