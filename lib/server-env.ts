type ServerBindings = {
  GOOGLE_CALENDAR_CLIENT_ID?: string;
  GOOGLE_CALENDAR_CLIENT_SECRET?: string;
  GOOGLE_CALENDAR_ID?: string;
  GOOGLE_CALENDAR_REFRESH_TOKEN?: string;
  GOOGLE_CALENDAR_TIMEZONE?: string;
};

declare global {
  var __FST_ENV__: Record<string, unknown> | undefined;
}

export function serverEnv(): ServerBindings {
  return (globalThis.__FST_ENV__ || {}) as ServerBindings;
}
