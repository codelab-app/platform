import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  __AtomFragment,
  AtomType,
  CreateAtomGql,
  CreateAtomInput,
  CreateAtomMutation,
  UpdateAtomGql,
  UpdateAtomInput,
  UpdateAtomMutation,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../../../atom.module'
import { createAtomInput } from '../../create-atom/test/create-atom.data'

describe('UpdateAtom', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let atom: __AtomFragment
  let updateAtomInput: UpdateAtomInput

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.GUEST })
    userApp = await setupTestModule([AtomModule], { role: Role.USER })

    const results = await domainRequest<CreateAtomInput, CreateAtomMutation>(
      userApp,
      CreateAtomGql,
      createAtomInput,
    )

    atom = results.createAtom
    updateAtomInput = {
      id: atom.id,
      data: {
        label: 'Button updated (Ant Design)',
        type: AtomType.AntDesignButton,
      },
    }

    expect(atom.id).toBeDefined()
    expect(atom).toMatchObject(createAtomInput)
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to update an atom', async () => {
      await domainRequest(guestApp, UpdateAtomGql, updateAtomInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should update an atom', async () => {
      const results = await domainRequest<UpdateAtomInput, UpdateAtomMutation>(
        userApp,
        UpdateAtomGql,
        updateAtomInput,
      )

      expect(results.atom).toMatchObject({
        ...updateAtomInput.data,
        id: updateAtomInput.id,
      })
    })
  })
})
