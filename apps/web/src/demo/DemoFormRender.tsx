import {
  InterfaceForm,
  SelectElementProvider,
  TypeGraphFragment,
  useTypeTree,
} from '@codelab/frontend/modules/type'
import { ElementTree } from '@codelab/shared/core'
import { useRef } from 'react'
import tw from 'twin.macro'
import { DemoFormAtomData } from './DemoFormFieldTypes'
import { mapperPageElements } from './Mapper.data'

const DemoFormRender = () => {
  const elementTree = new ElementTree(mapperPageElements)

  const interfaceTree = useTypeTree(
    DemoFormAtomData.typeGraph as TypeGraphFragment,
  )

  const initialPropsRef = useRef(null)

  return (
    <div css={tw`p-10`}>
      <SelectElementProvider tree={elementTree}>
        <InterfaceForm
          interfaceTree={interfaceTree}
          model={initialPropsRef}
          onSubmit={(data) => {
            console.log(data)

            return Promise.resolve()
          }}
          submitRef={undefined}
        />
      </SelectElementProvider>
    </div>
  )
}

export default DemoFormRender
