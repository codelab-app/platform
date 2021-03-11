import {
  CreateBucketCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { Lambda } from '@prisma/client'
import AdmZip from 'adm-zip'

export class AwsS3Service extends S3Client {
  bucketPrefix = 'codelab-lambda'

  /**
   * Do nothing if bucket already exists
   *
   * @param appId
   */
  public async createBucket(appId: string): Promise<void> {
    try {
      const createBucketCommand = new CreateBucketCommand({
        Bucket: `${this.bucketPrefix}-${appId}`,
      })

      await this.send(createBucketCommand)
    } catch (e) {
      console.log(e)
    }
  }

  public async removeObject(lambda: Lambda) {
    try {
      const deleteBucketCommand = new DeleteObjectCommand({
        Bucket: `${this.bucketPrefix}-${lambda.appId}`,
        Key: lambda.id,
      })

      const results = await this.send(deleteBucketCommand)

      console.log(results)
    } catch (e) {
      console.log(e)
    }
  }

  public async uploadObject(lambda: Lambda) {
    const zip = new AdmZip()

    zip.addFile(
      `${lambda.name}.js`,
      Buffer.alloc(lambda.body.length, lambda.body),
    )

    try {
      const putObjectCommand = new PutObjectCommand({
        Bucket: `${this.bucketPrefix}-${lambda.appId}`,
        Key: lambda.id,
        Body: zip.toBuffer(),
      })
      const results = await this.send(putObjectCommand)
    } catch (e) {
      console.log(e)
    }
  }
}
