import { Injectable, Logger } from '@nestjs/common'
import portfinder from 'portfinder'
import shell from 'shelljs'

@Injectable()
export class ApiServerService {
  private START_SERVER_COMMAND = 'node dist/apps/api/main.js'

  async isPortOpen(port: number | undefined) {
    const nextAvailablePort = await portfinder.getPortPromise({ port })

    return nextAvailablePort === port
  }

  async startApiServer() {
    return shell.exec(this.START_SERVER_COMMAND, {
      async: true,
      cwd: process.cwd(),
    })
  }
}
