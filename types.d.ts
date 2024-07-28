export interface Props{
    count: number,
    name: string,
}



export interface Actions {
    onCount(self: Props): void;
}