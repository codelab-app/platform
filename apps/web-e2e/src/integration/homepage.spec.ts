describe('Types', () => {
  // Text primitive type
  const textTypeName = 'Text'
  const textTypeKind = 'Primitive'
  const textPrimitiveKind = 'String'

  // Atoms
  const atoms = [
    { name: 'Col', type: 'AntDesignGridCol' },
    { name: 'Row', type: 'AntDesignGridRow' },
    { name: 'Button', type: 'AntDesignButton' },
    { name: 'Text', type: 'AntDesignTypographyText' },
  ]

  // App
  const appName = 'New App'
  let appId: string
  // Page
  const pageName = 'Home Page'

  // Page components
  const components = [
    { name: 'Row', atom: 'Row', parentElement: 'Root element' },
    { name: 'Col A', atom: 'Col', parentElement: 'Row' },
    { name: 'Col B', atom: 'Col', parentElement: 'Row' },
    { name: 'Text', atom: 'Text', parentElement: 'Col A' },
    { name: 'Button', atom: 'Button', parentElement: 'Col B' },
    { name: 'Text', atom: 'Text', parentElement: 'Button' },
  ]

  const findEditButtonByTypeName = (text: string) =>
    cy
      .findByText(text, { exact: true, timeout: 0 })
      .closest('.ant-table-row')
      .find('.anticon-edit')
      .closest('button')

  const findDeleteButtonByTypeName = (text: string) =>
    cy
      .findByText(text, { exact: true, timeout: 0 })
      .closest('.ant-table-row')
      .find('.anticon-delete')
      .closest('button')

  const findDeleteButtonByAtomName = (text: string) =>
    cy
      .findByText(text, { exact: true, timeout: 0 })
      .closest('.ant-table-row')
      .find('.anticon-delete')
      .closest('button')

  const getComponentElementInTree = (label: string) =>
    cy.findByTestId('pane-main').find('.ant-tree-list').findByText(label)

  const getAndExpandElementInTree = (label: string) => {
    getComponentElementInTree(label)
      .first()
      .closest('div')
      .findByLabelText('caret-down') // Click on the caret next to the element in the tree to expand it
      .click()

    cy.findByTestId('pane-main')
      .find('.ant-tree-list .ant-tree-treenode-motion')
      .should('not.exist') // Wait for the expanding animation to finish
  }

  const getTreeItem = (label: string) =>
    cy.get('.ant-page-header-content').findByText(label).first()

  before(() => {
    cy.clearCookies()
    cy.login().then(() => {
      cy.createApp().then((app: any) => {
        appId = app.id
      })
    })
  })

  after(() => {
    cy.deleteApp({
      appId,
    })
  })

  describe('create text primitive type', () => {
    before(() => {
      cy.clearCookies()
      cy.login().then(() => {
        cy.visit(`/types`)
        cy.get('.ant-table-cell', { timeout: 30000 })
      })
    })

    it('should be able to create text primitive type', () => {
      cy.findAllByText(textTypeName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.findByRole('button', { name: /plus/i }).click()

      cy.getOpenedModal().findByLabelText('Name').type(textTypeName)
      cy.getOpenedModal().findByLabelText('Kind').click()
      cy.getOpenedModal().getOptionItem(textTypeKind).first().click()
      cy.getOpenedModal().findByLabelText('Primitive kind').click()
      cy.getOpenedModal().getOptionItem(textPrimitiveKind).first().click()

      cy.getOpenedModal()
        .findByButtonText(/create/i)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(textTypeName).should('exist')
    })
  })

  describe('create atoms', () => {
    before(() => {
      cy.clearCookies()
      cy.login().then(() => {
        cy.visit(`/atoms`)
        cy.get('.ant-table-cell', { timeout: 30000 })
      })
    })

    it('should be able to create atoms', () => {
      atoms.map((atom) => {
        const atomName = atom.name
        const atomType = atom.type

        cy.findAllByText(atomName, { exact: true, timeout: 0 }).should(
          'not.exist',
        )

        cy.findByRole('button', { name: /plus/i }).click()

        cy.getOpenedModal().findByLabelText('Name').type(atomName)
        cy.getOpenedModal().findByLabelText('Type').type(atomType)
        cy.getSelectOptionItemByValue(atomType).first().click()
        cy.getOpenedModal()
          .findByButtonText(/create atom/i)
          .click()

        cy.getOpenedModal().should('not.exist')
        cy.findByText(atomName).should('exist')
      })
    })
  })

  describe('create page', () => {
    before(() => {
      cy.clearCookies()
      cy.login().then(() => {
        cy.visit(`/apps/${appId}/pages`)
        cy.getSpinner()
        cy.getSpinner().should('not.exist')
      })
    })

    it('should be able to create home page', () => {
      cy.findAllByText(pageName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.findByRole('button', { name: /plus/i }).click()

      cy.getOpenedModal().findByLabelText('Name').type(pageName)
      cy.getOpenedModal()
        .findByButtonText(/create page/i)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(pageName).should('exist')

      // Go to page
      cy.findByText(pageName).click()
      cy.contains(/root element/i)

      // Add Row component
      components.map((component) => {
        const componentName = component.name
        const componentAtom = component.atom
        const componentParentElement = component.parentElement

        cy.findByRole('button', { name: /plus/i }).click()

        cy.getOpenedModal().findByLabelText('Name').type(componentName)
        cy.getOpenedModal().findByLabelText('Atom').type(componentAtom)
        cy.getOpenedModal().getOptionItem(componentAtom).first().click()
        cy.getOpenedModal()
          .findByLabelText('Parent element')
          .type(componentParentElement)
        cy.getOpenedModal()
          .getOptionItem(componentParentElement)
          .first()
          .click()

        cy.getOpenedModal()
          .findByButtonText(/create/i)
          .click()

        cy.getOpenedModal().should('not.exist')
      })
    })
  })

  describe('delete page', () => {
    before(() => {
      cy.clearCookies()
      cy.login().then(() => {
        cy.visit(`/apps/${appId}/pages`)
        cy.getSpinner()
        cy.getSpinner().should('not.exist')
      })
    })

    it('should be able to delete home page', () => {
      cy.findAllByText(pageName, { exact: true, timeout: 0 }).should('exist')

      cy.findDeleteButtonByPageName(pageName).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/delete page/i)
        .click()

      cy.findAllByText(pageName).should('not.exist')
    })
  })

  describe('delete atoms', () => {
    before(() => {
      cy.clearCookies()
      cy.login().then(() => {
        cy.visit(`/atoms`)
        cy.get('.ant-table-cell', { timeout: 30000 })
      })
    })

    it('should be able to delete atoms', () => {
      atoms.map((atom) => {
        const atomName = atom.name
        const atomType = atom.type

        findDeleteButtonByAtomName(atomName).click()

        cy.getSpinner().should('not.exist')
        cy.getOpenedModal()
          .findByButtonText(/delete atom/i)
          .click()

        cy.findAllByText(atomName).should('not.exist')
      })
    })
  })

  describe('delete text primitive type', () => {
    before(() => {
      cy.clearCookies()
      cy.login().then(() => {
        cy.visit(`/types`)
        cy.get('.ant-table-cell', { timeout: 30000 })
      })
    })

    it('should be able to delete text primitive', () => {
      findDeleteButtonByTypeName(textTypeName).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/delete/i)
        .click()

      cy.findAllByText(textTypeName).should('not.exist')
    })
  })
})
