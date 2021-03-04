export class AwsDITokens {
  public static readonly S3: unique symbol = Symbol('AwsS3Service')

  public static readonly Lambda: unique symbol = Symbol('AwsLambdaService')
}
