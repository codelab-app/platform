import { Body, Controller, Post } from '@nestjs/common'

@Controller('field')
export class FieldApplicationController {
  @Post('create-field')
  async createField(@Body() createFieldDto: ICreateFieldData) {}
}
