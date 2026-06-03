import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

export type CreateUserDto = Pick<User, 'username' | 'email' | 'password'>;
export type UpdateUserDto = Partial<CreateUserDto>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  create(userData: CreateUserDto) {
    const user = this.usersRepo.create(userData);
    return this.usersRepo.save(user);
  }

  findAll() {
    return this.usersRepo.find({ relations: ['tasks'] });
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOne({
      where: { id },
      relations: ['tasks'],
    });

    if (!user) {
      throw new NotFoundException(`User ${id} was not found`);
    }

    return user;
  }

  async update(id: number, updateData: UpdateUserDto) {
    await this.findOne(id);
    await this.usersRepo.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.usersRepo.delete(id);
    return { deleted: true };
  }
}
