import { get } from 'env-var'

export class TestDatabaseConfig {
  public static readonly DB_HOST: string = get('TEST_DB_HOST')
    .required()
    .asString()

  public static readonly DB_PORT: number = get('TEST_DB_PORT')
    .required()
    .asPortNumber()

  public static readonly DB_USERNAME: string = get('TEST_DB_USERNAME')
    .required()
    .asString()

  public static readonly DB_PASSWORD: string = get('TEST_DB_PASSWORD')
    .required()
    .asString()

  public static readonly DB_NAME: string = get('TEST_DB_NAME')
    .required()
    .asString()
}
