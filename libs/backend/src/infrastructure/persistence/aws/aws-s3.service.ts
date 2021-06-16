import {
  CreateBucketCommand,
  DeleteBucketCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ILambda } from '@codelab/modules/lambda-api'
import AdmZip from 'adm-zip'

export class AwsS3Service extends S3Client {
  bucketPrefix = 'codelab-lambda'

  /**
   * Do nothing if bucket already exists
   *
   * @param appId
   */
  public async createBucket(libraryId: string): Promise<void> {
    try {
      const createBucketCommand = new CreateBucketCommand({
        Bucket: `${this.bucketPrefix}-${libraryId}`,
      })

      await this.send(createBucketCommand)
    } catch (e) {
      console.log(e)
    }
  }

  public async deleteBucket(libraryId: string) {
    try {
      const createBucketCommand = new DeleteBucketCommand({
        Bucket: `${this.bucketPrefix}-${libraryId}`,
      })

      return await this.send(createBucketCommand)
    } catch (e) {
      console.log(e)

      return
    }
  }

  public async removeObject(lambda: ILambda) {
    try {
      const deleteBucketCommand = new DeleteObjectCommand({
        Bucket: `${this.bucketPrefix}-${lambda.library_id}`,
        Key: lambda.id,
      })

      const results = await this.send(deleteBucketCommand)

      return results
    } catch (e) {
      console.log(e)

      return
    }
  }

  public async uploadObject(lambda: ILambda) {
    const zip = new AdmZip()

    zip.addFile(
      `${lambda.name}.js`,
      Buffer.alloc(lambda.body.length, lambda.body),
    )

    try {
      const putObjectCommand = new PutObjectCommand({
        Bucket: `${this.bucketPrefix}-${lambda.library_id}`,
        Key: lambda.id,
        Body: zip.toBuffer(),
      })

      const results = await this.send(putObjectCommand)
    } catch (e) {
      console.log(e)
    }
  }
}
