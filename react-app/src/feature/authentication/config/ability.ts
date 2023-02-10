import { Ability, AbilityBuilder } from "@casl/ability";
import Todo from "../../../models/todo";
import { Role, User } from "../../../models/User";

export enum Operation {
    CREATE = "create",
    READ = "read",
    UPDATE = "update",
    DELETE = "delete",
    DETAILS = "details",
    MANAGE = "manage"
}

export enum Asset {
    TODO = "todo",
    USER = "user",
    PRIVATE_FEATURE = "private_feature",
    PUBLIC_FEATURE = "public_feature"
}

const defineAbility = (user: User) => {
    const { can, cannot, build } = new AbilityBuilder(Ability);

    user.roles.forEach(role => {
        switch (role) {
            case Role.ADMIN:
                can(Operation.READ, Asset.TODO, { id: 5 })
                break;
            case Role.ORG_SUPER:
                can(Operation.MANAGE, [Asset.USER, Asset.TODO])
                break;
        }
    })

    return build({
        detectSubjectType: obj => {
            const type = Object.getPrototypeOf(obj).constructor
            return type;
        }
    })
}

export default defineAbility;