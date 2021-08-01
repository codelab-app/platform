import { Controller, Get } from '@nestjs/common'

@Controller('atom')
export class AtomController {
  @Get()
  export() {
    return ''
  }
}
