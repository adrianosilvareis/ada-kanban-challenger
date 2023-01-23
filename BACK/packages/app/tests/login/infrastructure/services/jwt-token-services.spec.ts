import jwt, { JwtPayload } from 'jsonwebtoken';
import { faker } from '@faker-js/faker';

import { JWTTokenServices } from '@/login/infrastructure/services/jwt-token-services';
import { Auth } from '@/login/domain/entity/auth';

describe('JWTTokenServices', () => {
  beforeAll(() => {
    process.env.JWT_SECRET = 'TEST_SECRET';
  });

  it('should return a token when call generateToken', async () => {
    // given
    const service = new JWTTokenServices();
    const auth = new Auth(faker.internet.userName(), faker.internet.password());

    // when
    const token = await service.generateToken(auth);
    const decoded = jwt.verify(token, 'TEST_SECRET') as JwtPayload;

    // then
    expect(token).toBeTruthy();
    expect(decoded.data).toEqual(auth);
  });

  it('should not validate with wrong secret', async () => {
    // given
    const service = new JWTTokenServices();
    const auth = new Auth(faker.internet.userName(), faker.internet.password());

    // when
    const token = await service.generateToken(auth);

    // then
    expect(token).toBeTruthy();
    await expect(async () => {
      jwt.verify(token, 'WRONG_SECRET');
    }).rejects.toThrow();
  });

  it('should validate a correct token', async () => {
    // given
    const service = new JWTTokenServices();
    const auth = new Auth(faker.internet.userName(), faker.internet.password());
    const token = await service.generateToken(auth);

    // when
    const isValid = service.validateToken(token);

    // then
    expect(isValid).toBeTruthy();
  });

  it('should reject a invalid token', async () => {
    // given
    const service = new JWTTokenServices();
    const token = await jwt.sign({}, 'WRONG_SECRET');

    // when
    const isValid = await service.validateToken(token);

    // then
    expect(isValid).toBeFalsy();
  });
});
