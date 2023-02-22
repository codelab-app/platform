import { auth0Instance } from '@codelab/shared/adapter/auth0'
import type { NextApiHandler } from 'next'

const regenerate: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance.getSession(req, res)

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    const domain = req.headers.host
    const pages = String(req.query.pages).split(',')

    if (!pages.length) {
      return res
        .status(400)
        .send(
          'Invalid input: endpoint accepts "page" parameter as an array of page names',
        )
    }

    const revalidatedPages: Array<string> = []
    const failedPages: Array<string> = []

    const revalidationPromises = pages.map(async (pageSlug) => {
      const path = `/${domain}/${pageSlug}`

      try {
        await res.revalidate(path)

        revalidatedPages.push(path)
      } catch (error) {
        failedPages.push(path)
      }
    })

    await Promise.all(revalidationPromises)

    return res.json({ revalidatedPages, failedPages })
  } catch (err) {
    return res.status(500).send(err)
  }
}

export default regenerate
