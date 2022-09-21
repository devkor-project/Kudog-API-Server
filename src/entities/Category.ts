import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CategoryPerUser } from "./CategoryPerUser";

@Index("Category_categoryId_uindex", ["categoryId"], { unique: true })
@Entity("Category", { schema: "kudog" })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "categoryId" })
  categoryId: number;

  @Column("varchar", { name: "categoryName", length: 30 })
  categoryName: string;

  @Column("varchar", { name: "status", length: 1, default: () => "'Y'" })
  status: string;

  @OneToMany(
    () => CategoryPerUser,
    (categoryPerUser) => categoryPerUser.category
  )
  categoryPerUsers: CategoryPerUser[];
}
