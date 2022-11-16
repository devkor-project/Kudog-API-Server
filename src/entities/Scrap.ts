/* eslint-disable indent */
/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '@/entities/User';
import Notice from '@/entities/Notice';

@Index('Scrap_Notice_noticeId_fk', ['noticeId'], {})
@Index('Scrap_scarpId_uindex', ['scarpId'], { unique: true })
@Index('Scrap_User_userId_fk', ['userId'], {})
@Entity('Scrap', { schema: 'kudog' })
class Scrap extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'scarpId' })
  scarpId: number;

  @Column('int', { name: 'userId' })
  userId: number;

  @Column('int', { name: 'noticeId' })
  noticeId: number;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => User, (user) => user.scraps, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
  user: User;

  @ManyToOne(() => Notice, (notice) => notice.scraps, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'noticeId', referencedColumnName: 'noticeId' }])
  notice: Notice;
}

export default Scrap;
