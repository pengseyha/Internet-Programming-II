import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CategoryService } from '../../category/category.service';
import { ProductService } from '../../product/product.service';
import { CreateProductInput } from '../inputs/create-product.input';
import { CategoryType } from '../types/category.type';
import { ProductType } from '../types/product.type';

@Resolver(() => ProductType)
export class ProductCodeFirstResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Query(() => [ProductType])
  products() {
    return this.productService.findAll();
  }

  @Query(() => ProductType, { nullable: true })
  product(@Args('id') id: number) {
    return this.productService.findOne(Number(id));
  }

  @Query(() => [ProductType])
  productsByCategory(@Args('categoryId') categoryId: number) {
    return this.productService.findByCategory(Number(categoryId));
  }

  @Mutation(() => ProductType)
  createProduct(@Args('input') input: CreateProductInput) {
    return this.productService.create({
      ...input,
      categoryId: Number(input.categoryId),
    });
  }

  @ResolveField(() => CategoryType, { nullable: true })
  category(@Parent() product: ProductType) {
    return this.categoryService.findOne(Number(product.categoryId));
  }
}
