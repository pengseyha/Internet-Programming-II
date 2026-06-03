import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CategoryModule } from './category/category.module';
import { Receipt } from './database/entities/receipts.entity';
import { ShopGraphqlModule } from './graphql/graphql.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
import { ProductModule } from './product/product.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { Task } from './tasks/task.entity';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'todo.sqlite',
      autoLoadEntities: true,
      entities: [User, Task, Receipt],
      synchronize: true,
    }),
    UsersModule,
    TasksModule,
    ReceiptsModule,
    NotificationsModule,
    OrdersModule,
    CategoryModule,
    ProductModule,
    ShopGraphqlModule,
  ],
})
export class AppModule {}
