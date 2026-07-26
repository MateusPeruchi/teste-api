import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DocumentTypeModel } from './infra/repository/model/document-type.model';
import { RequirementModel } from './infra/repository/model/requirement.model';
import { DocumentModel } from './infra/repository/model/document.model';
import { DocumentTypeController } from './infra/controller/document-type.controller';
import { RequirementController } from './infra/controller/requirement.controller';
import { DocumentController } from './infra/controller/document.controller';
import { DocumentTypeRepository } from './infra/repository/document-type.repository';
import { DocumentRepository } from './infra/repository/document.repository';
import { RequirementRepository } from './infra/repository/requirement.repository';
import { EmployeeGateway } from './infra/gateway/employee.gateway';
import { StorageGateway } from './infra/gateway/storage.gateway';
import { CreateRequirementUseCase } from './application/use-case/requirement/create-requirement.use-case';
import { DeleteRequirementUseCase } from './application/use-case/requirement/delete-requirement.use-case';
import { CreateDocumentUseCase } from './application/use-case/document/create-document.use-case';
import { DeleteDocumentUseCase } from './application/use-case/document/delete-document.use-case';
import { ListDocumentTypePaginatedQuery } from './infra/query/document-type/list-document-type-paginated.query';
import { GetDocumentPercentageSubmissionQuery } from './infra/query/document/get-document-percentage-submission.query';
import { ListDocumentFrequentPendingQuery } from './infra/query/document/list-document-frequent-pending.query';
import { ListDocumentSubmissionLatestPaginatedQuery } from './infra/query/document/list-document-submission-latest-paginated.query';
import { ListDocumentEmployeePendingPaginatedQuery } from './infra/query/document/list-document-employee-pending-paginated.query';
import { ListRequirementEmployeePaginatedQuery } from './infra/query/requirement/list-requirement-employee-paginated.query';
import { ListRequirementEmployeeUseCase } from './application/use-case/requirement/list-requirement-employee.use-case';
import { CreateDocumentTypeUseCase } from './application/use-case/document-type/create-document-type.use-case';
import { ListDocumentTypeUseCase } from './application/use-case/document-type/list-document-type.use-case';
import { ListDocumentFrequentPendingUseCase } from './application/use-case/document/list-document-frequent-pending.use-case';
import { ListDocumentEmployeePendingUseCase } from './application/use-case/document/list-document-employee-pending.use-case';
import { GetDocumentPercentageSubmissionUseCase } from './application/use-case/document/get-document-percentage-submission.use-case';
import { ListDocumentSubmissionLatestUseCase } from './application/use-case/document/list-document-submission-latest.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocumentTypeModel,
      RequirementModel,
      DocumentModel,
    ]),
  ],
  controllers: [
    DocumentTypeController,
    RequirementController,
    DocumentController,
  ],
  providers: [
    CreateDocumentTypeUseCase,
    ListDocumentTypeUseCase,
    DocumentTypeRepository,
    CreateRequirementUseCase,
    ListRequirementEmployeeUseCase,
    DeleteRequirementUseCase,
    RequirementRepository,
    CreateDocumentUseCase,
    DeleteDocumentUseCase,
    ListDocumentFrequentPendingUseCase,
    ListDocumentEmployeePendingUseCase,
    GetDocumentPercentageSubmissionUseCase,
    ListDocumentSubmissionLatestUseCase,
    DocumentRepository,
    {
      provide: ListDocumentTypePaginatedQuery,
      useFactory: (dataSource: DataSource) =>
        new ListDocumentTypePaginatedQuery(dataSource),
      inject: [DataSource],
    },
    {
      provide: ListRequirementEmployeePaginatedQuery,
      useFactory: (dataSource: DataSource) =>
        new ListRequirementEmployeePaginatedQuery(dataSource),
      inject: [DataSource],
    },
    {
      provide: ListDocumentFrequentPendingQuery,
      useFactory: (dataSource: DataSource) =>
        new ListDocumentFrequentPendingQuery(dataSource),
      inject: [DataSource],
    },
    {
      provide: ListDocumentEmployeePendingPaginatedQuery,
      useFactory: (dataSource: DataSource) =>
        new ListDocumentEmployeePendingPaginatedQuery(dataSource),
      inject: [DataSource],
    },
    {
      provide: GetDocumentPercentageSubmissionQuery,
      useFactory: (dataSource: DataSource) =>
        new GetDocumentPercentageSubmissionQuery(dataSource),
      inject: [DataSource],
    },
    {
      provide: ListDocumentSubmissionLatestPaginatedQuery,
      useFactory: (dataSource: DataSource) =>
        new ListDocumentSubmissionLatestPaginatedQuery(dataSource),
      inject: [DataSource],
    },
    EmployeeGateway,
    StorageGateway,
  ],
})
export class DocumentModule {}
