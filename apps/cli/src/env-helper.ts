import { Environment } from '@codelab/backend'
import { CommandOption } from 'nestjs-console'
import { capitalize } from 'voca'

export const envOptions = Object.values(Environment).map((x) => x.toLowerCase())

export const envFlags = `--env <${envOptions.join('|')}>`

export const envOption: CommandOption = {
  flags: envFlags,
  required: true,
  fn: (value, previous) => {
    return getEnvironment(value)
  },
  description: "Choose which environment we're running this in",
}

export const getEnvironment = (env: string): Environment => {
  if (!envOptions.includes(env)) {
    throw new Error(`${env} is not a valid Environment`)
  }

  return Environment[capitalize(env) as keyof typeof Environment]
}
