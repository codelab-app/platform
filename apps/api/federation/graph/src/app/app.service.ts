import { Injectable } from '@nestjs/common'

interface PropsService {
  create: Function
}
@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to graph!' }
  }
}
