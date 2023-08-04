import {Injectable} from '@nestjs/common';
import {Trainer} from "../types/interface/Trainer";
import {trainers} from "../types/mock/trainers";
import Any = jasmine.Any;
import {CreateUserDto} from "../auth/auth.controller";

@Injectable()
export class TrainerService {

    private trainerList: Trainer[];

    constructor() {
        this.trainerList = trainers;
    }

    getTrainersList(): Trainer[] {
        return this.trainerList;
    }

    getTrainerById(id: string): Trainer {
        const trainer = this.trainerList.find(trainer => trainer.id === id);
        if (!trainer) {
            throw new Error("Could not find the any trainer");
        }
        return trainer;
    }

    createTrainer(createUser: CreateUserDto): Trainer {
        const trainer = this.trainerList.find(trainer => trainer.email === createUser.email);
        if (!trainer) {
            throw new Error("Could not find the any trainer");
        }
        return trainer;
    }

    updateTrainer(id: string, newTrainer: Trainer): Trainer {
        const trainer = this.trainerList.find(trainer => trainer.id === id);
        if (!trainer) {
            throw new Error("Could not find the any trainer");
        }
        return trainer;
    }
}
