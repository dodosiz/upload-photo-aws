/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_ACCESS_KEY: string;
  readonly VITE_SECRET_ACCESS_KEY: string;
  readonly VITE_REGION: string;
  readonly VITE_BUCKET_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
