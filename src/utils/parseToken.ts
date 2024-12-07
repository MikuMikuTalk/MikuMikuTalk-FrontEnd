export interface tokenPayload {
    exp: number
    nickname: string
    role: number
    userID: number
}


export function parseToken(token: string): tokenPayload {
    let payload = token.split(".")[1]
    return JSON.parse(decodeURIComponent(escape(window.atob(payload.replace(/-/g, "+").replace(/_/g, "/")))))
}