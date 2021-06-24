// eslint-disable-next-line @typescript-eslint/no-unused-vars
import session from 'express-session';

declare module 'express-session' {
  export interface Session {
    user: { name: string; id: string };
  }
}
