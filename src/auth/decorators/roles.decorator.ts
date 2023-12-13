import { SetMetadata } from "@nestjs/common";
import { Role } from "../../common/enums/role.enum";

export const ROLE_KEY = 'role';
// Seteo en la Metadata el/los roles permitidos para una determinada ruta
export const Roles = (role: Role) => SetMetadata(ROLE_KEY, role);