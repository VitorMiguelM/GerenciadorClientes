import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { LoginForm } from "../features/autenticacao/components/LoginForm"
import { RegistrarUsuarioForm } from "../features/autenticacao/components/RegistrarUsuarioForm"
import { Paths } from "./Path"
import { ClienteDashboard } from "../features/clientes/components/ClienteDashboardForm"


export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={Paths.padrao} element={<Navigate to={Paths.login}/>} />
                <Route path={Paths.login} element={<LoginForm/>} />
                <Route path={Paths.registrarUsuario} element={<RegistrarUsuarioForm/>} />
                <Route path={Paths.clienteDashboard} element={<ClienteDashboard/>} />
            </Routes>
        </BrowserRouter>
    )
}