import Ajv, { AnySchema } from 'ajv'
import { IElement } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { useAsync } from '@react-hookz/web'
import React, { useEffect } from 'react'
import { schemaTransformer } from '@codelab/frontend/domain/type'

const ajv = new Ajv({ allErrors: true, strict: false, useDefaults: true })

const ElementPropsValidator = ({ element }: { element: IElement }) => {
  const { typeService } = useStore()
  const apiId = element.renderType?.maybeCurrent?.api.id
  const propsValue = element.props.current.values

  const [{ result: interfaceType }, getInterface] = useAsync(async () => {
    return typeService.getInterface(apiId!)
  })

  useEffect(() => {
    void getInterface.execute()
  }, [apiId])

  useEffect(() => {
    if (!interfaceType) {
      return
    }

    const schema = schemaTransformer.transform(interfaceType)
    // const bridge = createBridge(schema, state)

    console.log('run validaton')

    const validator = ajv.compile(schema as AnySchema)
    void validator(propsValue)

    if (validator.errors?.length) {
      element.setPropsError('Some props are not correctly set')
    }
  }, [interfaceType])

  return <></>
}

ElementPropsValidator.displayName = 'ElementPropsValidator'
export default ElementPropsValidator
