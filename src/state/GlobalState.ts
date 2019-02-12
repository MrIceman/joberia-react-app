/*
user:

    ROLES = (('dev', 'Developer'), ('org', 'Organization'))
    role = models.CharField(choices=ROLES, max_length=3)
    confirmed = models.BooleanField(default=False)
    disabled = models.BooleanField(default=False)
    confirm_hash = models.CharField(max_length=160, default='')
    organization = models.ForeignKey(Organization, null=True, related_name='users', on_delete=models.DO_NOTHING)
    platform = models.ForeignKey(Platform, null=False, related_name='users', on_delete=models.DO_NOTHING)
 */


type UserRole = 'dev' | 'org';

export interface User {
    role: UserRole,
    firstName: string,
    lastName: string,
    email: string,
    profilePhoto?: string,
    disabled?: boolean,
    confirmed?: boolean
}

export interface Comment {
    author: User,
    text: string,
    jobId: number,
    id: number
}

export interface Job {
    id: number,
    title: string,
    description: string,
    short_description: string,
    desired_profile: Array<string>,
    offers: Array<string>,
    bonuses: Array<string>,
    location: Array<string>,
    skills: Array<string>
    created_by: User,
}

export enum ActionFlags {
    JOB = 'job',
    JOB_LIST = 'job_list',
    JOB_CREATED = 'job_created',
    USER = 'user',
    USER_LIST = 'user_list',
    LOGIN = 'login',
    LOGIN_FAILED = 'login_failed',
    LOGOUT = 'logout',
    SIGNUP = 'signup',
    DEBUG = 'debug'
}

//type ActionFlags = 'job' | 'job_list' | 'user' | 'user_list' | 'login' | 'logout' | 'job_created' | 'signup';

export type Action = Array<ActionFlags>

export interface AppState {
    isLoggedIn: boolean,
    jobs: Array<Job>,
    newestJobs: Array<Job>,
    users: Array<User>,
    newestUsers: Array<User>,
    debugMessage: string
}

export interface MetaState {
    jwtToken: string,
    loggedInUser: User | undefined,
    platformId: number
}

export type GlobalState = MetaState & AppState;

export class GlobalStore {
    private state: GlobalState = {
        jwtToken: '',
        loggedInUser: undefined,
        platformId: 1,
        isLoggedIn: false,
        jobs: [],
        users: [],
        newestJobs: [],
        newestUsers: [],
        debugMessage: ''
    };
    private listeners: Map<ActionFlags, Array<StoreListener<Partial<GlobalState>>>> = new Map<ActionFlags, Array<StoreListener<Partial<GlobalState>>>>();

    private static instance: GlobalStore;

    private constructor() {
        //      this.listen = this.listen.bind(this);
        this.unlisten = this.unlisten.bind(this);
        this.update = this.update.bind(this);
    }

    public static get(): GlobalStore {
        if (this.instance == null)
            this.instance = new GlobalStore();
        return this.instance;
    }


    private subscribeListener(listenerAction: ActionFlags, storeListener: StoreListener<any>) {
        let listeners = this.listeners.get(listenerAction);
        if (listeners != null) {
            if (listeners.indexOf(storeListener) == -1)
                listeners.push(storeListener)
        } else {
            listeners = [storeListener];
            console.log(listeners);
        }
        this.listeners.set(listenerAction, listeners);
    }

    private unsubscribeListener(listenerAction: ActionFlags, storeListener: StoreListener<any>) {
        let listeners = this.listeners.get(listenerAction);
        if (listeners != null) {
            if (listeners.indexOf(storeListener) != -1)
                listeners.splice(listeners.indexOf(storeListener), 1);
            this.listeners.set(listenerAction, listeners);
        }
    }

    public listen(storeListener: StoreListener<any>) {
        let listenerAction: Array<ActionFlags> = [];
        listenerAction.push(...storeListener.getAction());
        for (let a of listenerAction)
            this.subscribeListener(a, storeListener);
    }

    public unlisten(storeListener: StoreListener<any>) {
        let listenerAction: Array<ActionFlags> = [];
        listenerAction.push(...storeListener.getAction());
        for (let a of listenerAction)
            this.unsubscribeListener(a, storeListener);
    }

    public update(partial: Partial<GlobalState>, action: ActionFlags) {
        this.state = {...this.state, ...partial};

        if (this.listeners.get(action) != undefined) {
            // @ts-ignore
            for (let listener of this.listeners.get(action)) {
                listener.update(this.state);
            }
        }
    }
}

export interface StoreListener<T extends Partial<GlobalState>> {
    update(state: Partial<GlobalState>): void;

    getAction(): Array<ActionFlags>;
}
