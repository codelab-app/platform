import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'

@Injectable()
export abstract class QueueService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}
}
