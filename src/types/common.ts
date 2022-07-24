export type Nullable<T> = T | null;

export class PageRequest {
    page: number = 10
    size: number = 0
}

export class Page<T> {
    number: number = 0
    content: Array<T> = new Array<T>()
}
