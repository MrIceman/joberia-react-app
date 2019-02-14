import {EntityMapper} from "./EntityMapper";
import {User} from "../Entities";

export class UserMapper extends EntityMapper<User> {
    mapFromResponse(data: any): User {
        let user = new User(
            data.user.role,
            data.user.first_name,
            data.user.last_name,
            data.user.email,
            data.user.profile_photo,
        );

        return user;
    }
}
