import type {
  UnionTypeTypesOfUnionTypeCreateInput,
  UnionTypeTypesOfUnionTypeUpdateInput,
} from '@codelab/shared-infra-gqlgen'

import {
  connectTypesOfUnionType,
  disconnectTypesOfUnionType,
} from '../type-input.factory'
import { typeRefs } from './data'

describe('typesOfUnionType', () => {
  it('should generate connection object for each type kind', () => {
    const result = connectTypesOfUnionType(typeRefs)

    const input: UnionTypeTypesOfUnionTypeCreateInput = {
      ActionType: {
        connect: [
          { where: { node: { id: '1a23f456-c70c-4ce0-ab73-59935a806b05' } } },
          { where: { node: { id: '2b34e567-d81d-5df1-bc84-60046b917c16' } } },
          { where: { node: { id: '3b34e567-d81d-5df1-bc84-60046b917c17' } } },
        ],
      },
      AppType: {
        connect: [
          { where: { node: { id: '3c45d678-e92e-6eg2-cd95-71157c028d27' } } },
        ],
      },
      ArrayType: {
        connect: [
          { where: { node: { id: '4d56c789-fa3f-7fh3-de06-82268d139e38' } } },
          { where: { node: { id: '5e67b890-gb4g-8gi4-ef17-93379e240f49' } } },
        ],
      },
      CodeMirrorType: {
        connect: [
          { where: { node: { id: '6f78a901-hc5h-9hj5-fg28-04480f351g50' } } },
        ],
      },
      ElementType: {
        connect: [
          { where: { node: { id: '7g89b012-id6i-0ik6-gh39-15591g462h61' } } },
        ],
      },
      EnumType: {
        connect: [
          { where: { node: { id: '8h90c123-je7j-1jl7-hi40-26602h573i72' } } },
        ],
      },
      InterfaceType: {
        connect: [
          { where: { node: { id: '9i01d234-kf8k-2km8-ij51-37713i684j83' } } },
        ],
      },
      LambdaType: {
        connect: [
          { where: { node: { id: '0j12e345-lg9l-3ln9-jk62-48824j795k94' } } },
        ],
      },
      PageType: {
        connect: [
          { where: { node: { id: '1k23f456-mh0m-4mo0-kl73-59935k806l05' } } },
        ],
      },
      PrimitiveType: {
        connect: [
          { where: { node: { id: '2l34g567-ni1n-5np1-lm84-60046l917m16' } } },
        ],
      },
      ReactNodeType: {
        connect: [
          { where: { node: { id: '3m45h678-oj2o-6oq2-mn95-71157m028n27' } } },
        ],
      },
      RenderPropType: {
        connect: [
          { where: { node: { id: '4n56i789-pk3p-7pr3-no06-82268n139o38' } } },
        ],
      },
      RichTextType: {
        connect: [
          { where: { node: { id: '5o67j890-ql4q-8qs4-op17-93379o240p49' } } },
        ],
      },
      UnionType: {
        connect: [
          { where: { node: { id: '6p78k901-rm5r-9rt5-pq28-04480p351q50' } } },
        ],
      },
    }

    expect(result).toEqual(input)
  })

  it('should generate disconnect object for each type kind', () => {
    const result = disconnectTypesOfUnionType(typeRefs)

    const input: UnionTypeTypesOfUnionTypeUpdateInput = {
      ActionType: [
        {
          disconnect: [
            { where: { node: { id: '1a23f456-c70c-4ce0-ab73-59935a806b05' } } },
            { where: { node: { id: '2b34e567-d81d-5df1-bc84-60046b917c16' } } },
            { where: { node: { id: '3b34e567-d81d-5df1-bc84-60046b917c17' } } },
          ],
        },
      ],
      AppType: [
        {
          disconnect: [
            { where: { node: { id: '3c45d678-e92e-6eg2-cd95-71157c028d27' } } },
          ],
        },
      ],
      ArrayType: [
        {
          disconnect: [
            { where: { node: { id: '4d56c789-fa3f-7fh3-de06-82268d139e38' } } },
            { where: { node: { id: '5e67b890-gb4g-8gi4-ef17-93379e240f49' } } },
          ],
        },
      ],
      CodeMirrorType: [
        {
          disconnect: [
            { where: { node: { id: '6f78a901-hc5h-9hj5-fg28-04480f351g50' } } },
          ],
        },
      ],
      ElementType: [
        {
          disconnect: [
            { where: { node: { id: '7g89b012-id6i-0ik6-gh39-15591g462h61' } } },
          ],
        },
      ],
      EnumType: [
        {
          disconnect: [
            { where: { node: { id: '8h90c123-je7j-1jl7-hi40-26602h573i72' } } },
          ],
        },
      ],
      InterfaceType: [
        {
          disconnect: [
            { where: { node: { id: '9i01d234-kf8k-2km8-ij51-37713i684j83' } } },
          ],
        },
      ],
      LambdaType: [
        {
          disconnect: [
            { where: { node: { id: '0j12e345-lg9l-3ln9-jk62-48824j795k94' } } },
          ],
        },
      ],
      PageType: [
        {
          disconnect: [
            { where: { node: { id: '1k23f456-mh0m-4mo0-kl73-59935k806l05' } } },
          ],
        },
      ],
      PrimitiveType: [
        {
          disconnect: [
            { where: { node: { id: '2l34g567-ni1n-5np1-lm84-60046l917m16' } } },
          ],
        },
      ],
      ReactNodeType: [
        {
          disconnect: [
            { where: { node: { id: '3m45h678-oj2o-6oq2-mn95-71157m028n27' } } },
          ],
        },
      ],
      RenderPropType: [
        {
          disconnect: [
            { where: { node: { id: '4n56i789-pk3p-7pr3-no06-82268n139o38' } } },
          ],
        },
      ],
      RichTextType: [
        {
          disconnect: [
            { where: { node: { id: '5o67j890-ql4q-8qs4-op17-93379o240p49' } } },
          ],
        },
      ],
      UnionType: [
        {
          disconnect: [
            { where: { node: { id: '6p78k901-rm5r-9rt5-pq28-04480p351q50' } } },
          ],
        },
      ],
    }

    expect(result).toEqual(input)
  })
})
