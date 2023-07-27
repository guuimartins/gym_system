import {Controller, Get, HttpException, HttpStatus, Param} from '@nestjs/common';
import {TrainerService} from "../trainer/trainer.service";

@Controller('trainer')
export class TrainerController {

    constructor(private trainerService: TrainerService) {
    }

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
