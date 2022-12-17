/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UpdateMileStoneRequest {
  /** @format int64 */
  id?: number;
  title?: string;
  description?: string;
  /** @format date-time */
  time?: string;
  picUrls?: string;
  portalPublic?: boolean;
}

export interface Pageable {
  /**
   * @format int32
   * @min 0
   */
  page?: number;
  /**
   * @format int32
   * @min 1
   */
  size?: number;
  sort?: string[];
}

export interface MileStoneResponse {
  /** @format int64 */
  id?: number;
  title?: string;
  description?: string;
  /** @format date-time */
  time?: string;
  picUrls?: string;
  portalPublic?: boolean;
}

export interface PageMileStoneResponse {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  first?: boolean;
  last?: boolean;
  /** @format int32 */
  size?: number;
  content?: MileStoneResponse[];
  /** @format int32 */
  number?: number;
  sort?: Sort;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface PageableObject {
  /** @format int64 */
  offset?: number;
  sort?: Sort;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  paged?: boolean;
  unpaged?: boolean;
}

export interface Sort {
  empty?: boolean;
  unsorted?: boolean;
  sorted?: boolean;
}

export interface CreateMileStoneRequest {
  title: string;
  description: string;
  /** @format date-time */
  time: string;
  picUrls: string;
  portalPublic: boolean;
}

export interface UpdateUserRequest {
  /** @format int64 */
  userId: number;
  avatar: string;
  nickName: string;
}

export interface UpdateUserRoleRelationRequest {
  /** @format int64 */
  userId: number;
  roleIds: number[];
}

export interface UpdateRoleUserRelationRequest {
  /** @format int64 */
  roleId: number;
  userIds: number[];
}

export interface UpdateRolePermissionRelationRequest {
  /** @format int64 */
  roleId: number;
  permissionIds: number[];
}

export interface UpdatePermissionRoleRelationRequest {
  /** @format int64 */
  permissionId: number;
  roleIds: number[];
}

export interface UpdateCurrentUserInfoRequest {
  nickName?: string;
  avatar?: string;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  avatar: string;
  nickName: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateRoleRequest {
  /** @format int64 */
  id: number;
  code: string;
  name: string;
}

export interface CreateRoleRequest {
  code: string;
  name: string;
}

export interface UpdatePermissionRequest {
  /** @format int64 */
  id: number;
  type: "API" | "MENU" | "CUSTOM";
  value: string;
}

export interface CreatePermissionRequest {
  type: "API" | "MENU" | "CUSTOM";
  value: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface PageUserListResponse {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  first?: boolean;
  last?: boolean;
  /** @format int32 */
  size?: number;
  content?: UserListResponse[];
  /** @format int32 */
  number?: number;
  sort?: Sort;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface UserListResponse {
  /** @format int64 */
  id?: number;
  username?: string;
  nickName?: string;
  avatar?: string;
}

export interface PageRoleInfoResponse {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  first?: boolean;
  last?: boolean;
  /** @format int32 */
  size?: number;
  content?: RoleInfoResponse[];
  /** @format int32 */
  number?: number;
  sort?: Sort;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface RoleInfoResponse {
  /** @format int64 */
  id?: number;
  code?: string;
  name?: string;
}

export interface PagePermissionInfoResponse {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  first?: boolean;
  last?: boolean;
  /** @format int32 */
  size?: number;
  content?: PermissionInfoResponse[];
  /** @format int32 */
  number?: number;
  sort?: Sort;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface PermissionInfoResponse {
  /** @format int64 */
  id?: number;
  type?: "API" | "MENU" | "CUSTOM";
  value?: string;
}

export interface UserInfoResponse {
  /** @format int64 */
  id?: number;
  username?: string;
  nickName?: string;
  avatar?: string;
  roles?: RoleInfoResponse[];
  permissions?: PermissionInfoResponse[];
}
