import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from './level.entity';
import { UpdateLevelDto } from './dtos/update-level.dto';
import { Developer } from 'src/developer/developer.entity';
import { PaginationQueryDto } from './dtos/pagination-query.dto';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private levelRepository: Repository<Level>,
    @InjectRepository(Developer)
    private developerRepository: Repository<Developer>,
  ) { }

  create(nivel: string) {
    const createdLevel = this.levelRepository.create({ nivel });
    return this.levelRepository.save(createdLevel);
  }

  async findAll(query: PaginationQueryDto) {
    const { page } = query;
    const LIMIT = 10;

    const pageNumber = page ? Number(page) : undefined;

    const queryBuilder = this.levelRepository.createQueryBuilder('level')
      .leftJoin('level.devs', 'developer')
      .loadRelationCountAndMap('level.quantidade_devs_associados', 'level.devs')
      .orderBy('level.id', 'ASC');

    if (pageNumber) {
      queryBuilder.skip((pageNumber - 1) * LIMIT)
        .take(LIMIT)
    }

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      meta: {
        total,
        per_page: pageNumber ? LIMIT: total,
        current_page: pageNumber || 1,
        last_page: Math.ceil(total / LIMIT) || 1,
      },
    };
  }

  async findOne(id: number) {
    const level = await this.levelRepository.findOne({
      where: { id },
    });

    if (!level) {
      throw new NotFoundException(`Nível com o id ${id} não encontrado`);
    }

    return level;
  }

  async update(id: number, updateDto: UpdateLevelDto): Promise<Level> {
    const level = await this.levelRepository.findOne({ where: { id } });
    if (!level) {
      throw new NotFoundException(`Nível com id ${id} não encontrado`);
    }

    Object.assign(level, updateDto);

    return this.levelRepository.save(level);
  }

  async remove(id: number): Promise<void> {
    const level = await this.levelRepository.findOne({ where: { id } });
    if (!level) {
      throw new NotFoundException(`Nível com id ${id} não encontrado`);
    }

    const relatedDevelopers = await this.developerRepository.count({
      where: { nivel: { id } },
    });

    if (relatedDevelopers > 0) {
      throw new BadRequestException(`Não é possível remover o nível pois existem desenvolvedores associados`);
    }

    await this.levelRepository.remove(level);
  }

}
