import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTalusRelation } from 'src/entities/user-talus-relation.entity';
import { Repository } from 'typeorm';
import { CreateUserTalusRelationDto } from './dto/create-user-talus-relation.dto';

@Injectable()
export class UserTalusRelationService {
  constructor(
    @InjectRepository(UserTalusRelation)
    private readonly userTalusRelationRepository: Repository<UserTalusRelation>
  ) {}

  async createUserTalusRelation(
    relationData: CreateUserTalusRelationDto
  ): Promise<UserTalusRelation> {
    const relation = this.userTalusRelationRepository.create(relationData);
    return this.userTalusRelationRepository.save(relation);
  }

  async findMostRecentRelationByUserId(
    userId: string
  ): Promise<UserTalusRelation | null> {
    return this.userTalusRelationRepository.findOne({
      where: { user: { userId: userId } },
      relations: ['talus'],
      order: { pairingDate: 'DESC' }
    });
  }

  async getAllRelationsByUserId(userId: string): Promise<UserTalusRelation[]> {
    return this.userTalusRelationRepository.find({
      where: { user: { userId: userId } },
      relations: ['talus'],
      order: { pairingDate: 'DESC' }
    });
  }
}
