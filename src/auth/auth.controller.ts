import { 
    Body,
    Controller, 
    Post,
    Get,
    Req     // Puedo importar el @Request de forma abreviada para que no choque con el de Express
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { Auth } from './decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';

// Esto se puede extraer a un archivo interfaces
interface RequestWithUser extends Request {
    user: {
        email: string,
        role: string
    }
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register( @Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @Auth(Role.ADMIN)
    async profile(@Req() { user }: RequestWithUser) {
        return await this.authService.profile(user.email, user.role);
    }

}
