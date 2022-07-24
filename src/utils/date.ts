import dayjs from "dayjs";

export function date2Str(date: Date, fmt: string = 'YYYY-MM-dd'): string {
    return dayjs(date).format(fmt)
}
