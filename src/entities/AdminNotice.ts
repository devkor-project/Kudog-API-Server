/* eslint-disable indent */
/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('AdminNotice_adminNoticeId_uindex', ['adminNoticeId'], { unique: true })
@Entity('AdminNotice', { schema: 'kudog' })
class AdminNotice extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'adminNoticeId' })
  adminNoticeId: number;

  @Column('varchar', { name: 'title', length: 200 })
  title: string;

  @Column('longtext', { name: 'content' })
  content: string;

  @Column('varchar', { name: 'writer', length: 50, default: () => "'관리자'" })
  writer: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;
}

export default AdminNotice;
