#!/usr/bin/env node

const shell = require('shelljs')
const portfinder = require('portfinder')
const concurrently = require('concurrently')
const path = require('path')

const isPortOpen = async (port) => {
  const nextAvailablePort = await portfinder.getPortPromise({ port })

  return nextAvailablePort === port
}

const start = async () => {
  let commands = [
    {
      command:
        'npx wait-on http://127.0.0.1:3000 http://127.0.0.1:3333 && npx nx e2e:ci web-e2e',
      name: 'E2E',
    },
  ]

  if (await isPortOpen(3000)) {
    commands = [
      ...commands,
      {
        command: 'npx nx serve web',
        name: 'Web',
      },
    ]
  }

  if (await isPortOpen(3333)) {
    commands = [
      ...commands,
      {
        command: 'npx nx serve api',
        name: 'API',
      },
    ]
  }

  return await concurrently(commands, {
    killOthers: ['success', 'failure'],
    success: 'first',
  }).then(
    (success) => {
      console.log(success)
    },
    (err) => {
      console.log(err)
    },
  )
}

start()
