import { Injectable } from '@nestjs/common'
import cors from 'cors'
import { Router } from 'express'

const router = Router()

router.use(cors({ origin: '*' }))

@Injectable()
export class RouterService {
  get expressRouter() {
    return router
  }
}
