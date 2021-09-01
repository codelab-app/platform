import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { AtomType } from '@codelab/shared/enums'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../../../atom.module'
import { CreateAtomInput } from '../../create-atom'
import {
  CreateAtomGql,
  CreateAtomMutation,
} from '../../create-atom/tests/create-atom.api.graphql'
import { createAtomInput } from '../../create-atom/tests/create-atom.data'
import { GetAtomInput } from '../../get-atom/get-atom.input'
import {
  GetAtomGql,
  GetAtomQuery,
} from '../../get-atom/tests/get-atom.api.graphql'
import { UpdateAtomInput } from '../update-atom.input'
import { UpdateAtomGql, UpdateAtomMutation } from './update-atom.api.graphql'

describe('UpdateAtom', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let atomId: string
  let updateAtomInput: UpdateAtomInput
  let getAtomInput: GetAtomInput

  beforeAll(async () => {
    guestApp = await setupTestModule([AtomModule], { role: Role.GUEST })
    userApp = await setupTestModule([AtomModule], { role: Role.USER })

    const results = await domainRequest<CreateAtomInput, CreateAtomMutation>(
      userApp,
      CreateAtomGql,
      createAtomInput,
    )

    atomId = results.createAtom.id
    updateAtomInput = {
      id: atomId,
      data: {
        name: 'Button updated (Ant Design)',
        type: AtomType.AntDesignButton,
      },
    }

    getAtomInput = { where: { id: atomId } }

    expect(atomId).toBeDefined()
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
      await domainRequest<UpdateAtomInput, UpdateAtomMutation>(
        userApp,
        UpdateAtomGql,
        updateAtomInput,
      )

      const { getAtom } = await domainRequest<GetAtomInput, GetAtomQuery>(
        userApp,
        GetAtomGql,
        getAtomInput,
      )

      expect(getAtom).toMatchObject({
        ...updateAtomInput.data,
        id: updateAtomInput.id,
      })
    })
  })
})
