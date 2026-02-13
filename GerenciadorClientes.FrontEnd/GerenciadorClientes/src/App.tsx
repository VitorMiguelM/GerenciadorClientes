import './App.css'
import { ProvedorAutenticacao } from './features/autenticacao/hooks/ContextoAutenticacao'
import { AppRoutes } from './router/AppRouter'

function App() {
  return (
    <ProvedorAutenticacao>
      <AppRoutes />
    </ProvedorAutenticacao>
  )     
}

export default App
