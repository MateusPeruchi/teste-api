export type ListDocumentFrequentPendingOutput = {
  data: Array<{
    documentTypeId: string;
    documentTypeName: string;
    pendingCount: number;
  }>;
};
