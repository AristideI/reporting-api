import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const currentUser = await this.findOne(id);
    if (!currentUser) {
      throw new Error('user not found');
    }
    Object.assign(currentUser, attrs);
    return this.repo.save(currentUser);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new Error('user with that id not found');
    return this.repo.remove(user);
  }
}
