export class AwsTokens {
  public static readonly AwsConfig: unique symbol = Symbol('AwsConfig')

  public static readonly S3: unique symbol = Symbol('AwsS3Service')

  public static readonly Lambda: unique symbol = Symbol('AwsLambdaService')
}
