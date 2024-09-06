import { TIpv4, Validator } from '@codelab/shared/infra/schema'
import { Test } from '@nestjs/testing'
import { DnsService } from './dns.service'

describe('Dns lookup', () => {
  let dnsService: DnsService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      providers: [DnsService],
    }).compile()

    dnsService = module.get(DnsService)
  })

  it('can resolve an A record', async () => {
    const domain = 'codelab.app'
    const results = await dnsService.lookupARecord(domain)
    const validated = Validator.validate(TIpv4, results[0])

    expect(validated).toBeTruthy()
  })
})
