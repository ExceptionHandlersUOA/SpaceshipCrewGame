import * as signalR from "@microsoft/signalr";
import { State } from "./common";

const SIGNALR_URL = 'https://hackathon.feroxfoxxo.com/hub';
//const SIGNALR_URL = 'http://172.20.10.71:6783/hub';

export type RoomJoin = {roomCode: string; username: string};
export type RoomJoinAck = {userId: number};
export type RoomStart = {};

export type ActionGeneric = {actionId: string};
export type ActionButton = ActionGeneric & {direction: 'down' | 'up'};
export type ActionEvent = ActionGeneric;
export type ActionSwitch = ActionGeneric & {value: boolean};
export type ActionNumber = ActionGeneric & {value: number};

export type SelectRole = {roleName: string};
export type SelectRoleAck = {success: boolean};

export type RoomCreate = {};
export type RoomCreateAck = {roomCode: string};
export type TutorialEnd = {};
export type TutorialStart = {};

export type SendProtocolId = 'RoomJoin' | 'RoomStart' | 'ActionButton' | 'ActionEvent' | 'ActionSwitch' | 'ActionNumber' | 'SelectRole' | 'RoomCreate' | 'TutorialEnd';
export type SendMessage = RoomJoin | RoomStart | ActionButton | ActionEvent | ActionSwitch | ActionNumber | RoomCreate | TutorialEnd;
export type ReceiveProtocolId = 'TutorialStart' | 'State' | 'WriteMessage' | 'GameReady' | 'GameNotReady' | 'GameEnd' | 'GameStart';
export type ReceiveMessage = TutorialStart | State | string;
export type ResponseMessage = RoomJoinAck | RoomCreateAck;

/**
 * A SignalR client for the server.
 */
export class BasicComm {

    /**
     * The SignalR connection
     */
    private connection: signalR.HubConnection;

    /**
     * Handlers for messages from the server.
     */
    private receiveHandlers: { [protocolId: string]: (data: ReceiveMessage) => void } = {};

    /**
     * Create a new SignalR client.
     * Remember to call start() to start the connection.
     */
    public constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(SIGNALR_URL)
            .build();

        this.connection.on('ServerToClient', (protocolId: string, data: any) => {
            console.log("Comm receive", protocolId, data);
            const handler = this.receiveHandlers[protocolId];
            if (handler) {
                handler(data);
            }
        });
    }

    /**
     * Start the connection - should be called for messages to be sent/received
     */
    public async start(): Promise<void> {
        console.log("Comm start");
        await this.connection.start();
    }

    /**
     * Stop the connection
     */
    public async stop(): Promise<void> {
        console.log("Comm stop");
        await this.connection.stop();
    }

    /**
     * Sends a message to the server.
     * @param protocolId
     * @param data JSON object to send
     */
    protected send(protocolId: SendProtocolId, data: SendMessage): Promise<ResponseMessage | undefined> {
        console.log("Comm send", protocolId, data);
        return this.connection.invoke(protocolId, data);
    }

    /**
     * Register a handler for a message from the server.
     *
     * @param protocolId
     * @param newMethod the handler that will be raised when the message is recieved.
     */
    protected on(protocolId: ReceiveProtocolId, newMethod: (arg: ReceiveMessage) => void): void {
        console.log("Comm on", protocolId);
        this.receiveHandlers[protocolId] = newMethod;
    }
}

/**
 * Deals with all the client/server shtick
 */
export default class Comm extends BasicComm {
    public constructor() {
        super();

        this.on('TutorialStart', ((data: TutorialStart) => {
            this.hasTutorialStarted = true;
            this.cbOnTutorialStart(data);
        }) as ((data: ReceiveMessage) => void));

        this.on('State', ((data: State) => {
            // TODO some kind of smarter merge would help with reactive stuff
            this.currentState = data;
            this.cbOnState(data);
        }) as ((data: ReceiveMessage) => void));

        this.on('WriteMessage', ((data: string) => {
            this.cbOnWriteMessage(data);
        }) as ((data: ReceiveMessage) => void));

        this.on('GameReady', (() => {
            this.cbOnGameReady();
        }) as ((data: ReceiveMessage) => void));

        this.on('GameNotReady', (() => {
            this.cbOnGameNotReady();
        }) as ((data: ReceiveMessage) => void));

        this.on('GameEnd', (() => {
            this.cbOnGameEnd();
        }) as ((data: ReceiveMessage) => void));

        this.on('GameStart', (() => {
            this.cbOnGameStart();
        }) as ((data: ReceiveMessage) => void));
    }

    /**
     * Whether the tutorial has started.
     */
    public hasTutorialStarted: boolean = false;
    /**
     * The current state of the game.
     */
    public currentState: State | null = null;

    private cbOnTutorialStart: (data: TutorialStart) => void = () => {};
    private cbOnState: (data: State) => void = () => {};
    private cbOnWriteMessage: (data: string) => void = () => {};
    private cbOnGameReady: () => void = () => {};
    private cbOnGameNotReady: () => void = () => {};
    private cbOnGameEnd: () => void = () => {};
    private cbOnGameStart: () => void = () => {};

    public async roomJoin(roomCode: string, username: string): Promise<RoomJoinAck | undefined> {
        return this.send('RoomJoin', {roomCode: roomCode, username: username}) as Promise<RoomJoinAck | undefined>;
    }

    public async roomStart(): Promise<void> {
        return this.send('RoomStart', {}) as Promise<void>;
    }

    public async actionButton(actionId: string, userId: number, direction: 'down' | 'up'): Promise<void> {
        return this.send('ActionButton', {actionId: actionId, direction: direction}) as Promise<void>;
    }

    public async actionEvent(actionId: string, userId: number): Promise<void> {
        return this.send('ActionEvent', {actionId: actionId}) as Promise<void>;
    }

    public async actionSwitch(actionId: string, userId: number, value: boolean): Promise<void> {
        return this.send('ActionSwitch', {actionId: actionId, value: value}) as Promise<void>;
    }

    public async actionNumber(actionId: string, userId: number, value: number): Promise<void> {
        return this.send('ActionNumber', {actionId: actionId, value: value}) as Promise<void>;
    }

    public async selectRole(roleName: string): Promise<SelectRoleAck | undefined> {
        return this.send('SelectRole', {roleName: roleName}) as Promise<SelectRoleAck | undefined>;
    }

    public async roomCreate(): Promise<RoomCreateAck | undefined> {
        return this.send('RoomCreate', {}) as Promise<RoomCreateAck | undefined>;
    }

    public async tutorialEnd(): Promise<void> {
        return this.send('TutorialEnd', {}) as Promise<void>;
    }

    public onTutorialStart(newMethod: (data: TutorialStart) => void): void {
        this.cbOnTutorialStart = newMethod;
    }

    public onState(newMethod: (data: State) => void): void {
        this.cbOnState = newMethod;
    }

    public onWriteMessage(newMethod: (data: string) => void): void {
        this.cbOnWriteMessage = newMethod;
    }

    public onGameReady(newMethod: () => void): void {
        this.cbOnGameReady = newMethod;
    }

    public onGameNotReady(newMethod: () => void): void {
        this.cbOnGameNotReady = newMethod;
    }

    public onGameEnd(newMethod: () => void): void {
        this.cbOnGameEnd = newMethod;
    }

    public onGameStart(newMethod: () => void): void {
        this.cbOnGameStart = newMethod;
    }
}

