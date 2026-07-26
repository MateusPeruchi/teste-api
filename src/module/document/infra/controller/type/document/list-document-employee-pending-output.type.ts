export type ListDocumentEmployeePendingOutput = {
  data: Array<{
    requirementId: string;
    documentTypeId: string;
    documentTypeName: string;
    requiredSince: Date;
  }>;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
