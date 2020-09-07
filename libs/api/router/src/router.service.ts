import { Injectable } from '@nestjs/common'
import { Router } from 'express'

const router = Router()

@Injectable()
export class RouterService {
  get expressRouter() {
    return router
  }
}
