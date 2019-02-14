import {Job, User} from "../entity/Entities";

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
