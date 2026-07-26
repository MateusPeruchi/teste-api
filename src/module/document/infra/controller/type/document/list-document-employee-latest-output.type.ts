export type ListDocumentEmployeeLatestOutput = {
  data: Array<{
    requirementId: string;
    documentTypeName: string;
    documentId: string;
    version: number;
    storageKey: string;
    sentAt: Date;
  }>;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
