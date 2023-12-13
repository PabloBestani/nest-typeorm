import { UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "../../common/enums/role.enum";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";

export function Auth(role: Role) {
    return applyDecorators(
        Roles(role), // Seteo el/los roles que tienen acceso a esta ruta
        UseGuards(AuthGuard, RolesGuard)  // Verifico que el usuario este autenticado y tenga el rol adecuado
    );
};