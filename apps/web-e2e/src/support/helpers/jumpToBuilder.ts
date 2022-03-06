export const jumpToBuilder = () =>
  cy.createApp().then((apps) => {
    cy.createPage({
      app: { connect: { where: { node: { id: apps[0]?.id } } } },
    }).then((page) => ({
      appId: apps[0]?.id,
      pageId: page[0]?.id,
    }))
  })
