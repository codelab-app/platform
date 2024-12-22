import type { NextApiRequest, NextApiResponse } from 'next'

import { Typebox } from '@codelab/shared/infra/typebox'
import { getEnv } from '@codelab/shared/config/env'
import { lists, setConfig } from '@mailchimp/mailchimp_marketing'
import { Type } from '@sinclair/typebox'

const EmailSchema = Type.Object({
  email: Type.String().email(),
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { apiKey, listId, serverPrefix } = getEnv().mailchimp

  try {
    const { email } = Typebox.ValidateAndClean(EmailSchema, req.body)

    setConfig({
      apiKey,
      server: serverPrefix,
    })

    const response = await lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
    })

    res.status(200).json(response)

    return
  } catch (error) {
    res.status(500).json({ error: 'invalid or already added email' })

    return
  }
}

export default handler
