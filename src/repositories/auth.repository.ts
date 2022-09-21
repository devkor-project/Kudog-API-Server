import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository()
export class UserRepository extends Repository<User> {
  findByEmail(email: string) {
    return this.createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();
  }
}
