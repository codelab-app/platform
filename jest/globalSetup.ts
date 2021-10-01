import * as shell from 'shelljs'
import { env } from './setupFiles'

export default async () => {
  shell.exec(`yarn cli dgraph update-schema --env ${env}`)
}
