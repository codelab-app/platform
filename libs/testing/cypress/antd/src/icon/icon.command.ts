import {
  type CypressElement,
  wrapSubject,
<<<<<<<< HEAD:libs/frontend/test/cypress/antd/src/icon/icon.command.ts
} from '@codelab/frontend/test/cypress/utils'
========
} from '@codelab/testing/cypress/command'
>>>>>>>> da3909c80 (test: use cli for testing import export):libs/testing/cypress/antd/src/icon/icon.command.ts

export const getIcon = (
  subject: any,
  name: string,
  options?: Partial<
    Cypress.Loggable & Cypress.Shadow & Cypress.Timeoutable & Cypress.Withinable
  >,
): CypressElement => {
  return wrapSubject(subject).find(`.anticon-${name}`, options)
}
