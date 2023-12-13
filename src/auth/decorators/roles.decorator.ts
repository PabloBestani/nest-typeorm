import { SetMetadata } from "@nestjs/common";

// Seteo en la Metadata el/los roles permitidos para una determinada ruta
export const Roles = (role: string) => SetMetadata('roles', role);