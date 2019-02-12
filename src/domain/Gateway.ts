import {Job, User} from "../state/GlobalState";

export interface Gateway {
    auth(): Promise<User>;

    getAllJobs(): Promise<Array<Job>>;

    filterJobs(mode: 'new' | 'text'): Promise<Array<Job>>;

    createJob(job: Job): Promise<Job>;

    postComment(comment: Comment, jobId: number): Promise<Comment>;

    deleteJob(job: Job): Promise<boolean>;


}
