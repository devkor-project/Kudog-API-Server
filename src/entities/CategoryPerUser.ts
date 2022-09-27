/* eslint-disable import/no-cycle */
import {
  Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import User from '@/entities/User';
import Category from '@/entities/Category';

@Index('CategoryPerUser_id_uindex', ['id'], { unique: true })
@Index('CategoryPerUser_Category_categoryId_fk', ['categoryId'], {})
@Index('CategoryPerUser_User_userId_fk', ['userId'], {})
@Entity('CategoryPerUser', { schema: 'kudog' })
class CategoryPerUser {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

  @Column('int', { name: 'userId', nullable: true })
    userId: number | null;

  @Column('int', { name: 'categoryId', nullable: true })
    categoryId: number | null;

  @ManyToOne(() => Category, (category) => category.categoryPerUsers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })

  @JoinColumn([{ name: 'categoryId', referencedColumnName: 'categoryId' }])
    category: Category;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => User, (user) => user.categoryPerUsers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
    user: User;
}

export default CategoryPerUser;
