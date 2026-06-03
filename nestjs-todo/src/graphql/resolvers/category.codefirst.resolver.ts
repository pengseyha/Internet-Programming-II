import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from '../../category/category.service';
import { CategoryType } from '../types/category.type';

@Resolver(() => CategoryType)
export class CategoryCodeFirstResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [CategoryType])
  categories() {
    return this.categoryService.findAll();
  }

  @Mutation(() => CategoryType)
  createCategory(@Args('name') name: string) {
    return this.categoryService.create({ name });
  }
}
