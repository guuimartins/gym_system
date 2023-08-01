import {Controller, Get, HttpException, HttpStatus, Param, UseGuards} from '@nestjs/common';
import {TrainerService} from "../trainer/trainer.service";
import {IsEmail, IsPhoneNumber, IsString, Length} from "class-validator";
import {AccessTokenGuard} from "../common/guards/accessToken.guard";
import {Roles} from "../auth/roles/roles.decorator";

export class TrainerDTO {
    @IsString()
    name: string

    @IsPhoneNumber()
    phone: string

    @Length(6, 6)
    @IsString()
    cref: string

    @IsEmail()
    email: String
}

@Controller('trainer')
export class TrainerController {

    constructor(private trainerService: TrainerService) {
    }


    @Roles('admin')
    @UseGuards(AccessTokenGuard)
    @Get()
    getTrainers() {
        try {
            return this.trainerService.getTrainersList()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }

    }

    @Get(':trainerId')
    getTrainerById(@Param('trainerId') trainerId) {
        try {
            return this.trainerService.getTrainerById(trainerId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
