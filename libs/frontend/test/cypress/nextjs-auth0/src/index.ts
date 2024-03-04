import './register.cypress'
import type cypress from 'cypress'

// Dummy declaration so eslint doesn't remove
type C = typeof cypress

export * from './commands/login-and-setup-e2e-data'
export * from './commands/nextjs-auth0.commands'
