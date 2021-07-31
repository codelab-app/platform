export interface CloudFunction {
  id: string
  name: string
  body: string
}
export interface CloudFunctionsRepository<
  TCloudFunction extends CloudFunction,
> {
  createFunction: (
    bucketId: string,
    cloudFunction: TCloudFunction,
  ) => Promise<any>
  removeFunction: (cloudFunction: TCloudFunction) => Promise<any>
}
