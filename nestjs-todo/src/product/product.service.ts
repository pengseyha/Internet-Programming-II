import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

export interface CreateProductDto {
  name: string;
  price: number;
  categoryId: number;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private readonly categoryService: CategoryService,
  ) {}

  findAll() {
    return this.productRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product ${id} was not found`);
    }
    return product;
  }

  findByCategory(categoryId: number) {
    return this.productRepo.find({
      where: { categoryId },
      order: { id: 'ASC' },
    });
  }

  async create(dto: CreateProductDto) {
    await this.categoryService.findOne(Number(dto.categoryId));

    const product = this.productRepo.create({
      name: dto.name,
      price: Number(dto.price),
      categoryId: Number(dto.categoryId),
    });
    return this.productRepo.save(product);
  }
}
