import { BaseDgraphFields, DeepPartial, IDgraphMapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { z } from 'zod'
import {
  DgraphInterface,
  InterfaceDgraphFields,
} from '../../dgraph-interface.model'
import { InterfaceType, interfaceTypeSchema } from './interface-type.model'

@Injectable()
export class InterfaceTypeMapper
  implements IDgraphMapper<DgraphInterface, InterfaceType>
{
  static InputSchema = z.object({
    [BaseDgraphFields.uid]: z.string(),
    [InterfaceDgraphFields.Name]: z.string(),
  })

  map(input: DeepPartial<DgraphInterface>) {
    // we don't need to use the entire DgraphInterface schema, since we only need its ID
    const dgraphInterface = InterfaceTypeMapper.InputSchema.parse(input)
    const interfaceType = new InterfaceType()

    interfaceType.interfaceId = dgraphInterface[BaseDgraphFields.uid]
    interfaceType.interfaceName = dgraphInterface[InterfaceDgraphFields.Name]

    interfaceTypeSchema.parse(interfaceType)

    return interfaceType
  }
}
