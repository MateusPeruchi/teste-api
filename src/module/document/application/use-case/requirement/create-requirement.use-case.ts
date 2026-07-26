import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DocumentTypeRepository } from '../../../infra/repository/document-type.repository';
import { Requirement } from '../../../domain/requirement';
import { RequirementRepository } from '../../../infra/repository/requirement.repository';
import { EmployeeGateway } from '../../../infra/gateway/employee.gateway';

@Injectable()
export class CreateRequirementUseCase {
  constructor(
    private readonly employeeGateway: EmployeeGateway,
    private readonly documentTypeRepository: DocumentTypeRepository,
    private readonly requirementRepository: RequirementRepository,
  ) {}

  async execute(input: input): Promise<output> {
    const employee = await this.employeeGateway.getById(input.employeeId);
    if (!employee) {
      throw new NotFoundException('Colaborador não encontrado.');
    }

    const documentType = await this.documentTypeRepository.getById(
      input.documentTypeId,
    );
    if (!documentType) {
      throw new NotFoundException('Tipo de documento não encontrado.');
    }

    const requirementAlreadyExists =
      await this.requirementRepository.existsByEmployeeAndDocumentType({
        employeeId: employee.id,
        documentTypeId: documentType.getDocumentTypeId(),
      });
    if (requirementAlreadyExists) {
      throw new ConflictException(
        'Já existe uma exigência deste tipo de documento para o colaborador.',
      );
    }

    const requirement = Requirement.create(
      input.employeeId,
      input.documentTypeId,
    );
    await this.requirementRepository.persist(requirement);
    return {
      id: requirement.getRequirementId(),
    };
  }
}

type input = {
  employeeId: string;
  documentTypeId: string;
};

type output = {
  id: string;
};
