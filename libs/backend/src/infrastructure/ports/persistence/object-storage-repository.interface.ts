export interface CloudObject {
  name: string
  body: string
}

export interface ObjectStorageRepository<TObject extends CloudObject> {
  createBucket: (bucketId: string) => Promise<any>
  deleteBucket: (bucketId: string) => Promise<any>
  removeObject: (bucketId: string, cloudObject: TObject) => Promise<any>
  uploadObject: (bucketId: string, cloudObject: TObject) => Promise<any>
}
