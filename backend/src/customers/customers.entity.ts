import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')  // Refers to the 'customers' table in the database
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ length: 255 })
  customer_name: string;

  @Column({ length: 255 })
  contact_email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
