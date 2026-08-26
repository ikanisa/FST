type ServerBindings = {
  DB?: D1Database;
  GOOGLE_CALENDAR_CLIENT_ID?: string;
  GOOGLE_CALENDAR_CLIENT_SECRET?: string;
  GOOGLE_CALENDAR_ID?: string;
  GOOGLE_CALENDAR_REFRESH_TOKEN?: string;
  GOOGLE_CALENDAR_TIMEZONE?: string;
  MT_GOOGLE_CALENDAR_ID?: string;
  MT_GOOGLE_CALENDAR_TIMEZONE?: string;
  MT_BOOKING_RECIPIENTS?: string;
  RW_GOOGLE_CALENDAR_ID?: string;
  RW_GOOGLE_CALENDAR_TIMEZONE?: string;
  RW_BOOKING_RECIPIENTS?: string;
};

declare global {
  var __FST_ENV__: Record<string, unknown> | undefined;
}

export function serverEnv(): ServerBindings {
  return (globalThis.__FST_ENV__ || {}) as ServerBindings;
}
