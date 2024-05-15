import { authMiddleware } from '@codelab/backend/infra/adapter/graphql'
import type { NextApiHandler } from 'next'

// endpoint to securely redirect request to a user domain
const regenerate: NextApiHandler = async (req, res) => {
  try {
    await authMiddleware(req, res)

    const { domain, pages } = req.query

    console.log(domain, pages)

    const regenerationResult = await fetch(
      // We could attach `domain` as a query param, but we explicity force a hostname so we can verify that the user owns the domain & has properly setup their DNS
      `http://${domain}/api/regenerate?pages=${pages}`,
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
