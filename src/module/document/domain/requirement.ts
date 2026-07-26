import { UUID } from '../../shared/domain/uuid';

export class Requirement {
  private id: UUID;
  private employeeId: UUID;
  private documentTypeId: UUID;
  private createdAt: Date;
  private deletedAt: Date | null;

  constructor(
    id: string,
    employeeId: string,
    documentTypeId: string,
    createdAt: Date,
    deletedAt: Date | null,
  ) {
    this.id = new UUID(id);
    this.employeeId = new UUID(employeeId);
    this.documentTypeId = new UUID(documentTypeId);
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }

  static create(employeeId: string, documentTypeId: string): Requirement {
    return new Requirement(
      UUID.create().getValue(),
      employeeId,
      documentTypeId,
      new Date(),
      null,
    );
  }

  delete(): void {
    this.deletedAt = new Date();
  }

  getRequirementId() {
    return this.id.getValue();
  }

  getEmployeeId() {
    return this.employeeId.getValue();
  }

  getDocumentTypeId() {
    return this.documentTypeId.getValue();
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
