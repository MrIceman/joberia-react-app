import {Gateway} from "../domain/Gateway";
import {HttpService} from "./http/HttpService";
import {ResponseEntityMapper} from "./http/ResponseEntityMapper";
import {API} from "../Settings";
import {Job, User} from "../entity/Entities";
import {JobMapper} from "../entity/mapper/JobMapper";

export class GatewayImpl implements Gateway {
    private static instance: GatewayImpl;

    public constructor(private readonly httpService: HttpService = new HttpService(new ResponseEntityMapper(), API),
                       private readonly jobMapper: JobMapper = new JobMapper()) {

    }

    public static getInstance(): Gateway {
        if (this.instance == null)
            this.instance = new GatewayImpl();
        return this.instance;
    }

    createJob(job: Job, token: string): Promise<Job> {
        return new Promise<Job>(async (resolve, reject) => {
            let endpoint = 'job/';

            await this.httpService.makeSignedRequest(JSON.stringify(job), token, endpoint).then((response) => {
                if (response.body != null) {
                    resolve(this.jobMapper.mapFromResponse(response.body));
                } else
                    reject();
                endpoint = null;
            }, (_) => reject).catch((_) => reject());

        });

    }

    deleteJob(job: Job): Promise<boolean> {
        return undefined;
    }

    filterJobs(mode: "new" | "text"): Promise<Array<Job>> {
        return undefined;
    }

    getAllJobs(): Promise<Array<Job>> {
        return new Promise<Array<Job>>(async (resolve, reject) => {
            let endpoint = 'job/';

            await this.httpService.makeUnsignedRequest(null, endpoint, '', 'GET')
                .then((response) => {
                    if (response.body != null) {
                        resolve(this.jobMapper.mapArray(response.body));
                    } else
                        reject();
                    endpoint = null;
                }, (_) => reject()).catch((_) => reject());
        });
    }

    postComment(comment: Comment, jobId: number): Promise<Comment> {
        return undefined;
    }

    signIn(): Promise<User> {
        return undefined;
    }

    signOut(): Promise<User> {
        return undefined;
    }

    signUp(): Promise<User> {
        return undefined;
    }

}
