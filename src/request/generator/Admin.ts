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

import {
  ChangePasswordRequest,
  CreatePermissionRequest,
  CreateRoleRequest,
  CreateUserRequest,
  LoginRequest,
  Pageable,
  PagePermissionInfoResponse,
  PageRoleInfoResponse,
  PageUserListResponse,
  UpdateCurrentUserInfoRequest,
  UpdatePermissionRequest,
  UpdatePermissionRoleRelationRequest,
  UpdateRolePermissionRelationRequest,
  UpdateRoleRequest,
  UpdateRoleUserRelationRequest,
  UpdateUserRequest,
  UpdateUserRoleRelationRequest,
  UserInfoResponse,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Admin<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags auth-write-controller
   * @name UpdateUser
   * @request POST:/admin/user/update
   */
  updateUser = (data: UpdateUserRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/user/update`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-write-controller
   * @name UpdateUserRoleRelation
   * @request POST:/admin/user/updateUserRoleRelation
   */
  updateUserRoleRelation = (data: UpdateUserRoleRelationRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/user/updateUserRoleRelation`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-write-controller
   * @name UpdateRoleUserRelation
   * @request POST:/admin/user/updateRoleUserRelation
   */
  updateRoleUserRelation = (data: UpdateRoleUserRelationRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/user/updateRoleUserRelation`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-write-controller
   * @name UpdateRolePermissionRelation
   * @request POST:/admin/user/updateRolePermissionRelation
   */
  updateRolePermissionRelation = (data: UpdateRolePermissionRelationRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/user/updateRolePermissionRelation`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-write-controller
   * @name UpdatePermissionRoleRelation
   * @request POST:/admin/user/updatePermissionRoleRelation
   */
  updatePermissionRoleRelation = (data: UpdatePermissionRoleRelationRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/user/updatePermissionRoleRelation`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-write-controller
   * @name UpdateCurrentUserInfo
   * @request POST:/admin/user/updateCurrentUserInfo
   */
  updateCurrentUserInfo = (data: UpdateCurrentUserInfoRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/user/updateCurrentUserInfo`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-write-controller
   * @name CreateUser
   * @request POST:/admin/user/create
   */
  createUser = (data: CreateUserRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/user/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-write-controller
   * @name ChangePassword
   * @request POST:/admin/user/changePassword
   */
  changePassword = (data: ChangePasswordRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/user/changePassword`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-write-controller
   * @name UpdateManuPermissions
   * @request POST:/admin/updateManuPermissions
   */
  updateManuPermissions = (data: string[], params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/updateManuPermissions`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-write-controller
   * @name UpdateApiPermissions
   * @request POST:/admin/updateApiPermissions
   */
  updateApiPermissions = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/updateApiPermissions`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-write-controller
   * @name UpdateRole
   * @request POST:/admin/role/update
   */
  updateRole = (data: UpdateRoleRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/role/update`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-write-controller
   * @name CreateRole
   * @request POST:/admin/role/create
   */
  createRole = (data: CreateRoleRequest, params: RequestParams = {}) =>
    this.request<number, any>({
      path: `/admin/role/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-write-controller
   * @name UpdatePermission
   * @request POST:/admin/permission/update
   */
  updatePermission = (data: UpdatePermissionRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/permission/update`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-write-controller
   * @name CreatePermission
   * @request POST:/admin/permission/create
   */
  createPermission = (data: CreatePermissionRequest, params: RequestParams = {}) =>
    this.request<number, any>({
      path: `/admin/permission/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-write-controller
   * @name Login
   * @request POST:/admin/login
   */
  login = (data: LoginRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/admin/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-read-controller
   * @name GetUserList
   * @request GET:/admin/users
   */
  getUserList = (
    query: {
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageUserListResponse, any>({
      path: `/admin/users`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-read-controller
   * @name GetUserListByRoleId
   * @request GET:/admin/usersByRole
   */
  getUserListByRoleId = (
    query: {
      pageable: Pageable;
      /** @format int64 */
      roleId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageUserListResponse, any>({
      path: `/admin/usersByRole`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-read-controller
   * @name GetRoleList
   * @request GET:/admin/roles
   */
  getRoleList = (
    query: {
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageRoleInfoResponse, any>({
      path: `/admin/roles`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-read-controller
   * @name GetRoleListByUserId
   * @request GET:/admin/rolesByUser
   */
  getRoleListByUserId = (
    query: {
      pageable: Pageable;
      /** @format int64 */
      userId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageRoleInfoResponse, any>({
      path: `/admin/rolesByUser`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-read-controller
   * @name GetRoleListByPermissionId
   * @request GET:/admin/rolesByPermission
   */
  getRoleListByPermissionId = (
    query: {
      pageable: Pageable;
      /** @format int64 */
      permissionId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageRoleInfoResponse, any>({
      path: `/admin/rolesByPermission`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-read-controller
   * @name GetPermissionList
   * @request GET:/admin/permissions
   */
  getPermissionList = (
    query: {
      pageable: Pageable;
      type: "API" | "MENU" | "CUSTOM";
    },
    params: RequestParams = {},
  ) =>
    this.request<PagePermissionInfoResponse, any>({
      path: `/admin/permissions`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-read-controller
   * @name GetPermissionListByRoleId
   * @request GET:/admin/permissionsByRole
   */
  getPermissionListByRoleId = (
    query: {
      pageable: Pageable;
      /** @format int64 */
      roleId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<PagePermissionInfoResponse, any>({
      path: `/admin/permissionsByRole`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-read-controller
   * @name GetCurrentUserInfo
   * @request GET:/admin/currentUserInfo
   */
  getCurrentUserInfo = (params: RequestParams = {}) =>
    this.request<UserInfoResponse, any>({
      path: `/admin/currentUserInfo`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-write-controller
   * @name DeleteUser
   * @request DELETE:/admin/user/delete
   */
  deleteUser = (
    query: {
      /** @format int64 */
      userId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/admin/user/delete`,
      method: "DELETE",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-write-controller
   * @name DeleteRole
   * @request DELETE:/admin/role/delete
   */
  deleteRole = (
    query: {
      /** @format int64 */
      roleId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/admin/role/delete`,
      method: "DELETE",
      query: query,
      ...params,
    });
}
