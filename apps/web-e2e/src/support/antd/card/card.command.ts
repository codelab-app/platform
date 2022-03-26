import { Label } from '../types'

export const getCardTitle = () => {
  return cy.get('.ant-card-head-title')
}

export const getCardContent = () => {
  return cy.get('.ant-card-body')
}

export const getCardActions = () => {
  return cy.get('.ant-card-extra')
}

type CardSearch = {
  title: Label
}

export const getCard = ({ title }: CardSearch) => {
  return cy.contains('.ant-card-head-title', title).closest('.ant-card')
}
