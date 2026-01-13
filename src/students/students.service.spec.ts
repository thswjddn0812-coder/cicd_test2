import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import fc from 'fast-check';

describe('StudentsService', () => {
  let service: StudentsService;
  let mockRepo:any;
  //테스트하기 전의 세팅 작업업
  beforeEach(async () => {
    mockRepo={
      create: jest.fn(),
      save:jest.fn(),

    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {useValue:mockRepo,
          provide:getRepositoryToken(Student)
        }],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });
  it("학생 생성 테스트(create)",async()=>{
    const createDto={
      name:"이영철",
      email:"yongchul@naver.com",
      age:27,
    };
    mockRepo.create.mockReturnValue(createDto); //create 함수가 실행되면 createDto를 돌려주도록 설정
    mockRepo.save.mockResolvedValue({...createDto,id:1,isActive:true});// save 함수가 실행되면 promise 성공 케이스를 돌려줌

    const result = await service.create(createDto);
    expect(result).toEqual({...createDto,id:1,isActive:true});
    expect(mockRepo.create).toHaveBeenCalledWith(createDto);
  })
  it("학생 생성 테스트 페스트 체크 버전",async()=>{
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          name:fc.string({minLength:1,maxLength:50}),
          email:fc.emailAddress(),
          age:fc.integer({min:1,max:100}),
        }),
        async(Dto)=>{
          mockRepo.create.mockReturnValue(Dto);
          mockRepo.save.mockResolvedValue({...Dto,
            id:fc.integer({min:1,max:1000}),
            isActive:true
          });
          const result = await service.create(Dto);
          expect(result).toHaveProperty("id");
          expect(result).toHaveProperty("isActive");
          expect(result.name).toBe(Dto.name);
          expect(result.email).toBe(Dto.email);
          expect(result.age).toBe(Dto.age);
          expect(mockRepo.create).toHaveBeenCalledWith(Dto);
        }
      )
    )
  })
});












