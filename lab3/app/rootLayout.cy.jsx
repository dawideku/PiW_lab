import React from 'react'
import { Layout } from './root'

describe('<Layout />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Layout />)
  })
})