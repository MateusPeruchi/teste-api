import { Name } from '../../shared/domain/name';
import { UUID } from '../../shared/domain/uuid';

export class DocumentType {
  private id: UUID;
  private name: Name;
  private createdAt: Date;

  constructor(id: string, name: string, createdAt: Date) {
    this.id = new UUID(id);
    this.name = new Name(name);
    this.createdAt = createdAt;
  }

  static create(name: string): DocumentType {
    return new DocumentType(UUID.create().getValue(), name, new Date());
  }

  getDocumentTypeId() {
    return this.id.getValue();
  }

  getName() {
    return this.name.getValue();
  }

  getCreatedAt() {
    return this.createdAt;
  }
}
