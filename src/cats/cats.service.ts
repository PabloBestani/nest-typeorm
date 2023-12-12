import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ) {}

  async findBreed(id: string) {
    const breed = await this.breedRepository.findOneBy({id});
    if (breed) return breed;
    console.log(`No breed found with id ${id}`);
    return null;
  }

  async create(createCatDto: CreateCatDto) {
    const breed = await this.findBreed(createCatDto.breed_id);

    // Quito el atributo breed_id porque ya no lo necesito
    const {breed_id, ...catData} = createCatDto;

    const newCat = this.catRepository.create({
      id: v4(),
      ...catData,
      breed
    });
    return await this.catRepository.save(newCat);
  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: string) {
    return await this.catRepository.findOneBy({id});
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    if (updateCatDto.breed_id) {
      // Si se cambio el id del breed, hay que actualizar la relacion
      const breed = await this.findBreed(updateCatDto.breed_id);

      // Quito el atributo breed_id porque ya no lo necesito
      const {breed_id, ...catData} = updateCatDto;
      return await this.catRepository.update(id, {
        ...catData,
        breed
      });
    } 

    return await this.catRepository.update(id, updateCatDto);
  }

  async remove(id: string) {
    return await this.catRepository.softDelete({id});
  }
}
