export interface ITokenPayload {
    userID: number
    nickname: string
    role: number
    exp: number
    jti: string
}

export function parseToken(token: string): ITokenPayload {
    let payload = token.split(".")[1]
    return JSON.parse(decodeURIComponent(encodeURI(window.atob(payload.replace(/-/g, "+").replace(/_/g, "/")))))
}