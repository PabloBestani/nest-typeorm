import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
        ) { }

    async register({ name, email, password }: RegisterDto) {
        const user = await this.usersService.findOneByEmail(email);
        if (user) throw new BadRequestException(`Email ${email} is not available.`);
        return await this.usersService.create({
            name,
            email,
            password: await bcryptjs.hash(password, 10)
        });
    }

    async login({ email, password }: LoginDto) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) throw new UnauthorizedException("Invalid credentials.");

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException("Invalid credentials.");

        const secret = new ConfigService().get<string>('JWT_SECRET');
        const token = await this.jwtService.signAsync({ email }, { secret });
        return {
            token,
            email
        };
    }
}
