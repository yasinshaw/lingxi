export type Nullable<T> = T | null;

export interface UserInfo {
    avatar:      string;
    id:          number;
    nickName:    string;
    permissions: Permission[];
    roles:       Role[];
    username:    string;
}

export interface Permission {
    id?:    number;
    type?:  string[];
    value?: string;
}

export interface Role {
    code?: string;
    id?:   number;
    name?: string;
}
