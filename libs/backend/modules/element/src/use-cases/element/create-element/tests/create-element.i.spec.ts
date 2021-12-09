import {
  CreateAtomInput,
  TestCreateAtomGql,
  TestCreateAtomMutation,
} from '@codelab/backend/modules/atom'
import { domainRequest } from '@codelab/backend/shared/testing'
import { AtomType } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { TestElementFragment } from '../../../../test/graphql'
import { setupElementTestModule } from '../../../../test/setupElementTestModule'
import { TestCreateElementGql } from './create-element.api.graphql.gen'
import {
  createComplexElementInput,
  createElementInput,
} from './create-element.data'

describe('CreateElement', () => {
  const testModule = setupElementTestModule()

  describe('Guest', () => {
    it('should fail to create an element', async () => {
      await domainRequest(
        testModule.guestApp,
        TestCreateElementGql,
        createElementInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should create a simple element', async () => {
      const element = await testModule.createTestElement(createElementInput)

      expect(element).toBeDefined()

      const match = (actual: any) =>
        expect(actual).toMatchObject({ ...createElementInput, id: element.id })

      match(element)

      const getElement = await testModule.getElement({
        where: { id: element.id },
      })

      match(getElement)
    })

    describe('Create element tree', () => {
      let element: TestElementFragment
      let tree: ElementTree

      beforeAll(async () => {
        await domainRequest<CreateAtomInput, TestCreateAtomMutation>(
          testModule.adminApp,
          TestCreateAtomGql,
          { name: 'Text', type: AtomType.Text },
        ).then((r) => r?.createAtom)

        element = await testModule.createTestElement(createComplexElementInput)

        const graph = await testModule.getElementGraph({
          where: { id: element.id },
        })

        tree = new ElementTree(graph)
      })

      it('should create a complex element', async () => {
        const config =
          createComplexElementInput &&
          createComplexElementInput.hooks &&
          createComplexElementInput.hooks[0].config

        expect(element).toEqual({
          __typename: 'Element',
          id: expect.stringContaining('0x'),
          name: createComplexElementInput.name,
          css: createComplexElementInput.css,
          atom: null,
          componentTag: null,
          props: {
            id: expect.stringContaining('0x'),
            data: createComplexElementInput.props,
          },
          hooks: [
            {
              id: expect.stringContaining('0x'),
              type: AtomType.HookRecoilState,
              config: {
                id: expect.stringContaining('0x'),
                data: config,
              },
            },
          ],
          renderForEachPropKey: null,
          renderIfPropKey: createComplexElementInput.renderIfPropKey,
          propMapBindings: [
            {
              id: expect.stringContaining('0x'),
              sourceKey:
                createComplexElementInput.propMapBindings?.[0].sourceKey,
              targetElementId: expect.stringContaining('0x'), // we test this is correct later
              targetKey:
                createComplexElementInput.propMapBindings?.[0].targetKey,
            },
          ],
          propTransformationJs: null,
        })
      })

      it('should create all descendants', async () => {
        expect(tree.getAllVertices().length).toEqual(4)

        expect(tree.getAllVertices(ElementTree.isElement).length).toEqual(3)

        expect(tree.getAllVertices(ElementTree.isComponent).length).toEqual(1)
      })

      it('should assign correct ref ids', async () => {
        const root = tree.getRootVertex()

        expect(root?.id).toBe(element.id)

        const propMapBindingResolvedId =
          root?.propMapBindings[0].targetElementId

        const textElement = tree.getAllVertices(
          (v) => v.atom?.type === AtomType.Text,
        )[0]

        expect(textElement).toBeTruthy()

        expect(textElement).toEqual({
          __typename: 'Element',
          id: propMapBindingResolvedId,
          name: createComplexElementInput.children?.[0]?.newElement?.name,
          css: null,
          atom: {
            id: expect.stringContaining('0x'),
            name: expect.any(String),
            type: AtomType.Text,
            api: expect.anything(),
          },
          componentTag: null,
          props: {
            data: '{}',
            id: expect.stringContaining('0x'),
          },
          hooks: [],
          renderForEachPropKey: null,
          renderIfPropKey: null,
          propMapBindings: [],
          propTransformationJs: null,
        })
      })

      it('should create component', async () => {
        const component = tree.getAllVertices(ElementTree.isComponent)[0]

        const inputComponent =
          createComplexElementInput.children?.[1]?.newElement?.children?.[0]

        expect(component).toEqual({
          __typename: 'Element',
          id: expect.stringContaining('0x'),
          name: inputComponent?.newElement?.name,
          css: null,
          atom: null,
          componentTag: {
            id: expect.stringContaining('0x'),
            name: inputComponent?.newElement?.name,
          },
          props: {
            id: expect.stringContaining('0x'),
            data: '{}',
          },
          hooks: [],
          renderForEachPropKey: null,
          renderIfPropKey: null,
          propMapBindings: [],
          propTransformationJs: null,
        })
      })
    })
  })
})
