import {
  CreateBucketCommand,
  DeleteBucketCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import AdmZip from 'adm-zip'
import { Lambda } from './lambda.interface'

export class AwsS3Service extends S3Client {
  bucketPrefix = 'codelab-lambda'

  /**
   * Do nothing if bucket already exists
   *
   * @param appId
   */
  public async createBucket(ownerId: string): Promise<void> {
    try {
      const createBucketCommand = new CreateBucketCommand({
        Bucket: `${this.bucketPrefix}-${ownerId}`,
      })

      await this.send(createBucketCommand)
    } catch (e) {
      console.error(e)
    }
  }

  public async deleteBucket(ownerId: string): Promise<void> {
    try {
      const createBucketCommand = new DeleteBucketCommand({
        Bucket: `${this.bucketPrefix}-${ownerId}`,
      })

      await this.send(createBucketCommand)
    } catch (e) {
      console.error(e)
    }
  }

  public async removeObject(lambda: Lambda) {
    try {
      const deleteBucketCommand = new DeleteObjectCommand({
        Bucket: `${this.bucketPrefix}-${lambda.ownerId}`,
        Key: lambda.id,
      })

      const results = await this.send(deleteBucketCommand)

      return results
    } catch (e) {
      console.log(e)

      return
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
        Bucket: `${this.bucketPrefix}-${lambda.ownerId}`,
        Key: lambda.id,
        Body: zip.toBuffer(),
      })

      const results = await this.send(putObjectCommand)
    } catch (e) {
      console.log(e)
    }
  }
}
