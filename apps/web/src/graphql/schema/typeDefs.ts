import { gql } from 'apollo-server-micro'
import { print } from 'graphql'
import { appSchema } from './app.schema'
import { atomSchema } from './atom.schema'
import { commonSchema } from './common.schema'
import { componentSchema } from './componentSchema'
import { elementSchema } from './elementSchema'
import { pageSchema } from './page.schema'
import { tagSchema } from './tag.schema'
import { typeSchema } from './type'
import { userSchema } from './user.schema'

export default print(gql`
  ${commonSchema}

  ${userSchema}

  ${appSchema}

  ${atomSchema}

  ${pageSchema}

  ${typeSchema}

  ${tagSchema}

  ${elementSchema}

  ${componentSchema}
`)
