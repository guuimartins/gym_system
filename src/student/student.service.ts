import {Injectable} from '@nestjs/common';
import {Student} from "../types/interface/Student";
import {students} from "../types/mock/students";

@Injectable()
export class StudentService {

    private studentList: Student[];

    constructor() {
        this.studentList = students;
    }

    getStudentsList(): Student[] {
        return this.studentList;
    }

    getStudentById(id: string): Student {
        const student = this.studentList.find(student => student.id === id);
        if (!student) {
            throw new Error("Could not find the any student");
        }
        return student;
    }

}
