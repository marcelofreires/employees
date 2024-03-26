import { screen } from '@testing-library/react'

import { render } from 'src/test/test-utils'
import { employeeMock1 } from 'src/test/mocks/employeesMocks'
import { EditEmployeeForm } from '.'

describe('<EditEmployeeForm />', () => {
  it('should render the form with all employee\'s infos', () => {
    render(<EditEmployeeForm employee={employeeMock1} />)

    expect(screen.getByDisplayValue(/Vincent Barnett/i)).toBeInTheDocument()
    expect(screen.getByDisplayValue(/Frontend Developer/i)).toBeInTheDocument()
    expect(screen.getByDisplayValue(/vincent\.barnett@example\.com/i)).toBeInTheDocument()
    expect(screen.getByDisplayValue(/28379074050/i)).toBeInTheDocument()
  })
})
