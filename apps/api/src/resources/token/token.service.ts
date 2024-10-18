import { ClientSession } from '@paralect/node-mongo';

import { securityUtil } from 'utils';

import db from 'db';

import { DATABASE_DOCUMENTS } from 'app-constants';
import { tokenSchema } from 'schemas';
import { Token, TokenType } from 'types';

type TokenPayload = Pick<Token, 'userId'> & { tokenType: TokenType };

const tokenService = db.createService<Token>(DATABASE_DOCUMENTS.TOKENS, {
  schemaValidator: (obj) => tokenSchema.parseAsync(obj),
});

const createToken = async (userId: string, type: TokenType, isShadow?: boolean) => {
  const payload: TokenPayload = {
    tokenType: type,
    userId,
  };

  const value = await securityUtil.generateJwtToken<TokenPayload>(payload);

  return tokenService.insertOne({
    type,
    value,
    userId,
  });
};

const createAuthTokens = async ({ userId, isShadow }: { userId: string; isShadow?: boolean }) => {
  const accessTokenEntity = await createToken(userId, TokenType.ACCESS, isShadow);

  return {
    accessToken: accessTokenEntity.value,
  };
};

const findTokenByValue = async (token?: string | null): Promise<Token | null> => {
  if (!token) return null;

  const tokenPayload = await securityUtil.verifyJwtToken<TokenPayload>(token);

  if (!tokenPayload) return null;

  return tokenService.findOne({ value: token });
};

const removeAuthTokens = async (accessToken: string) => tokenService.deleteMany({ value: accessToken });

const invalidateUserTokens = async (userId: string, session?: ClientSession) =>
  tokenService.deleteMany({ userId }, {}, { session });

export default Object.assign(tokenService, {
  createAuthTokens,
  findTokenByValue,
  removeAuthTokens,
  invalidateUserTokens,
});
