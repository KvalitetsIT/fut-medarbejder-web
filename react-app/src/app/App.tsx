import { Typography } from "@mui/material";
import { useKeycloak, ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "keycloak-js";
import { useState, useMemo, StrictMode } from "react";
import { Provider } from "react-redux";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "../components/layout/Layout";
import Loading from "../components/loading";
import { GetJWTToken, LoginBasedOnToken, UserContext } from "../feature/authentication/logic/FetchUser";
import UserFactory from "../feature/authentication/logic/UserFactory";
import { AbilityContext } from "../feature/User/logic/Can";
import { User } from "../models/User";
import { HomePage } from "../pages/home";
import { Patients } from "../pages/patients";
import store from "../redux/store";


function App() {

    const factory = new UserFactory()

    const [user, setUser] = useState<User>(factory.createGuestUser())
    // const keycloak = useKeycloak();

    // useMemo(async () => {

    //     if (keycloak.initialized) {
    //         const jwt = await GetJWTToken(keycloak.keycloak!)
    //         const user = await LoginBasedOnToken(jwt!);

    //         setUser(user)
    //     }
    // }, [keycloak.initialized])
    // if (!keycloak.initialized)
    //     return <>Keycloak is not initialised</>
    // if (user == undefined)
    //     return <Loading />

    return (
        <BrowserRouter>
            <UserContext.Provider value={user}>
                <AbilityContext.Provider value={user.getAbility()}>
                    <Layout>
                        <>
                            <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/patients" element={<Patients />} />
                            <Route path="*" element={<Typography>Page not found</Typography>} />
                            
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
                    onLoad: 'login-required',
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
