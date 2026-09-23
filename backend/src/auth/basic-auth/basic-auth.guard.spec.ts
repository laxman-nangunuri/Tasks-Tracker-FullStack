import { BasicAuthGuard } from './basic-auth.guard.js';

describe('BasicAuthGuard', () => {
  it('should be defined', () => {
    expect(new BasicAuthGuard()).toBeDefined();
  });
});
