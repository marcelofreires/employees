import type { Employee } from 'src/types'

const employeeMock1: Employee = {
  id: "1",
  name: "Vincent Barnett",
  email: "vincent.barnett@example.com",
  document: "28379074050",
  occupation: "Frontend Developer",
  status: "active"
}

const employeeMock2: Employee = {
  id: "2",
  name: "Lisa Webb",
  email: "lisa.webb@example.com",
  document: "74754721160",
  occupation: "Backend Developer",
  status: "inactive"
}

const employeeMock3: Employee = {
  id: "4",
  name: "Fred Anderson",
  email: "fred.anderson@example.com",
  document: "98938777251",
  occupation: "Product Designer",
  status: "overdue"
}

const employeeMock4: Employee = {
  id: "3",
  name: "Sofia Lane",
  email: "sofia.lane@example.com",
  document: "81613614446",
  occupation: "Tech Lead",
  status: "pending"
}

const employeesMock = [employeeMock1, employeeMock2, employeeMock3, employeeMock4]

export {
  employeeMock1,
  employeeMock2,
  employeeMock3,
  employeeMock4,
  employeesMock,
}
