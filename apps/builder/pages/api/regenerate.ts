import { appApi } from '@codelab/frontend/domain/app'
import { domainApis } from '@codelab/frontend/domain/domain'
import { pageApi } from '@codelab/frontend/domain/page'
import { userApi } from '@codelab/frontend/domain/user'
import { extractSlug } from '@codelab/frontend/shared/utils'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import type { NextApiHandler } from 'next'

const getAllPagesToRevalidate = async () => {
  const { users } = await userApi.GetUsers()
  const { domains } = await domainApis.GetDomains()
  const revalidationData = []

  for (const user of users) {
    for (const app of user.apps) {
      const domain = domains.find((d) => d.app.id === app.id)

      if (!domain || domain.domainConfig.misconfigured) {
        continue
      }

      for (const page of app.pages) {
        if (!page.isProvider) {
          revalidationData.push({ domain, page })
        }
      }
    }
  }

  return revalidationData
}

const getAllAppPagesToRevalidate = async (appId: string) => {
  const domainCondition = { where: { app: { id: appId } } }
  const { domains } = await domainApis.GetDomains(domainCondition)
  const domain = domains[0]

  if (!domain || domain.domainConfig.misconfigured) {
    return []
  }

  const { apps } = await appApi.GetApps({ where: { id: appId } })
  const pages = apps[0]?.pages ?? []

  return pages
    .filter((page) => !page.isProvider)
    .map((page) => ({ domain, page }))
}

const getSpecificPagesToRevalidate = async (
  pageIds: string | Array<string>,
) => {
  const { domains } = await domainApis.GetDomains()
  const condition = Array.isArray(pageIds) ? 'id_IN' : 'id'
  const { pages } = await pageApi.GetPages({ where: { [condition]: pageIds } })
  const revalidationData = []

  for (const page of pages) {
    const domain = domains.find((d) => d.app.id === page.app.id)

    if (!page.isProvider && domain && !domain.domainConfig.misconfigured) {
      revalidationData.push({ domain, page })
    }
  }

  return revalidationData
}

const regenerate: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance.getSession(req, res)

    if (!session?.user) {
      res.status(403).send('Not Authenticated')
    }

    const { appId, pageId } = req.query
    let revalidationData

    if (appId) {
      revalidationData = await getAllAppPagesToRevalidate(String(appId))
    } else if (pageId) {
      revalidationData = await getSpecificPagesToRevalidate(pageId)
    } else {
      revalidationData = await getAllPagesToRevalidate()
    }

    console.log(revalidationData)

    const revalidatedPages: Array<string> = []
    const failedPages: Array<string> = []

    const revalidationPromises = revalidationData.map(
      async ({ page, domain }) => {
        const pageSlug = extractSlug(page.slug)
        const path = `/_sites/${domain.name}/${pageSlug}`

        try {
          // even though builder and user web sites share the same codebase
          // it is still required to specify for which domain to regenerate
          // see https://github.com/vercel/platforms/issues/76
          req.headers.host = domain.name

          await res.revalidate(path)

          revalidatedPages.push(path)
        } catch (e) {
          failedPages.push(path)
        }
      },
    )

    await Promise.all(revalidationPromises)

    return res.json({ revalidatedPages, failedPages })
  } catch (err) {
    return res.status(500).send(err)
  }
}

export default regenerate
