
import getEnvironment from "../../../env";
import { Role, User } from "../../../models/User";
import { getRoleFromStringArray, JWTToken } from "./FetchUser";


export default class UserFactory {

    createUser(name: string, roles: Role[]): User {
        const user = new User();
        user.name = name;
        user.roles = roles
        return user;
    }

    createUserFromJWT(token: JWTToken): User {
        const user = new User()
        user.email = token.email
        user.firstName = token.given_name;
        user.lastName = token.family_name;
        user.roles = getRoleFromStringArray(token.roles)
        user.keycloak_uuid = token.sub;
        user.token = token
        return user
    }

    createGuestUser(): User {
        const user = new User();
        
        /*
        if (getEnvironment().REACT_APP_MOCK_USERNAME) {
            user.name = getEnvironment().REACT_APP_MOCK_USERNAME;
            user.roles.push(Role.ADMIN)
            return user;
        }
        */
        user.name = "Gr6_medarbejder9 Johnson";
        user.careTeamId = "135884";
        user.roles.push(Role.UNKNOWN)
        return user;
    }
}