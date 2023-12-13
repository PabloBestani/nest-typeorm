import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'roles';
// Seteo en la Metadata el/los roles permitidos para una determinada ruta
export const Roles = (role: string) => SetMetadata(ROLES_KEY, role);