import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/category/category.module';
import { ProductModule } from 'src/product/product.module';
import { CategoryCodeFirstResolver } from './resolvers/category.codefirst.resolver';
import { ProductCodeFirstResolver } from './resolvers/product.codefirst.resolver';

@Module({
  imports: [CategoryModule, ProductModule],
  providers: [CategoryCodeFirstResolver, ProductCodeFirstResolver],
})
export class ShopGraphqlModule {}
