import { render, screen } from "@testing-library/react"

import AppHeader from "."

describe('<AppHeader />', () => {
  it('should render <AppHeader /> component', () => {
    render(<AppHeader />)

    expect(screen.getByRole('heading', { name: /Gym/i })).toBeInTheDocument()
  })
})
