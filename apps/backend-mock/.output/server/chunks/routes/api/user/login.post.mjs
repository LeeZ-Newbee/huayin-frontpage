import { d as defineEventHandler, r as readBody, s as setResponseStatus, b as useResponseError, f as forbiddenResponse, a as useResponseSuccess } from '../../../nitro/nitro.mjs';
import { c as clearRefreshTokenCookie, s as setRefreshTokenCookie } from '../../../_/cookie-utils.mjs';
import { a as MOCK_USERS, g as generateAccessToken, b as generateRefreshToken } from '../../../_/jwt-utils.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'jsonwebtoken';

const login_post = defineEventHandler(async (event) => {
  const { password, name } = await readBody(event);
  if (!password || !name) {
    setResponseStatus(event, 400);
    return useResponseError(
      "BadRequestException",
      "name and password are required"
    );
  }
  const findUser = MOCK_USERS.find(
    (item) => item.name === name && item.password === password
  );
  if (!findUser) {
    clearRefreshTokenCookie(event);
    return forbiddenResponse(event, "name or password is incorrect.");
  }
  const accessToken = generateAccessToken(findUser);
  const refreshToken = generateRefreshToken(findUser);
  setRefreshTokenCookie(event, refreshToken);
  return useResponseSuccess({
    ...findUser,
    accessToken
  });
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
