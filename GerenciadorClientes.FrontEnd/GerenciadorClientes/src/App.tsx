import './App.css'
import { ProvedorAutenticacao } from './features/autenticacao/hooks/ProvedorAutenticacao'
import { AppRoutes } from './router/AppRouter'

function App() {
  return (
    <ProvedorAutenticacao>
      <AppRoutes />
    </ProvedorAutenticacao>
  )     
}

export default App
