
export function deepClone<T>(source: T): T {
    return JSON.parse(JSON.stringify(source));
}
