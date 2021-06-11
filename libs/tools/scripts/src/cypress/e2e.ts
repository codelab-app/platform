#!/usr/bin/env ts-node

import { ChildProcess } from 'child_process'
import shell from 'shelljs'
import { isPortOpen } from '../server/port'
import { startApiServer, startWebServer } from '../server/servers'

const start = async () => {
  let webServer: ChildProcess | undefined
  let apiServer: ChildProcess | undefined

  const closeServers = () => {
    webServer?.send('SIGINT')
    apiServer?.send('SIGINT')
  }

  if (await isPortOpen(3000)) {
    webServer = await startWebServer()
  }

  if (await isPortOpen(3333)) {
    apiServer = await startApiServer()
  }

  // Forward sigint
  process.on('SIGINT', () => {
    closeServers()
  })

  const e2e = shell.exec(
    'wait-on http://localhost:3000 http://localhost:3333 && nx e2e:ci web-e2e',
  )

  closeServers()

  if (e2e.code !== 0) {
    shell.exit(1)
  }

  shell.exit(0)
}

start()
