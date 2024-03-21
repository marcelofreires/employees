import { fireEvent, render, screen } from "@testing-library/react"

import App from "./App"

describe('<App />', () => {
  it('should render <App /> component', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /vite \+ react/i })).toBeInTheDocument()
  })

  it('should increment 1 when the user to click the counter button', () => {
    render(<App />)

    const button = screen.getByRole('button', { name: /count is/i })

    fireEvent.click(button)

    expect(button).toHaveTextContent('count is 1')
  })
})
