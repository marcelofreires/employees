import { MemoryRouter } from 'react-router-dom';

export function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  )
}
