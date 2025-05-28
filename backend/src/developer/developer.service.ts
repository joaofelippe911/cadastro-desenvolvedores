import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from './developer.entity';
import { Repository } from 'typeorm';
import { CreateDeveloperDto } from './dtos/create-developer.dto';
import { Level } from 'src/level/level.entity';
import { UpdateDeveloperDto } from './dtos/update-developer.dto';
import { PaginationQueryDto } from './dtos/pagination-query.dto';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectRepository(Developer)
    private developerRepository: Repository<Developer>,
    @InjectRepository(Level)
    private levelRepository: Repository<Level>,
  ) { }

  async create(data: CreateDeveloperDto) {
    const { nivel_id, ...rest } = data;

    const nivel = await this.levelRepository.findOne({
      where: { id: nivel_id },
    });

    if (!nivel) {
      throw new NotFoundException(`Nível com id ${nivel_id} não encontrado`);
    }

    const dev = this.developerRepository.create({
      ...rest,
      nivel,
    });

    return this.developerRepository.save(dev);
  }

  async findAll(query: PaginationQueryDto) {
    const { page = 1 } = query;

    const pageNumber = Number(page);

    const LIMIT = 10;

    const [developers, total] = await this.developerRepository.findAndCount({
      relations: ['nivel'],
      skip: (pageNumber - 1) * LIMIT,
      take: LIMIT,
      order: { id: 'ASC' },
    });

    const data = developers.map((developer) => {
      const idade = this.calculateAge(developer.data_nascimento);
  
      return {
        ...developer,
        idade,
      };
    });

    return {
      data,
      meta: {
        total,
        per_page: LIMIT,
        current_page: pageNumber,
        last_page: Math.ceil(total / LIMIT) || 1,
      },
    };
  }

  async findOne(id: number) {
    const developer = await this.developerRepository.findOne({
      where: { id },
      relations: ['nivel'],
    });

    if (!developer) {
      throw new NotFoundException(`Desenvolvedor com o id ${id} não encontrado`);
    }

    const idade = this.calculateAge(developer.data_nascimento);

    return {
      id: developer.id,
      nome: developer.nome,
      sexo: developer.sexo,
      data_nascimento: developer.data_nascimento,
      idade,
      hobby: developer.hobby,
      nivel: developer.nivel,
    };
  }

  async update(id: number, updateDto: UpdateDeveloperDto): Promise<Developer> {
    const developer = await this.developerRepository.findOne({ where: { id } });
    if (!developer) {
      throw new NotFoundException(`Desenvolvedor com id ${id} não encontrado`);
    }

    if (updateDto.nivel_id) {
      const nivel = await this.levelRepository.findOne({
        where: { id: updateDto.nivel_id },
      });
      if (!nivel) {
        throw new NotFoundException(`Nível com id ${updateDto.nivel_id} não encontrado`);
      }
      developer.nivel = nivel;
    }

    Object.assign(developer, updateDto);

    return this.developerRepository.save(developer);
  }

  async remove(id: number): Promise<void> {
    const developer = await this.developerRepository.findOne({ where: { id } });
    if (!developer) {
      throw new NotFoundException(`Desenvolvedor com id ${id} não encontrado`);
    }

    await this.developerRepository.remove(developer);
  }

  private calculateAge(dateString: string): number {
    const today = new Date();

    const birthDate = new Date(dateString);

    let age = today.getFullYear() - birthDate.getFullYear();

    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}
