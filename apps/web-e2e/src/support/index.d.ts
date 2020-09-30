import { findByButtonText } from './commands'

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      login(email: string, password: string): void;
      findByButtonText: typeof findByButtonText
    }
  }
}