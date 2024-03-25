import { screen } from '@testing-library/react'

import { render } from 'src/test/test-utils'
import { EmployeesList } from '.'
import { employeesMock } from 'src/test/mocks/employeesMocks'

describe('<EmployeesList />', () => {
  it('should render a list with all employees', () => {
    render(<EmployeesList employees={employeesMock} />)

    expect(screen.getByRole('heading', { name: /Vincent Barnett/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Lisa Webb/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Fred Anderson/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Sofia Lane/i })).toBeInTheDocument()
  })
})
