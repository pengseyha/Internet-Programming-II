import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

export interface CreateCategoryDto {
  name: string;
}

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category ${id} was not found`);
    }
    return category;
  }

  create(dto: CreateCategoryDto) {
    const category = this.categoryRepo.create({ name: dto.name });
    return this.categoryRepo.save(category);
  }
}
