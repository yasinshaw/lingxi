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
  CreateMileStoneRequest,
  MileStoneResponse,
  Pageable,
  PageMileStoneResponse,
  UpdateMileStoneRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Milestone<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags mile-stone-controller
   * @name UpdateMileStone
   * @request POST:/milestone/update
   */
  updateMileStone = (data: UpdateMileStoneRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/milestone/update`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags mile-stone-controller
   * @name DeleteMileStone
   * @request POST:/milestone/delete
   */
  deleteMileStone = (
    query: {
      /** @format int64 */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/milestone/delete`,
      method: "POST",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags mile-stone-controller
   * @name CreateMileStone
   * @request POST:/milestone/create
   */
  createMileStone = (data: CreateMileStoneRequest, params: RequestParams = {}) =>
    this.request<number, any>({
      path: `/milestone/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags mile-stone-controller
   * @name QueryByList
   * @request GET:/milestone/queryByList
   */
  queryByList = (
    query: {
      pageable: Pageable;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageMileStoneResponse, any>({
      path: `/milestone/queryByList`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags mile-stone-controller
   * @name QueryById
   * @request GET:/milestone/queryById
   */
  queryById = (
    query: {
      /** @format int64 */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<MileStoneResponse, any>({
      path: `/milestone/queryById`,
      method: "GET",
      query: query,
      ...params,
    });
}
