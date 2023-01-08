import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { AbstractEntity } from "../app.entity";

export enum UserRole {
  ADMIN = "admin",
  CUSTOMER = "customer",
  ANONYMOUS = "anonymous"
}

@Entity({name: "users"})
export class User extends AbstractEntity {
  @AutoMap()
  @PrimaryGeneratedColumn({name: "id",type: "bigint"})
  id: bigint;
  @AutoMap()
  @Column({name: "email", nullable:true})
  email: string;
  @AutoMap()
  @Column({name: "first_name", nullable:true})
  firstName: string;
  @AutoMap()
  @Column({name: "last_name", nullable:true})
  lastName: string;
  @AutoMap()
  @Column({name: "username"})
  username: string;
  @Column({name: "password_hash"})
  passwordHash: string;
  @AutoMap()
  @Column({
    name: "role",
    type: "enum",
    enum: UserRole,
    default: UserRole.ANONYMOUS
  })
  role: UserRole;
}

@Entity({name: "user_login_sessions"})
export class UserLoginSession extends AbstractEntity {

  @PrimaryGeneratedColumn({name: "id",type: "bigint"})
  id: bigint;
  @Column({name: "uuid"})
  uuid: string;
  @Column({name: "user_id", type: "bigint"})
  userId: bigint;

}