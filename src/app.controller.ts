import { Body, Controller, Post, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Post('webhook/1936565766:AAHaKM-6fPRilJNdbguoBqmUnt_m_zrFlhw')
  // async getError(@Req() req: any, @Res() res: any) {
  //   return await this.appService.getError(req, res);
  // }

  @Get()
  async setWebhook() {
    return await this.appService.setWebhook();
  }

  @Post('sendBacklog')
  async sendMessage(@Body() data) {
    return await this.appService.sendMessage(data);
  }
}
