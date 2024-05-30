/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXTENSION_NAMESPACE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
