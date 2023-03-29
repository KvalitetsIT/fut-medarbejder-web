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
import { Patients } from "../pages/patients";
import { CareTeams } from "../pages/careteams";
import store from "../redux/store";
import { CareTeam } from "../pages/careteam";
import { EpisodeOfCares } from "../pages/episodeOfCares";
import { EpisodeOfCare } from "../pages/episodeOfCare";
import { Tasks } from "../pages/tasks";
import { Task } from "../pages/task";

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
                            <Route path="/" element={<Patients />} />
                            <Route path="/patients" element={<Patients />} />
                            <Route path="/episodeofcares" element={<EpisodeOfCares />} />
                            <Route path="/episodeofcares/:id" element={<EpisodeOfCare />} />
                            <Route path="/tasks" element={<Tasks />} />
                            <Route path="/tasks/:id" element={<Task />} />
                            
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
