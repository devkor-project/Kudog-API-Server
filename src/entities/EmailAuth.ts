import {
  BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, DeleteDateColumn,
} from 'typeorm';

@Index('EmailAuth_email_uindex', ['email'], { unique: true })
@Index('EmailAuth_delete_uindex', ['expiresAt'])
@Entity('EmailAuth', { schema: 'kudog' })
class EmailAuth extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'uid' })
    uid: number;

  @Column('varchar', { name: 'email', unique: true, length: 100 })
    email: string;

  @Column('varchar', { name: 'authCode', length: 6 })
    authCode: string;

  @DeleteDateColumn({ name: 'expiresAt' })
    expiresAt: Date;
}

export default EmailAuth;
