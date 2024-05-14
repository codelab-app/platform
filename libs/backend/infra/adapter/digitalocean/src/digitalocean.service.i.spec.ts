import { Test, type TestingModule } from '@nestjs/testing'
import { DigitaloceanModule } from './digitalocean.module'
import { DigitaloceanService } from './digitalocean.service'

describe('Digitalocean domains', () => {
  let digitaloceanService: DigitaloceanService
  const domainToAdd = 'codelab.ai'
  const domainToUpdate = 'codelab.com'

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [DigitaloceanModule],
    }).compile()

    digitaloceanService = module.get(DigitaloceanService)

    try {
      await digitaloceanService.deleteDomain(domainToAdd)
    } catch (error) {
      //
    }

    try {
      await digitaloceanService.deleteDomain(domainToUpdate)
    } catch (error) {
      //
    }
  })

  afterAll(async () => {
    await digitaloceanService.deleteDomain(domainToUpdate)
  })

  it('can fetch domain records', async () => {
    const domain = 'codelab.app'
    const records = await digitaloceanService.getDomainRecords(domain)

    const nsRecords = [
      'ns1.digitalocean.com',
      'ns2.digitalocean.com',
      'ns3.digitalocean.com',
    ]

    expect(records).toEqual(
      expect.arrayContaining(
        nsRecords.map((record) => expect.objectContaining({ data: record })),
      ),
    )
  })

  it('can create a domain', async () => {
    const created = await digitaloceanService.createDomain(domainToAdd)

    expect(created.name).toBe(domainToAdd)
  })

  it('can update a domain', async () => {
    const old = 'codelab.ai'
    const newDomain = 'codelab.com'
    const updated = await digitaloceanService.updateDomain(old, newDomain)

    expect(updated.name).toBe(newDomain)
  })
})
