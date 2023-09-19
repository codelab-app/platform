import {
  type CypressElement,
  domClasses,
<<<<<<<< HEAD:libs/frontend/test/cypress/antd/src/spin/spin.command.ts
} from '@codelab/frontend/test/cypress/utils'
========
} from '@codelab/testing/cypress/command'
>>>>>>>> da3909c80 (test: use cli for testing import export):libs/testing/cypress/antd/src/spin/spin.command.ts

export const getSpinner = (subject: any): CypressElement =>
  subject
    ? cy.wrap(subject).find(domClasses.spinner)
    : cy.get(domClasses.spinner)
