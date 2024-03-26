import { Switch, Route } from 'react-router-dom'

import { EmployeesDetailsScreen, EmployeesScreen, NoMatchScreen } from 'src/screens'
import { RoutesPaths } from './constants/routesPaths'

export default function AppRoutes() {
  return (
    <Switch>
      <Route exact path={RoutesPaths.Home} component={EmployeesScreen} />
      <Route path={RoutesPaths.EmployeeDetails} component={EmployeesDetailsScreen} />
      <Route path="*" component={NoMatchScreen} />
    </Switch>
  )
}
