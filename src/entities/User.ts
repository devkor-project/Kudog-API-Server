import {
  BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import CategoryPerUser from '@/entities/CategoryPerUser';

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
    status: string;

  @Column('text', { name: 'password' })
    password: string;

  @Column('text', { name: 'refreshToken', nullable: true })
    refreshToken: string | null;

  @Column('number', { name: 'studentID', unique: true })
    studentID: number;

  @Column('number', { name: 'grade' })
    grade: number;

  // TODO : add reference for major? 단과대? enum ?
  @Column('text', { name: 'major' })
    major: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @OneToMany(() => CategoryPerUser, (categoryPerUser) => categoryPerUser.user)
    categoryPerUsers: CategoryPerUser[];
}

export default User;
