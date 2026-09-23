import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class BasicAuthGuard implements CanActivate {

  canActivate(context: ExecutionContext,): boolean {

    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing',);
    }

    const [type, credentials] = authHeader.split(' ');

    if (type !== 'Basic') {
      throw new UnauthorizedException('Invalid auth type',);
    }

    const decoded = Buffer.from(credentials, 'base64').toString('utf8');

    const [username, password] = decoded.split(':');

    if (username !== process.env.AUTH_USERNAME || password !== process.env.AUTH_PASSWORD) {
      throw new UnauthorizedException('Invalid username or password',);
    }

    return true;
  }
}