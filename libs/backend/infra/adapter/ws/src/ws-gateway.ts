import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { IJobOutput } from '@codelab/shared-abstract-infra'
import { Injectable } from '@nestjs/common'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@Injectable()
@WebSocketGateway({
  // Enable CORS for browser clients
  cors: true,
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly logger: PinoLoggerService) {}

  // Method to emit job completion event
  emitJobComplete(output: IJobOutput) {
    this.logger.debug(`Emitting job:complete for job ${output.jobId}`)
    this.server.emit('job:complete', output)
  }

  handleConnection(client: Socket) {
    this.logger.debug(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`Client disconnected: ${client.id}`)
  }

  @WebSocketServer()
  private server!: Server
}
