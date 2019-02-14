import {Job, User} from "../entity/Entities";

export interface Gateway {

    signUp(username, email, role, firstName, lastName, platform, password): Promise<string>

    signIn(): Promise<User>;

    signOut(): Promise<User>

    getAllJobs(): Promise<Array<Job>>;

    filterJobs(mode: 'new' | 'text'): Promise<Array<Job>>;

    createJob(job: Job, jwtToken: string): Promise<Job>;

    postComment(comment: Comment, jobId: number, jwtToken: string): Promise<Comment>;

    deleteJob(job: Job, jwtToken: string): Promise<boolean>;
}
