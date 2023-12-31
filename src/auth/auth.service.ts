import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
        ) { }

    async register({ name, email, password, role }: RegisterDto) {
        const user = await this.usersService.findOneByEmail(email);
        if (user) throw new BadRequestException(`Email ${email} is not available.`);
        return await this.usersService.create({
            name,
            email,
            password: await bcryptjs.hash(password, 10),
            role
        });
    }

    async login({ email, password }: LoginDto) {
        // Chequeo que exista un usuario con ese email
        const user = await this.usersService.findByEmailWithPassword(email);
        if (!user) throw new UnauthorizedException("Invalid credentials.");

        // Chequeo que la password sea la correcta
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException("Invalid credentials.");

        // Genero un token nuevo para el usuario
        // const secret = new ConfigService().get<string>('JWT_SECRET');
        const payload: ActiveUserInterface = { email, role: user.role }
        const token = await this.jwtService.signAsync(payload);
        return {
            token,
            email
        };
    }

    async profile(email: string, role: string) {
        return await this.usersService.findOneByEmail(email);
    }

}
