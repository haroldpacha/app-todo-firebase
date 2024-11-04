/// <reference types="vite/client" />

interface Window {
  __TAURI__?: {
    invoke<T>(cmd: string, args?: unknown): Promise<T>;
  };
}