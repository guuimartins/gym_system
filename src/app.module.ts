import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainerModule } from './trainer/trainer.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [TrainerModule, StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
