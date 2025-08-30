import type { NextRequest } from 'next/server'

import { getEnv } from '@codelab/shared-config-env'
import { Validator } from '@codelab/shared-infra-typebox'
import { lists, setConfig } from '@mailchimp/mailchimp_marketing'
import { Type } from '@sinclair/typebox'
import { NextResponse } from 'next/server'

const EmailSchema = Type.Object({
  email: Type.String({ format: 'email' }),
})

export const POST = async (request: NextRequest) => {
  const { apiKey, listId, serverPrefix } = getEnv().mailchimp

  try {
    const body = await request.json()
    const { email } = Validator.parse(EmailSchema, body)

    setConfig({
      apiKey,
      server: serverPrefix,
    })

    const response = await lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: 'invalid or already added email' },
      { status: 500 },
    )
  }
}
