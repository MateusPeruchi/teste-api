export type ListEmployeeOutput = {
  data: Array<{
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    deletedAt: Date | null;
  }>;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
