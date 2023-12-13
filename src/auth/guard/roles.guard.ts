import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  // El reflector permite leer la Metadata
  constructor(private readonly reflector: Reflector) { };

  // Funcion que admite o prohibe el acceso
  canActivate(context: ExecutionContext): boolean{
    // Extraigo de la Metadata el rol que está permitido
    const role = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass()
    ])


    // Extraigo del Request el rol del usuario actual
    const { user } = context.switchToHttp().getRequest();

    console.log("Allowed roles: ", role);
    console.log("Current user role: ", user.role);

    return true;
  }
}
