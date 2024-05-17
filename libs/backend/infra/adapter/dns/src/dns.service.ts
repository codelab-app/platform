import { Injectable } from '@nestjs/common'
import * as dns from 'dns'
import { promisify } from 'util'

export const lookupARecord = async (domain: string) => {
  const resolve = promisify(dns.resolve4)
  const results = await resolve(domain)

  return results
}

@Injectable()
export class DnsService {
  lookupARecord = lookupARecord
}
