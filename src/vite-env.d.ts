/// <reference types="vite/client" />

// o .env e' texto; sem esta interface, import.meta.env.VITE_API_URL e' `any`. Com ela, e' string.
interface ImportMetaEnv {
  readonly VITE_API_URL: string
}
