import {BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {TrainerService} from "../trainer/trainer.service";
import {Trainer} from "../types/interface/Trainer";
import * as argon2 from 'argon2';
import {CreateUserDto} from "./auth.controller";


@Injectable()
export class AuthService {
    constructor(
        private trainerService: TrainerService,
        private jwtService: JwtService) {
    }

    async signUp(createUserDto: CreateUserDto): Promise<any> {
        // Check if user exists
        const userExists = false
        if (userExists) {
            throw new BadRequestException('User already exists');
        }

        // Hash password
        const hash = await this.hashData(createUserDto.password);
        const newUser = await this.trainerService.createTrainer({
            ...createUserDto,
            password: hash,
        });
        const tokens = await this.getTokens(newUser.id, newUser.email);
        await this.updateRefreshToken(newUser.id, tokens.refreshToken);
        return tokens;
    }

    async signIn(data: CreateUserDto) {
        // Check if user exists
        const user = await this.trainerService.getTrainerById(data.email);
        if (!user) {
            throw new BadRequestException('User does not exist');
        }
        const passwordMatches = await argon2.verify(user.password, data.password);
        if (!passwordMatches) {
            throw new BadRequestException('Password is incorrect');
        }
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    async logout(userId: string) {
        return this.trainerService.updateTrainer(userId, {refreshToken: null} as Trainer);
    }

    hashData(data: string) {
        return argon2.hash(data);
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.trainerService.updateTrainer(userId, {
            refreshToken: hashedRefreshToken,
        } as Trainer);
    }

    async getTokens(userId: string, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: "JWT_ACCESS_SECRET",
                    expiresIn: '1d',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: 'JWT_REFRESH_SECRET',
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshTokens(trainerId: string, refreshToken: string) {
        const user = await this.trainerService.getTrainerById(trainerId);
        if (!user || !user.refreshToken)
            throw new ForbiddenException('Access Denied');
        const refreshTokenMatches = await argon2.verify(
            user.refreshToken,
            refreshToken,
        );
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
}
