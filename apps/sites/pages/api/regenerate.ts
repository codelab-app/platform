import { auth0Instance } from '@codelab/shared-infra-auth0/client'
import type { NextApiHandler } from 'next'

const regenerate: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance.getSession(req, res)

    if (!session?.user) {
      res.status(403).send('Not Authenticated')

      return
    }

    const domain = req.headers.host
    const pages = String(req.query.pages).split(',')

    if (!pages.length) {
      res
        .status(400)
        .send(
          'Invalid input: endpoint accepts "page" parameter as an array of page names',
        )

      return
    }

    const revalidatedPages: Array<string> = []
    const failedPages: Array<string> = []

    const revalidationPromises = pages.map(async (pageSlug) => {
      const path = `/${domain}${pageSlug}`

      try {
        await res.revalidate(path)

        revalidatedPages.push(path)
      } catch (error) {
        failedPages.push(path)
      }
    })

    await Promise.all(revalidationPromises)

    res.json({ failedPages, revalidatedPages })

    return
  } catch (err) {
    res.status(500).send(err)

    return
  }
}

export default regenerate
