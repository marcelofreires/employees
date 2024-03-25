import { screen } from '@testing-library/react'

import { render } from 'src/test/test-utils'
import { EmployeeCard } from '.'
import { employeeMock1, employeeMock2, employeeMock3, employeeMock4 } from 'src/test/mocks/employeesMocks'

describe('<EmployeeCard />', () => {
  it('should render the component', () => {
    render(<EmployeeCard employee={employeeMock1} />)

    expect(screen.getByRole('heading', { name: /Vincent Barnett/i })).toBeInTheDocument()
    expect(screen.getByText(/vincent\.barnett@example\.com/i)).toBeInTheDocument()
    expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument()
    expect(screen.getByText(/Ativo/i)).toBeInTheDocument()
    expect(screen.getByRole('link', {name: /Ver mais detalhes/i})).toBeInTheDocument()
  })

  describe('Displaying employee\'s plan status', () => {
    it('should show an employee with active status', () => {
      render(<EmployeeCard employee={employeeMock1} />)

      expect(screen.getByText(/Ativo/i)).toBeInTheDocument()
    })

    it('should show an employee with inactive status', () => {
      render(<EmployeeCard employee={employeeMock2} />)

      expect(screen.getByText(/Inativo/i)).toBeInTheDocument()
    })

    it('should show an employee with overdue status', () => {
      render(<EmployeeCard employee={employeeMock3} />)

      expect(screen.getByText(/Atrasado/i)).toBeInTheDocument()
    })

    it('should show an employee with pending status', () => {
      render(<EmployeeCard employee={employeeMock4} />)

      expect(screen.getByText(/Pendente/i)).toBeInTheDocument()
    })
  })
})
