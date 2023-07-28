import {Controller, Get, HttpException, HttpStatus, Param} from '@nestjs/common';
import {StudentService} from "./student.service";

@Controller('student')
export class StudentController {

    constructor(private studentService: StudentService) {
    }

    @Get()
    getStudents() {
        try {
            return this.studentService.getStudentsList()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }

    }

    @Get(':studentId')
    getStudentById(@Param('studentId') trainerId) {
        try {
            return this.studentService.getStudentById(trainerId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
