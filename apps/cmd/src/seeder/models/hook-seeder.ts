import { ImportAtomsService } from '@codelab/backend/modules/atom'
import { User } from '@codelab/backend/modules/user'
import { Injectable } from '@nestjs/common'
import hookAtomData from '../data/hookAtoms.json'

@Injectable()
export class HookSeeder {
  constructor(private importAtomsService: ImportAtomsService) {}

  public async seedHooks(currentUser: User) {
    console.log('Seeding hooks...')
    await this.importAtomsService.execute({
      currentUser,
      input: { payload: JSON.stringify(hookAtomData) },
    })
  }
}
