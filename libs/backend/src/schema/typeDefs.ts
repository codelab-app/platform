import { gql } from 'apollo-server-micro'
import { print } from 'graphql'
import { actionSchema } from './action.schema'
import { adminSchema } from './admin.schema'
import { appSchema } from './app.schema'
import { atomSchema } from './atom.schema'
import { commonSchema } from './common.schema'
import { componentSchema } from './component.schema'
import { elementSchema } from './element.schema'
import { hookSchema } from './hook.schema'
import { operationSchema } from './operation.schema'
import { pageSchema } from './page.schema'
import { propSchema } from './prop.schema'
import { resourceSchema } from './resource.schema'
import { storeSchema } from './store.schema'
import { tagSchema } from './tag.schema'
import { fieldSchema, typeSchema } from './type'
import { userSchema } from './user.schema'

export const typeDefs = print(gql`
  ${adminSchema}
  ${commonSchema}
  ${adminSchema}
  ${userSchema}
  ${appSchema}
  ${fieldSchema}
  ${atomSchema}
  ${pageSchema}
  ${typeSchema}
  ${tagSchema}
  ${elementSchema}
  ${propSchema}
  ${hookSchema}
  ${operationSchema}
  ${componentSchema}
  ${adminSchema}
  ${storeSchema}
  ${actionSchema}
  ${resourceSchema}
`)
