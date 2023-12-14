import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { };


  // Extrae el tipo de token y su valor
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }


  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extraigo el token del usuario actual
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      // Verifico si es un usuario autenticado
      // const secret = new ConfigService().get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(token);

      // Una vez autenticado, inyecto sus datos en el Request
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    };

    return true;
  }
}
