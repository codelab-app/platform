import { Injectable } from '@nestjs/common'
import { Router } from 'express'

@Injectable()
export class RouterService {
  get expressRouter() {
    return Router()
  }
}
