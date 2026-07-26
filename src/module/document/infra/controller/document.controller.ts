import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UuidParamPipe } from '../../../shared/infra/pipe/uuid-param.pipe';
import { CreateDocumentInput } from './dto/document/create-document-input.dto';
import { CreateDocumentUseCase } from '../../application/use-case/document/create-document.use-case';
import { DeleteDocumentUseCase } from '../../application/use-case/document/delete-document.use-case';
import { GetDocumentPercentageSubmissionOutput } from './type/document/get-document-percentage-submission-output.type';
import { ListDocumentFrequentPendingOutput } from './type/document/list-document-frequent-pending-output.type';
import { ListDocumentSubmissionLatestOutput } from './type/document/list-document-submission-latest-output.type';
import { ListDocumentSubmissionLatestInput } from './dto/document/list-document-submission-latest-input.dto';
import { ListDocumentEmployeePendingOutput } from './type/document/list-document-employee-pending-output.type';
import { ListDocumentEmployeeLatestOutput } from './type/document/list-document-employee-latest-output.type';
import { ListDocumentEmployeeLatestInput } from './dto/document/list-document-employee-latest-input.dto';
import { ListDocumentEmployeePendingInput } from './dto/document/list-document-employee-pending-input.dto';
import { ListDocumentFrequentPendingUseCase } from '../../application/use-case/document/list-document-frequent-pending.use-case';
import { GetDocumentPercentageSubmissionUseCase } from '../../application/use-case/document/get-document-percentage-submission.use-case';
import { ListDocumentSubmissionLatestUseCase } from '../../application/use-case/document/list-document-submission-latest.use-case';
import { ListDocumentEmployeeLatestUseCase } from '../../application/use-case/document/list-document-employee-latest.use-case';
import { ListDocumentEmployeePendingUseCase } from '../../application/use-case/document/list-document-employee-pending.use-case';

@Controller('document')
export class DocumentController {
  constructor(
    private readonly createDocumentUseCase: CreateDocumentUseCase,
    private readonly listDocumentFrequentPendingUseCase: ListDocumentFrequentPendingUseCase,
    private readonly getDocumentPercentageSubmissionUseCase: GetDocumentPercentageSubmissionUseCase,
    private readonly listDocumentSubmissionLatestUseCase: ListDocumentSubmissionLatestUseCase,
    private readonly listDocumentEmployeeLatestUseCase: ListDocumentEmployeeLatestUseCase,
    private readonly listDocumentEmployeePendingUseCase: ListDocumentEmployeePendingUseCase,
    private readonly deleteDocumentUseCase: DeleteDocumentUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() input: CreateDocumentInput): Promise<{ id: string }> {
    return await this.createDocumentUseCase.execute(input);
  }

  @Get('/frequent/pending')
  @HttpCode(HttpStatus.OK)
  async listDocumentFrequentPending(): Promise<ListDocumentFrequentPendingOutput> {
    return await this.listDocumentFrequentPendingUseCase.execute();
  }

  @Get('/percentage/submission')
  @HttpCode(HttpStatus.OK)
  async getDocumentPercentageSubmission(): Promise<GetDocumentPercentageSubmissionOutput> {
    return await this.getDocumentPercentageSubmissionUseCase.execute();
  }

  @Get('/submission/latest/list')
  @HttpCode(HttpStatus.OK)
  async listDocumentSubmissionLatest(
    @Query() query: ListDocumentSubmissionLatestInput,
  ): Promise<ListDocumentSubmissionLatestOutput> {
    return await this.listDocumentSubmissionLatestUseCase.execute(query);
  }

  @Get('/employee/latest/list')
  @HttpCode(HttpStatus.OK)
  async listDocumentEmployeeLatest(
    @Query() query: ListDocumentEmployeeLatestInput,
  ): Promise<ListDocumentEmployeeLatestOutput> {
    return await this.listDocumentEmployeeLatestUseCase.execute(query);
  }

  @Get('/employee/pending/list')
  @HttpCode(HttpStatus.OK)
  async listDocumentEmployeePending(
    @Query() query: ListDocumentEmployeePendingInput,
  ): Promise<ListDocumentEmployeePendingOutput> {
    return await this.listDocumentEmployeePendingUseCase.execute(query);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', UuidParamPipe) id: string): Promise<void> {
    await this.deleteDocumentUseCase.execute({ id });
  }
}
