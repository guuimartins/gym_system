import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {TrainerService} from "../trainer/trainer.service";
import {AccessTokenStrategy} from "./strategies/accessToken.strategy";
import {RefreshTokenStrategy} from "./strategies/refreshToken.strategy";
import {TrainerModule} from "../trainer/trainer.module";
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [TrainerModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy]
})
export class AuthModule {
}
