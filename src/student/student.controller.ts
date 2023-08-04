import {Body, Controller, Get, HttpException, HttpStatus, Param, Post} from '@nestjs/common';
import {StudentService} from "./student.service";
import {IsEmail, IsNumber, IsPhoneNumber, IsString} from "class-validator";

export class StudentDTO {
    @IsString()
    name: string

    @IsPhoneNumber()
    phone: string

    @IsEmail()

    email: string

    @IsNumber()
    height: number;

    @IsNumber()
    weight: number;

    @IsNumber()
    dateOfBirth: number;
}

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

    @Post()
    addStudent(@Body() studentDTO: StudentDTO) {
        try {
            return this.studentService.addStudent()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }

    }
}
