export type ListRequirementEmployeeOutput = {
  data: Array<{
    requirementId: string;
    name: string;
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
