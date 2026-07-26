import { UUID } from '../../shared/domain/uuid';

export class Document {
  private id: UUID;
  private requirementId: UUID;
  private storageKey: string;
  private version: number;
  private createdAt: Date;
  private deletedAt: Date | null;

  constructor(
    id: string,
    requirementId: string,
    storageKey: string,
    version: number,
    createdAt: Date,
    deletedAt: Date | null,
  ) {
    this.id = new UUID(id);
    this.requirementId = new UUID(requirementId);
    this.storageKey = storageKey;
    this.version = version;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }

  static create(requirementId: string, lastVersion: number): Document {
    const nextVersion = this.calculateNextVersion(lastVersion);
    const storageKey = this.buildStorageKeyPdf(requirementId, nextVersion);
    return new Document(
      UUID.create().getValue(),
      requirementId,
      storageKey,
      nextVersion,
      new Date(),
      null,
    );
  }

  private static buildStorageKeyPdf(
    requirementId: string,
    version: number,
  ): string {
    return `documents/${requirementId}/v${version}.pdf`;
  }

  private static calculateNextVersion(lastVersion: number): number {
    return lastVersion + 1;
  }

  delete(): void {
    this.deletedAt = new Date();
  }

  getDocumentId() {
    return this.id.getValue();
  }

  getRequirementId() {
    return this.requirementId.getValue();
  }

  getStorageKey() {
    return this.storageKey;
  }

  getVersion() {
    return this.version;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getDeletedAt() {
    return this.deletedAt;
  }

  getIsDeleted(): boolean {
    return this.deletedAt !== null;
  }
}
