import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}
  create(createStudentDto: CreateStudentDto) {
    const student = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(student);
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `학생${id}`;
  }

  update(_id: number, _updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${_id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
