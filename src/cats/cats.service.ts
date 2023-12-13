import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { Breed } from '../breeds/entities/breed.entity';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    // En vez de inyectar otro repositorio, seria mejor importar el Service de ese Modulo
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ) {}

  private validateOwnership(cat: Cat, user: ActiveUserInterface): UnauthorizedException | void {
    if (user.role !== Role.ADMIN || cat.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }

  async findBreed(id: string) {
    const breed = await this.breedRepository.findOneBy({id});
    if (breed) return breed;
    throw new NotFoundException();
  }

  async create(createCatDto: CreateCatDto, userEmail: string) {
    const breed = await this.findBreed(createCatDto.breed_id);

    // Quito el atributo breed_id porque ya no lo necesito
    const {breed_id, ...catData} = createCatDto;

    const newCat = this.catRepository.create({
      id: v4(),
      ...catData,
      breed,
      userEmail
    });
    return await this.catRepository.save(newCat);
  }

  async findAll({ role, email }: ActiveUserInterface) {
    if (role === Role.ADMIN) return await this.catRepository.find();

    return await this.catRepository.find({
      where: { userEmail: email }
    });
  }

  async findOne(id: string, user: ActiveUserInterface): Promise<Cat> {
    const cat = await this.catRepository.findOneBy({ id });
    if (!cat) throw new NotFoundException();
    this.validateOwnership(cat, user);
    return cat;
  }

  async update(id: string, updateCatDto: UpdateCatDto, user: ActiveUserInterface) {
    // Busco el gato en cuestion para validar permisos de edicion
    await this.findOne(id, user);
    // Extraigo el id de la raza, si es que me llego alguno
    const {breed_id, ...catData} = updateCatDto;

    // Si hay un dato de raza, actualizo la relacion
    catData['breed'] =  breed_id ? await this.findBreed(breed_id) : undefined;

    return await this.catRepository.update(id, catData);
  }

  async remove(id: string) {
    return await this.catRepository.softDelete({id});
  }
}
