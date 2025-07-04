/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  /** User ID */
  id?: string;
  /**
   * User email
   * @format email
   */
  email?: string;
  /** User name */
  name?: string;
  /** User profile image URL */
  profileImage?: string;
  /** GitHub ID */
  githubId?: string;
  /** Google ID */
  googleId?: string;
}

export interface UserJoinRequest {
  /**
   * User email
   * @format email
   */
  email: string;
  /** User name */
  name: string;
  /** User profile image URL */
  profileImage?: string;
  /** GitHub ID */
  githubId?: string;
  /** Google ID */
  googleId?: string;
}

export interface UserCheckRequest {
  /**
   * User email
   * @format email
   */
  email?: string;
  /** GitHub ID */
  githubId?: string;
  /** Google ID */
  googleId?: string;
}

export interface Error {
  /** Error message */
  error?: string;
}

export interface SuccessResponse {
  /** Success message */
  message?: string;
}

export interface HealthResponse {
  /** Health status */
  status?: string;
  /**
   * Timestamp
   * @format date-time
   */
  timestamp?: string;
}

export interface WorkPlace {
  /** Work place ID */
  id?: string;
  /** Work place name */
  name?: string;
  /** Latitude coordinate */
  latitude?: number;
  /** Longitude coordinate */
  longitude?: number;
  /** Description of work being done at this place */
  description?: string;
  /**
   * Creation date
   * @format date-time
   */
  createdAt?: string;
  /**
   * Last update date
   * @format date-time
   */
  updatedAt?: string;
}

export interface WorkPlaceCreateRequest {
  /** Work place name */
  name: string;
  /** Latitude coordinate */
  latitude: number;
  /** Longitude coordinate */
  longitude: number;
  /** Description of work being done at this place */
  description?: string;
}

export type LogoutCreateData = SuccessResponse;

export interface JoinCreateData {
  message?: string;
  user?: User;
}

export type JoinCreateError = Error;

export interface CheckCreateData {
  exists?: boolean;
  user?: User;
}

export type CheckCreateError = Error;

export interface GetAuthData {
  user?: User;
}

export type GetAuthError = Error;

export interface GithubCallbackCreatePayload {
  /** Authorization code from GitHub */
  code: string;
}

export interface GithubCallbackCreateData {
  access_token?: string;
  user?: {
    id?: number;
    login?: string;
    name?: string;
    email?: string;
    avatar_url?: string;
  };
}

export type GithubCallbackCreateError = Error;

export interface WorkplaceCreatePayload {
  /** Name of the work place */
  name: string;
  /** Latitude of the work place */
  latitude: number;
  /** Longitude of the work place */
  longitude: number;
  /** Description of work being done at this place */
  description?: string;
}

export interface WorkplaceCreateData {
  message?: string;
  workPlace?: WorkPlace;
}

export type WorkplaceCreateError = Error;

export interface WorkplaceListData {
  workPlaces?: WorkPlace[];
}

export type WorkplaceListError = Error;

export interface WorkplaceDeleteData {
  message?: string;
}

export type WorkplaceDeleteError = Error;

export interface GetWorkplaceData {
  workPlaces?: {
    id?: string;
    name?: string;
    latitude?: number;
    longitude?: number;
    description?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    creator?: {
      id?: string;
      name?: string;
      email?: string;
      profileImage?: string;
    };
  }[];
}

export type GetWorkplaceError = Error;

export type GetRootData = SuccessResponse;

export type HealthListData = HealthResponse;

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string =
    import.meta.env.VITE_API_URL || "http://localhost:3000";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(
      typeof value === "number" ? value : `${value}`
    )}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key]
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${
        queryString ? `?${queryString}` : ""
      }`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Work Mate Server API
 * @version 1.0.0
 * @baseUrl http://localhost:3000
 *
 * API documentation for Work Mate Server
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags General
   * @name GetRoot
   * @summary Root endpoint
   * @request GET:/
   */
  getRoot = (params: RequestParams = {}) =>
    this.request<GetRootData, any>({
      path: `/`,
      method: "GET",
      format: "json",
      ...params,
    });

  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name LogoutCreate
     * @summary Logout user
     * @request POST:/auth/logout
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<LogoutCreateData, any>({
        path: `/auth/logout`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name JoinCreate
     * @summary Register a new user
     * @request POST:/auth/join
     */
    joinCreate: (data: UserJoinRequest, params: RequestParams = {}) =>
      this.request<JoinCreateData, JoinCreateError>({
        path: `/auth/join`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name CheckCreate
     * @summary Check if user exists and login
     * @request POST:/auth/check
     */
    checkCreate: (data: UserCheckRequest, params: RequestParams = {}) =>
      this.request<CheckCreateData, CheckCreateError>({
        path: `/auth/check`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name GetAuth
     * @summary Get current user information
     * @request GET:/auth/me
     * @secure
     */
    getAuth: (params: RequestParams = {}) =>
      this.request<GetAuthData, GetAuthError>({
        path: `/auth/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name GithubCallbackCreate
     * @summary Handle GitHub OAuth callback
     * @request POST:/auth/github/callback
     */
    githubCallbackCreate: (
      data: GithubCallbackCreatePayload,
      params: RequestParams = {}
    ) =>
      this.request<GithubCallbackCreateData, GithubCallbackCreateError>({
        path: `/auth/github/callback`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  workplace = {
    /**
     * No description
     *
     * @tags WorkPlace
     * @name WorkplaceCreate
     * @summary Create a new work place
     * @request POST:/workplace
     * @secure
     */
    workplaceCreate: (
      data: WorkplaceCreatePayload,
      params: RequestParams = {}
    ) =>
      this.request<WorkplaceCreateData, WorkplaceCreateError>({
        path: `/workplace`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkPlace
     * @name WorkplaceList
     * @summary Get user's work places
     * @request GET:/workplace
     * @secure
     */
    workplaceList: (params: RequestParams = {}) =>
      this.request<WorkplaceListData, WorkplaceListError>({
        path: `/workplace`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkPlace
     * @name WorkplaceDelete
     * @summary Delete a work place
     * @request DELETE:/workplace/{id}
     * @secure
     */
    workplaceDelete: (id: string, params: RequestParams = {}) =>
      this.request<WorkplaceDeleteData, WorkplaceDeleteError>({
        path: `/workplace/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkPlace
     * @name GetWorkplace
     * @summary Get all work places with creator information
     * @request GET:/workplace/all
     */
    getWorkplace: (params: RequestParams = {}) =>
      this.request<GetWorkplaceData, GetWorkplaceError>({
        path: `/workplace/all`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  health = {
    /**
     * No description
     *
     * @tags General
     * @name HealthList
     * @summary Health check endpoint
     * @request GET:/health
     */
    healthList: (params: RequestParams = {}) =>
      this.request<HealthListData, any>({
        path: `/health`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
