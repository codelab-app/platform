import { config } from 'dotenv'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { Env } from './env'

const argv = yargs(hideBin(process.argv)).argv
const env = (argv as any).env || Env.Dev

const envFileName: Record<string, string> = {
  [Env.Dev]: '.env',
  [Env.CI]: '',
  [Env.Test]: '.env.test',
}

config({ path: `${process.cwd()}/${envFileName[env]}` })

export {}
