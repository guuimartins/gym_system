import {Injectable} from '@nestjs/common';
import {Trainer} from "../types/interface/Trainer";
import {trainers} from "../types/mock/trainers";

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
}
