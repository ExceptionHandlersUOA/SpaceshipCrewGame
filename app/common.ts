export type RoleName = 'pilot' | 'chemist' | 'engineer';

/* TODO the structure of this will need to be changed, and it must match the client/server protocol */
export type State = {
    roles: { [user_id: string]: RoleName };
    resources: {
        oxygen: number;
    };
};
