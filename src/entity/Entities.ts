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

export class User {
    constructor(
        public readonly role: UserRole,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly profilePhoto?: string,
        public readonly disabled?: boolean,
        public readonly confirmed?: boolean,
        public readonly jwtToken?: string
    ) {
    }
}

export class Comment {
    constructor(
        public readonly author: User,
        public readonly text: string,
        public readonly jobId: number,
        public readonly id: number
    ) {
    }
}

export class Job {

    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly description: string,
        public readonly short_description: string,
        public readonly desired_profile: Array<string>,
        public readonly offers: Array<string>,
        public readonly bonuses: Array<string>,
        public readonly location: Array<string>,
        public readonly skills: Array<string>,
        public readonly created_by: User) {
    }
}
