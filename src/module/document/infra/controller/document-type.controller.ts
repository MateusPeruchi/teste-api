import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { CreateDocumentTypeInput } from './dto/document-type/create-document-type-input.dto';
import { ListDocumentTypeInput } from './dto/document-type/list-document-type-input.dto';
import { ListDocumentTypeOutput } from './type/document-type/list-document-type-output.type';
import { CreateDocumentTypeUseCase } from '../../application/use-case/document-type/create-document-type.use-case';
import { ListDocumentTypeUseCase } from '../../application/use-case/document-type/list-document-type.use-case';

@Controller('document-type')
export class DocumentTypeController {
  constructor(
    private readonly createDocumentTypeUseCase: CreateDocumentTypeUseCase,
    private readonly listDocumentTypeUseCase: ListDocumentTypeUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() input: CreateDocumentTypeInput,
  ): Promise<{ id: string }> {
    return await this.createDocumentTypeUseCase.execute(input);
  }

  @Get('/list')
  @HttpCode(HttpStatus.OK)
  async listDocumentType(
    @Query() query: ListDocumentTypeInput,
  ): Promise<ListDocumentTypeOutput> {
    return await this.listDocumentTypeUseCase.execute(query);
  }
}
