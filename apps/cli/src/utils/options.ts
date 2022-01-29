import { BuilderCallback } from 'yargs'
import { ENV_FLAG, envOptions, taskEnvOptions } from './env'

export const requireEnvOptions: BuilderCallback<any, any> = (__yargs) =>
  __yargs
    .option(ENV_FLAG, envOptions)
    .demandOption([ENV_FLAG], 'Please provide an environment')

export const requireTestEnvOptions: BuilderCallback<any, any> = (__yargs) =>
  __yargs
    .option(ENV_FLAG, taskEnvOptions)
    .demandOption([ENV_FLAG], 'Please provide a test environment')
