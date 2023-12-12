import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class BreedsService {

  constructor(
    @InjectRepository(Breed)
    private readonly BreedRepository: Repository<Breed>
  ) {}

  async create(createBreedDto: CreateBreedDto) {
    const newBreed = this.BreedRepository.create({
      id: v4(),
      ...createBreedDto
    });
    return await this.BreedRepository.save(newBreed);
  }

  async findAll() {
    return await this.BreedRepository.find();
  }

  async findOne(id: string) {
    return await this.BreedRepository.findOneBy({id});
  }

  async update(id: string, updateBreedDto: UpdateBreedDto) {
    return await this.BreedRepository.update({id}, updateBreedDto);
  }

  async remove(id: string) {
    return await this.BreedRepository.softDelete({id});
  }
}
