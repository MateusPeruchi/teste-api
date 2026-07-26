export type ListDocumentSubmissionLatestOutput = {
  data: Array<{
    id: string;
    version: number;
    createdAt: Date;
    documentTypeName: string;
    employeeEmail: string;
    deletedAt: Date | null;
  }>;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
