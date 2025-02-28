export interface Config {
  urlApi: string;
  urlAiApi: string;
  profile: Record<string, unknown>;
  googleTagManagerID: string | null;
  efoURL: string;
  downloadsURL: string;
  geneticsPortalUrl: string;
}

export type Environment = "development" | "production";
