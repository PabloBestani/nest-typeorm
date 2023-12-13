import { 
    Body,
    Controller, 
    Post,
    Get
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';


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
    @Auth(Role.USER)
    async profile(@ActiveUser() user: ActiveUserInterface) {
        return await this.authService.profile(user.email, user.role);
    }

}
