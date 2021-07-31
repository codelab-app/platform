import {
  CreateBucketCommand,
  DeleteBucketCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import AdmZip from 'adm-zip'
import { ObjectStorageRepository } from '../../../ports/persistence'
import { Lambda } from '../lambda.interface'

export class AwsS3Service
  extends S3Client
  implements ObjectStorageRepository<Lambda>
{
  /**
   * Do nothing if bucket already exists
   *
   * @param appId
   */
  public async createBucket(bucketId: string): Promise<void> {
    try {
      const createBucketCommand = new CreateBucketCommand({
        Bucket: bucketId,
      })

      await this.send(createBucketCommand)
    } catch (e) {
      console.error(e)
    }
  }

  public async deleteBucket(bucketId: string): Promise<void> {
    try {
      const createBucketCommand = new DeleteBucketCommand({
        Bucket: bucketId,
      })

      await this.send(createBucketCommand)
    } catch (e) {
      console.error(e)
    }
  }

  public async removeObject(bucketId: string, s3Object: Lambda) {
    try {
      const deleteBucketCommand = new DeleteObjectCommand({
        Bucket: bucketId,
        Key: s3Object.id,
      })

      await this.send(deleteBucketCommand)
    } catch (e) {
      console.error(e)
    }
  }

  public async uploadObject(bucketId: string, s3Object: Lambda) {
    const zip = new AdmZip()

    zip.addFile(
      `${s3Object.name}.js`,
      Buffer.alloc(s3Object.body.length, s3Object.body),
    )

    try {
      const putObjectCommand = new PutObjectCommand({
        Bucket: bucketId,
        Key: s3Object.id,
        Body: zip.toBuffer(),
      })

      await this.send(putObjectCommand)
    } catch (e) {
      console.error(e)
    }
  }
}
