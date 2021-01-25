import { get } from 'env-var'

export interface DatabaseConfig {
  PRISMA_DATABASE_URL: string
}

export const databaseConfig: DatabaseConfig = {
  PRISMA_DATABASE_URL: get('PRISMA_DATABASE_URL').required().asString(),
}

export const testDatabaseConfig: DatabaseConfig = {
  PRISMA_DATABASE_URL: get('TEST_PRISMA_DATABASE_URL').required().asString(),
}
