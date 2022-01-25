import { CreateResponse } from '@codelab/backend/application'
import { domainRequest } from '@codelab/backend/shared/testing'
import { IType } from '@codelab/shared/abstract/core'
import { getCyElementData, TypeTree } from '@codelab/shared/core'
import { setupTypeTestModule } from '../../../../tests/setupTypeTestModule'
import { GetTypesInput } from '../../get-types'
import { ImportTypesInput } from '../import-types.input'
import { ExportTypesGql, ImportTypesGql } from './import-types.api.graphql.gen'
import { importTypesData, testDataByTypeName } from './import-types.data'
import { Export__TypesFragment } from './TypeExport.fragment.graphql.gen'

describe('ImportTypes', () => {
  const testModule = setupTypeTestModule()

  const importTypesInput = {
    payload: JSON.stringify(importTypesData),
  }

  describe('Guest', () => {
    it('should fail to import apis', async () => {
      await domainRequest<ImportTypesInput>(
        testModule.guestApp,
        ImportTypesGql,
        importTypesInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should import types', async () => {
      const { importTypes } = await domainRequest<
        ImportTypesInput,
        { importTypes: Array<CreateResponse> }
      >(testModule.userApp, ImportTypesGql, importTypesInput)

      const ids = importTypes.map((result) => {
        const { id } = result

        return id
      })

      const { getTypes } = await domainRequest<
        GetTypesInput,
        { getTypes: Array<Export__TypesFragment> }
      >(testModule.userApp, ExportTypesGql, { where: { ids: ids } })

      getTypes.forEach((type) => {
        const tree = new TypeTree(type.typeGraph as any)
        const testData = testDataByTypeName[type.name]

        tree.bfsVisit((v, _, u, i) => {
          const vertex = getCyElementData<IType>(v)
          const parent = getCyElementData<IType>(u)
          const testDataI = testData[i]
          const { vertex: testVertex, parent: testParent } = testDataI

          if (testVertex) {
            expect(vertex).toMatchObject(testVertex)
          } else {
            throw new Error('testVertex is falsy')
          }

          if (testParent) {
            expect(parent).toMatchObject(testParent)
          } else {
            expect(parent).toBe(testParent)
          }
        })
      })
    })
  })
})
