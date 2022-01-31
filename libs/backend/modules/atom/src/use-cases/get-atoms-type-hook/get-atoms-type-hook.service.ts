import { UseCasePort } from '@codelab/backend/abstract/core'
import { IAtom } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { GetAtomsService } from '../get-atoms'

const hookRegex = /^Hook.+/i

@Injectable()
export class GetAtomsTypeHookService implements UseCasePort<any, Array<IAtom>> {
  constructor(private readonly getAtomsService: GetAtomsService) {}

  async execute(_: any) {
    const atoms = await this.getAtomsService.execute({
      where: { searchQuery: 'Hook' },
    })

    return atoms.filter((a) => hookRegex.test(a.name))
  }
}
