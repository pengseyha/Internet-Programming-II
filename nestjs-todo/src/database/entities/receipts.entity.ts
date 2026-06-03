import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn('uuid')
  receiptId: string;

  @Column({ type: 'datetime' })
  issuedAt: Date;

  @Column()
  name: string;

  @Column({ type: 'real' })
  price: number;
}
