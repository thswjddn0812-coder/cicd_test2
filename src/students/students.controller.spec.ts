import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';

describe('StudentsController', () => {
  let controller: StudentsController;
  let mockRepo: {
    findOne: jest.Mock;
  };
  beforeEach(async () => {
    mockRepo = {
      findOne: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(Student),
          useValue: mockRepo,
        },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it('학생 findOne get', () => {
    expect(controller.findOne('10')).toBe('학생10');
  });
});
