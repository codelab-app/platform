import { auth0Instance } from '@codelab/shared/infra/auth0'
import type { NextApiHandler } from 'next'

// endpoint to securely redirect request to a user domain
const regenerate: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance.getSession(req, res)

    if (!session?.user) {
      res.status(403).send('Not Authenticated')
    }

    const { domain, pages } = req.query

    const regenerationResult = await fetch(
      `https://${domain}/api/regenerate?pages=${pages}`,
      {
        headers: {
          Cookie: req.headers.cookie ?? '',
        },
      },
    )

    const json = await regenerationResult.json()

    return res.json(json)
  } catch (err) {
    return res.status(500).send(err)
  }
}

export default regenerate
