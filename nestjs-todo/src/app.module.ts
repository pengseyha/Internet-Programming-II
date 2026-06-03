import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './database/entities/receipts.entity';
import { Task } from './tasks/task.entity';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { ReceiptsModule } from './receipts/receipts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'todo.sqlite',
      entities: [User, Task, Receipt],
      synchronize: true,
    }),
    UsersModule,
    TasksModule,
    ReceiptsModule,
  ],
})
export class AppModule {}
