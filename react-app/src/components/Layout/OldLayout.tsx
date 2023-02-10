import { t } from 'i18next';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { UserContext } from '../../feature/authentication/logic/FetchUser';


import { RootState } from '../../redux/store';

type OldLayoutProps = {
    children: JSX.Element
}


const OldLayout = (props: OldLayoutProps) => {
    const loggedInAs = useContext(UserContext);
    return (
        <>
            <div>
                {t("Your user has name") + ""} : {loggedInAs?.name}
            </div>
            <main>{props.children}</main>
            <div>
                {t("this is the footer") + ""}
            </div>
        </>
    )
}

export default OldLayout;