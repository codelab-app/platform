import { gql } from 'apollo-server-micro'
import { print } from 'graphql'
import { adminSchema } from './admin.schema'
import { appSchema } from './app.schema'
import { atomSchema } from './atom.schema'
import { commonSchema } from './common.schema'
import { componentSchema } from './component.schema'
import { elementSchema } from './element.schema'
import { pageSchema } from './page.schema'
import { storeSchema } from './store.schema'
import { tagSchema } from './tag.schema'
import { fieldSchema, typeSchema } from './type'
import { userSchema } from './user.schema'

export default print(gql`
  ${adminSchema}

  ${commonSchema}

  ${adminSchema}

  ${userSchema}

  ${appSchema}

  ${atomSchema}

  ${pageSchema}

  ${typeSchema}

  ${fieldSchema}

  ${tagSchema}

  ${elementSchema}

  ${componentSchema}

  ${adminSchema}

  ${storeSchema}
`)
