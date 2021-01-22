import { get } from 'env-var'

export class DatabaseConfig {
  public static readonly DB_HOST: string = get('DB_HOST').required().asString()

  public static readonly DB_PORT: number = get('DB_PORT')
    .required()
    .asPortNumber()

  public static readonly DB_USERNAME: string = get('DB_USERNAME')
    .required()
    .asString()

  public static readonly DB_PASSWORD: string = get('DB_PASSWORD')
    .required()
    .asString()

  public static readonly DB_NAME: string = get('DB_NAME').required().asString()

  public static readonly TYPEORM_SYNCHRONIZE: boolean = get(
    'TYPEORM_SYNCHRONIZE',
  )
    .default(0)
    .asBool()

  public static readonly TYPEORM_DROP_SCHEMA: boolean = get(
    'TYPEORM_DROP_SCHEMA',
  )
    .default(0)
    .asBool()

  public static readonly PRISMA_DATABASE_URL = get('PRISMA_DATABASE_URL')
}
