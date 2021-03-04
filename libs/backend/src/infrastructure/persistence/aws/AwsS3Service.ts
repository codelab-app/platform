import fs from 'fs'
import * as path from 'path'
import {
  CreateBucketCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'

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

  public async uploadObject(appId: string, filename: string) {
    const fileContent = fs.readFileSync(filename)

    try {
      const createBucketCommand = new PutObjectCommand({
        Bucket: `${this.bucketPrefix}-${appId}`,
        Key: path.basename(filename),
        Body: fileContent,
      })

      await this.send(createBucketCommand)
    } catch (e) {
      console.log(e)
    }
  }
}
