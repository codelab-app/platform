import { Injectable } from '@nestjs/common'
import * as dns from 'dns'
import { promisify } from 'util'

@Injectable()
export class DnsService {
  async lookupARecord(domain: string) {
    const resolve = promisify(dns.resolve4)
    const results = await resolve(domain)

    return results
  }
}
