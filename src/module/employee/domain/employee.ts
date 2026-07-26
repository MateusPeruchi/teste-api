import { Email } from './email';
import { Name } from '../../shared/domain/name';
import { UUID } from '../../shared/domain/uuid';

export class Employee {
  private id: UUID;
  private name: Name;
  private email: Email;
  private createdAt: Date;
  private deletedAt: Date | null;

  constructor(
    id: string,
    name: string,
    email: string,
    createdAt: Date,
    deletedAt: Date | null,
  ) {
    this.id = new UUID(id);
    this.name = new Name(name);
    this.email = new Email(email);
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }

  static create(name: string, email: string): Employee {
    return new Employee(
      UUID.create().getValue(),
      name,
      email,
      new Date(),
      null,
    );
  }

  delete(): void {
    this.deletedAt = new Date();
  }

  getEmployeeId() {
    return this.id.getValue();
  }

  getName() {
    return this.name.getValue();
  }

  getEmail() {
    return this.email.getValue();
  }

  getDeletedAt(): Date | null {
    return this.deletedAt;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getIsDeleted(): boolean {
    return this.deletedAt !== null;
  }
}
