#!/usr/bin/env ts-node

import { spawn } from 'child_process'
import { isPortOpen } from './port'

export const startWebServer = async () => {
  // Start server if port is open
  if (await isPortOpen(3000)) {
    const server = spawn('nx', ['serve', 'web'], {
      cwd: process.cwd(),
      stdio: 'inherit',
    })

    return server
  }

  return
}

export const startApiServer = async () => {
  // Start server if port is open
  if (await isPortOpen(3333)) {
    const server = spawn('nx', ['serve', 'api'], {
      cwd: process.cwd(),
      stdio: 'inherit',
    })

    // server.on('close', (code) => {
    //   console.log(`child process exited with code ${code}`)
    // })

    return server
  }

  return
}
