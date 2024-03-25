import { screen } from '@testing-library/react'

import { render } from 'src/test/test-utils'
import { AppHeader } from '.'

describe('<AppHeader />', () => {
  it('should render the component', () => {
    render(<AppHeader />)

    expect(screen.getByRole('heading', { name: /Gym/i })).toBeInTheDocument()
  })
})
