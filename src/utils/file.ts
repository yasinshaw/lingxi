import {getUUID} from "@/utils/uuid";
import {date2Str} from "@/utils/date";

export function getRandomFilePath(prefix: string = '') {
    return prefix + date2Str(new Date(), 'YYYYMM/DD/') + getUUID(12, 16);
}
