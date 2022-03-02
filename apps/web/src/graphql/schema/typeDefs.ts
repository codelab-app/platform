import { gql } from 'apollo-server-micro'
import { print } from 'graphql'
import { adminSchema } from './admin.schema'
import { appSchema } from './app.schema'
import { atomSchema } from './atom.schema'
import { commonSchema } from './common.schema'
import { componentSchema } from './component.schema'
import { elementSchema } from './element.schema'
import { pageSchema } from './page.schema'
import { tagSchema } from './tag.schema'
import { typeSchema } from './type'
import { userSchema } from './user.schema'

export default print(gql`
  ${commonSchema}

  ${adminSchema}

  ${userSchema}

  ${appSchema}

  ${atomSchema}

  ${pageSchema}

  ${typeSchema}

  ${tagSchema}

  ${elementSchema}

  ${componentSchema}
`)
