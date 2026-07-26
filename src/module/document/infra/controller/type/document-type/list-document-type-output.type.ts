export type ListDocumentTypeOutput = {
  data: Array<{
    id: string;
    name: string;
    createdAt: Date;
  }>;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
