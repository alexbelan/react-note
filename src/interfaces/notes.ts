export interface Note {
    id: string,
    body: string,
    datetime: {
        nanoseconds: number,
        seconds: number
    } | string
} 

export interface DataNote {
    body: string,
    datetime?: string
}