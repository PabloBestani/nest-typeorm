import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { ActiveUserInterface } from "../interfaces/active-user.interface";


export const ActiveUser = createParamDecorator((data: null, ctx: ExecutionContext): ActiveUserInterface =>{
    const { user } = ctx.switchToHttp().getRequest();
    return user;
});