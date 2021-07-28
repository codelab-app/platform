export interface CloudFunctionsRepository<TFunction> {
  createFunction: (func: TFunction) => Promise<any>
  removeFunction: (func: TFunction) => Promise<any>
}
