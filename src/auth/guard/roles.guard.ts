import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  // El reflector permite leer la Metadata
  constructor(private readonly reflector: Reflector) { };

  // Funcion que admite o prohibe el acceso
  canActivate(context: ExecutionContext): boolean{
    // Extraigo de la Metadata el rol que está permitido
    const role = this.reflector.getAllAndOverride<Role>(ROLE_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    // Si no hay un rol requerido, se le da acceso al usuario
    if (!role) return true;

    // Extraigo del Request el rol del usuario actual
    const { user } = context.switchToHttp().getRequest();

    return role === user.role;
  }
}
