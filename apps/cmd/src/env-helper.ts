import { CommandOption } from 'nestjs-console'
import { capitalize } from 'voca'
import { Env } from './environments/env'

export const envOptions = Object.values(Env).map((x) => x.toLowerCase())

export const envFlags = `--env <${envOptions.join('|')}>`

export const envOption: CommandOption = {
  flags: envFlags,
  required: true,
  fn: (value, previous) => {
    return getEnvironment(value)
  },
  description: "Choose which environment we're running this in",
}

export const getEnvironment = (env: string): Env => {
  if (!envOptions.includes(env)) {
    throw new Error(`${env} is not a valid Environment`)
  }

  return Env[capitalize(env) as keyof typeof Env]
}
