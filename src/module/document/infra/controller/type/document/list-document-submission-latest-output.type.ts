export type ListDocumentSubmissionLatestOutput = {
  data: Array<{
    id: string;
    version: number;
    createdAt: Date;
    documentTypeName: string;
    employeeEmail: string;
  }>;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
