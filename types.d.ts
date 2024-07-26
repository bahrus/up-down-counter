export interface Props{
    count: number
}



export interface Actions {
    onCount(self: Props): void;
}