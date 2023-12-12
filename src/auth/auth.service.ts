import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    async register(registerDto: RegisterDto) {
        const user = await this.usersService.findOneByEmail(registerDto.email);
        if (user) throw new BadRequestException(`Email ${registerDto.email} is not available.`);
        return await this.usersService.create(registerDto);
    }

    login() {
        return 'login';
    }
}
