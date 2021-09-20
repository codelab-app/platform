export class LoggerTokens {
  public static readonly LoggerConfig: unique symbol = Symbol('LoggerConfig')

  public static readonly LoggerProvider: unique symbol =
    Symbol('LoggerProvider')
}
