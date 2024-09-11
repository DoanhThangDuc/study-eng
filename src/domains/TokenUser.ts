import * as jwt from "jsonwebtoken";

export type TokenUser = {
  readonly id: string;
  readonly emailAddressVerified: boolean;
  readonly administrator: boolean;
  readonly enabled: boolean;
};
export function generateAccessToken(
  tokenUser: TokenUser,
  jwtSecret: string,
  expiresIn: string,
): { accessToken: string } {
  const token = jwt.sign(tokenUser, jwtSecret, {
    algorithm: "HS256",
    header: {
      authorization: true,
    } as any,
    expiresIn,
  });

  return { accessToken: token };
}

export function generateUserRefreshToken(
  jwtSecret: string,
  sessionId: string,
  groupId?: string,
): string {
  const payload = {
    sessionId,
    groupId,
  };

  const token = jwt.sign(payload, jwtSecret, {
    algorithm: "HS256",
    header: {
      refresh: true,
      iat: Math.round(Date.now() / 1000),
    } as any,
  });

  return token;
}