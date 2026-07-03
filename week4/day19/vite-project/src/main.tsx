import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './pages/context/userContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <UserProvider>
     <App />
  </UserProvider>
  </BrowserRouter>,
)
