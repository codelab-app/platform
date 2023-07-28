import { registerAs } from '@nestjs/config'
import path from 'path'

export const migrationConfig = registerAs('migration', () => ({
  dataPaths: path.resolve('./data/export'),
}))
