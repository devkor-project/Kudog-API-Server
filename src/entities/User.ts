import {
  BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import CategoryPerUser from './CategoryPerUser';

@Index('User_email_uindex', ['email'], { unique: true })
@Index('User_userId_uindex', ['userId'], { unique: true })
@Entity('User', { schema: 'kudog' })
class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'userId' })
    userId: number;

  @Column('varchar', { name: 'email', unique: true, length: 100 })
    email: string;

  @Column('varchar', { name: 'status', length: 1, default: () => "'Y'" })
    status: string;

  @Column('text', { name: 'password' })
    password: string;

  @Column('text', { name: 'refreshToken', nullable: true })
    refreshToken: string | null;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @OneToMany(() => CategoryPerUser, (categoryPerUser) => categoryPerUser.user)
    categoryPerUsers: CategoryPerUser[];
}

export default User;
