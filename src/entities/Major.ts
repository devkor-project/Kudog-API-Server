/* eslint-disable indent */
/* eslint-disable import/no-cycle */
import {
  BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';

@Index('Major_majorId_uindex', ['majorId'], { unique: true })
@Entity('Major', { schema: 'kudog' })
class Major extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'majorId' })
  majorId: number;

  @Column('varchar', { name: 'majorName', length: 20, unique: true })
  majorName: string;
}
export default Major;
