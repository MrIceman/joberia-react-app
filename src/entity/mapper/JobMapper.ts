import {EntityMapper} from "./EntityMapper";
import {Job, User} from "../Entities";
import {ResponseEntity} from "../../data/http/ResponseEntity";

export class JobMapper extends EntityMapper<Job> {
    mapFromResponse(response: ResponseEntity): Job {
        let job = new Job(
            response.body.id,
            response.body.title,
            response.body.description,
            response.body.short_description,
            response.body.desired_profile,
            response.body.offers,
            response.body.bonuses,
            response.body.location,
            response.body.skills,
            new User(
                response.body.user.role,
                response.body.user.first_name,
                response.body.user.last_name,
                response.body.user.email,
                response.body.user.profile_photo,
            ));

        return job;
    }
}
