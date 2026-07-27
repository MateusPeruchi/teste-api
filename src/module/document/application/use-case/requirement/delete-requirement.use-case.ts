import { Injectable, NotFoundException } from '@nestjs/common';
import { RequirementRepository } from '@/module/document/infra/repository/requirement.repository';

@Injectable()
export class DeleteRequirementUseCase {
  constructor(private readonly requirementRepository: RequirementRepository) {}

  async execute(input: input): Promise<void> {
    const requirement = await this.requirementRepository.getById(input.id);
    if (!requirement) {
      throw new NotFoundException('Exigência não encontrada.');
    }

    if (!requirement.getIsDeleted()) {
      requirement.delete();
      await this.requirementRepository.persist(requirement);
    }
  }
}

type input = {
  id: string;
};
