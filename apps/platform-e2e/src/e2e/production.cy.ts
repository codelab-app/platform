describe(
  'Test App In Production',
  {
    env: {
      SKIP_LOGIN: true,
    },
  },
  () => {
    it('should be available globally', () => {
      cy.visit('https://production-demo-app.websites.codelab.app/')

      cy.findAllByText('Hello from production app!', { timeout: 60000 }).should(
        'exist',
      )
    })
  },
)
