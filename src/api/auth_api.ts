import type { baseResponse } from "@/api/index.ts";
import { useAxios } from "@/api/index.ts";

export interface IAuthLoginRequest {
  username: string;
  password: string;
}
export interface IAuthRegisterRequest {
  username: string;
  password: string;
}
export interface IAuthLoginResponse {
  token: string;
}
export interface IAuthRegisterResponse {
  username: string;
}
// 返回的Promise 对象中的数据是baseResponse
/*
*  interface baseResponse<T> {
    code: number
    data: T
    msg: string
}
T的类型为IAuthLoginResponse,也就是token
* */
export function authLoginApi(
  data: IAuthLoginRequest
): Promise<baseResponse<IAuthLoginResponse>> {
  return useAxios.post("/api/auth/login", data);
}

export function authRegisterApi(
  data: IAuthRegisterRequest
): Promise<baseResponse<IAuthRegisterResponse>> {
  return useAxios.post("/api/auth/register", data);
}
