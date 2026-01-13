import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// better-sqlite3가 설치되어 있는지 확인
let hasDatabase = false;
try {
  require.resolve('better-sqlite3');
  hasDatabase = true;
} catch {
  // better-sqlite3가 설치되지 않음 (로컬 개발 환경)
  console.warn(
    'better-sqlite3가 설치되지 않았습니다. 데이터베이스 기능이 비활성화됩니다.',
  );
  hasDatabase = false;
}

const typeOrmConfig = hasDatabase
  ? {
      type: 'better-sqlite3' as const,
      database: process.env.DATABASE_PATH || 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }
  : undefined;

@Module({
  imports: [
    ...(hasDatabase && typeOrmConfig
      ? [TypeOrmModule.forRoot(typeOrmConfig)]
      : []),
    ...(hasDatabase ? [StudentsModule] : []),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
