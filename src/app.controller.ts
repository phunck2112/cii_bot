import { Body, Controller, Post, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('webhook/2121747561:AAGuyuDNbmXE_tIDL9Lmc1Xrn74WV0ZmHbE')
  async getError(@Req() req: any, @Res() res: any) {
    return await this.appService.getError(req, res);
  }

  @Get()
  async setWebhook() {
    return await this.appService.setWebhook();
  }

  @Post('sendBacklog')
  async sendMessage(@Body() data) {
    return await this.appService.sendMessage(data);
  }

  @Post('sendDeviceId')
  async sendDeviceId(@Body() data) {
    return await this.appService.sendDeviceId(data);
  }
}
