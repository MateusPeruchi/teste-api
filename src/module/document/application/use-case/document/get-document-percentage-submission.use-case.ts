import { Injectable } from '@nestjs/common';
import { GetDocumentPercentageSubmissionQuery } from '../../../infra/query/document/get-document-percentage-submission.query';

@Injectable()
export class GetDocumentPercentageSubmissionUseCase {
  constructor(
    private readonly getDocumentPercentageSubmissionQuery: GetDocumentPercentageSubmissionQuery,
  ) {}

  async execute(): Promise<output> {
    const { totalRequirements, submitted, pending } =
      await this.getDocumentPercentageSubmissionQuery.execute();

    return {
      totalRequirements,
      submitted,
      pending,
      submittedPercentage:
        totalRequirements === 0 ? 0 : (submitted / totalRequirements) * 100,
    };
  }
}

type output = {
  totalRequirements: number;
  submitted: number;
  pending: number;
  submittedPercentage: number;
};
