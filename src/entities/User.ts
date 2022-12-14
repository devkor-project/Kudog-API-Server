/* eslint-disable import/no-cycle */
/* eslint-disable indent */
import {
  BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import CategoryPerUser from '@/entities/CategoryPerUser';
import Scrap from '@/entities/Scrap';

@Index('User_email_uindex', ['email'], { unique: true })
@Index('User_userId_uindex', ['userId'], { unique: true })
@Entity('User', { schema: 'kudog' })
class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'userId' })
  userId: number;

  @Column('varchar', { name: 'email', unique: true, length: 100 })
  email: string;

  @Column('varchar', { name: 'receiveEmail', unique: false, length: 100 })
  receiveEmail: string;

  @Column('varchar', { name: 'status', length: 1, default: () => "'Y'" })
  status: 'Y' | 'N';

  @Column('text', { name: 'password' })
  password: string;

  @Column('text', { name: 'refreshToken', nullable: true })
  refreshToken: string | null;

  @Column('varchar', { name: 'name', unique: false, length: 50 })
  name: string;

  @Column('int', { name: 'studentID' })
  studentID: number;

  @Column('int', { name: 'grade' })
  grade: number;

  // TODO : add reference for major? 단과대? enum ?
  @Column('text', { name: 'major' })
  major: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @OneToMany(() => CategoryPerUser, (categoryPerUser) => categoryPerUser.user)
  categoryPerUsers: CategoryPerUser[];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @OneToMany(() => Scrap, (scrap) => scrap.user)
  scraps: Scrap[];
}

export default User;
