export interface IDigitaloceanService {
  getDomainRecords(domainName: string): {
    type: string
    data: string
  }
}
