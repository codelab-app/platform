import { Body, Controller, Get, Post } from '@nestjs/common'

@Controller()
export class AppController {
  /**
   * Used by wait-on to check server status in cli
   */
  @Get()
  getData() {
    return 'Heath check successful'
  }

  @Post() index(@Body() body: any) {
    console.log(body)
  }
}
