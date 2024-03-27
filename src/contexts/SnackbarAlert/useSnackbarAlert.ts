import { useContext } from "react";

import { SnackbarAlertContext } from "src/contexts/SnackbarAlert/SnackbarAlert";

export function useSnackbarAlert() {
  const context = useContext(SnackbarAlertContext)

  if (!context) {
    throw new Error('useSnackbarAlert must be used within an SnackbarAlertProvider')
  }

  return context;
}
