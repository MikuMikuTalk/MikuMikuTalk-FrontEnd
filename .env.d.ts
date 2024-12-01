/// <reference types="vite/client" />
export interface ImportMetaEnv {
    VITE_SERVER_URL: string
}
interface ImportMeta {
    readonly env: ImportMetaEnv;
}