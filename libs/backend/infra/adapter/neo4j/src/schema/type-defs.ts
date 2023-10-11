import { gql } from '@apollo/client'
import { print } from 'graphql'
import { commonSchema } from './common.schema'
import { actionSchema } from './model/action.schema'
import { appSchema } from './model/app.schema'
import { atomSchema } from './model/atom.schema'
import { authGuardSchema } from './model/auth-guard.schema'
import { componentSchema } from './model/component.schema'
import { domainSchema } from './model/domain.schema'
import { elementSchema } from './model/element.schema'
import { hookSchema } from './model/hook.schema'
import { pageSchema } from './model/page.schema'
import { propSchema } from './model/prop.schema'
import { resourceSchema } from './model/resource.schema'
import { storeSchema } from './model/store.schema'
import { tagSchema } from './model/tag.schema'
import { urlSchema } from './model/url.schema'
import { userSchema } from './model/user.schema'
import { fieldSchema, typeSchema } from './type'

export const typeDefs = print(gql`
  ${commonSchema}
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
  ${componentSchema}
  ${storeSchema}
  ${urlSchema}
  ${actionSchema}
  ${resourceSchema}
  ${domainSchema}
  ${authGuardSchema}
`)
