import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import {AuthService} from './auth.service';
import {IsEmail, IsString} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string

    @IsString()
    password: string
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }


    @Post('signup')
    signUp(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }

    @Post('signin')
    signIn(@Body() data: CreateUserDto) {
        return this.authService.signIn(data);
    }
}
