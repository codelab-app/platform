import * as fs from 'fs'
import { Logger } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { IGQLConfig } from '../interfaces/gql.interface'

export class ConfigService {
  private readonly envConfig: Record<string, string>

  private readonly logger = new Logger(this.constructor.name)

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath))
    this.logger.log(`Config ${JSON.stringify(this.envConfig)}`)
  }

  get GQLConfig(): IGQLConfig {
    return {
      debug: false,
      tracing: false,
      playground: true,
      cache: false,
    }
  }

  get graphQLEngineAccessKey(): string {
    return this.envConfig.GQL_ENGINE_ACCESS_KEY
  }

  get graphQLEngineURI(): string {
    return this.envConfig.GQL_ENGINE_URI
  }

  get jwtSecret(): string {
    return this.envConfig.JWT_SECRET
  }

  get dbHost(): string {
    return this.envConfig.POSTGRES_HOST
  }

  get dbType(): string {
    return this.envConfig.DB_TYPE
  }

  get dbPort(): number {
    return parseInt(this.envConfig.POSTGRES_PORT, 10)
  }

  get dbUsername(): string {
    return this.envConfig.POSTGRES_USER
  }

  get dbPassword(): string {
    return this.envConfig.POSTGRES_PASSWORD
  }

  get db(): string {
    return this.envConfig.POSTGRES_DB
  }

  get resetDb(): boolean {
    const { argv } = process

    return argv.includes('--reset')
  }
}
