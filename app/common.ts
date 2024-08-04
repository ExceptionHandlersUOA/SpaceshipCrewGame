export type GameStateType = 'lobby' | 'inTutorial' | 'inGame' | 'gameOver';

export type RoleName = 'unknown' | 'pilot' | 'chemist' | 'engineer';

export type RoleData = {
    roleId: RoleName;
    username: string;
    userId: number;
};

/* TODO the structure of this will need to be changed, and it must match the client/server protocol */
export type State = {
    // TODO
    currentSequence: string;
    gameState: GameStateType;
    roles: { [user_id: string | number]: RoleData };
    resources: {
        oxygen: number;
        electricity: number;
        fuel: number;
        water: number;
    };
};

export const NICE_ROLE_NAME: { [roleName in RoleName]: string } = {
    'unknown': '',
    'pilot': 'Captain',
    'engineer': 'Engineer',
    'chemist': 'Chemist',
};
