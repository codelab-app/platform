export interface ObjectStorageRepository<TObject> {
  createBucket: (owner: string) => Promise<any>
  deleteBucket: (owner: string) => Promise<any>
  removeObject: (object: TObject) => Promise<any>
  uploadObject: (object: TObject) => Promise<any>
}
