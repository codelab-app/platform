import {
  InterfaceForm,
  SelectElementProvider,
  TypeGraphFragment,
  useTypeTree,
} from '@codelab/frontend/modules/type'
import { ElementTree } from '@codelab/shared/core'
import tw from 'twin.macro'
import DemoFormAtomData from './DemoFormTypes.codelab.json'
import { mapperPageElements } from './Mapper.data'

const DemoFormRender = () => {
  const elementTree = new ElementTree(mapperPageElements)

  const typeTree = useTypeTree(
    DemoFormAtomData[0].typeGraph as TypeGraphFragment,
  )

  return (
    <div css={tw`p-10`}>
      <SelectElementProvider tree={elementTree}>
        <InterfaceForm
          interfaceTree={typeTree}
          onSubmit={(data: any) => {
            console.log(data)
          }}
        />
      </SelectElementProvider>
    </div>
  )
}

export default DemoFormRender
