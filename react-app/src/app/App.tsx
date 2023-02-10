import { Typography } from "@mui/material"
import { useState, StrictMode } from "react"
import { Provider } from "react-redux"
import { Router, Routes, Route, BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "../components/layout/Layout"
import { AbilityContext } from "../feature/authentication/logic/Can"
import { UserContext } from "../feature/authentication/logic/FetchUser"
import UserFactory from "../feature/authentication/logic/UserFactory"
import { User } from "../models/User"
import { HomePage } from "../pages/home"
import { Patients } from "../pages/patients"
import store from "../redux/store"

function App() {


    const factory = new UserFactory()


    const [user, setUser] = useState<User>(factory.createGuestUser())
    

    return (
        <BrowserRouter>
            <UserContext.Provider value={user}>
                <AbilityContext.Provider value={user.getAbility()}>
                    <Layout>
                        <>
                            <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/patients" element={<Patients />} />
                                <Route path="*" element={<Typography variant="h1">Page not found</Typography>} />
                            </Routes>

                            <ToastContainer closeButton={true} position="bottom-right" />
                        </>
                    </Layout>
                </AbilityContext.Provider>
            </UserContext.Provider>
        </BrowserRouter >
    )
}

const AppWrapper = () => {
    return (
        <Provider store={store}>
            {/* <ReactKeycloakProvider
                initOptions={{
                    //onLoad: 'login-required',
                    checkLoginIframe: false
                }}
                authClient={keycloak}
                autoRefreshToken={true}
            > */}
                <StrictMode>
                    <App />
                </StrictMode>
            {/* </ReactKeycloakProvider> */}
        </Provider >
    )
}


export default AppWrapper;
