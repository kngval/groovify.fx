// src/types/express-session.d.ts
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    user: {
      id: string;
      email: string;
      display_name: string;
      accessToken: string;
    };
  }
}
