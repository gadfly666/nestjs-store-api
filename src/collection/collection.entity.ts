import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { AbstractEntity } from "../app.entity";

@Entity({name: "product_collections"})
export class Collection extends AbstractEntity {
  @AutoMap()
  @PrimaryGeneratedColumn({name: "id",type: "bigint"})
  id: bigint;
  @AutoMap()
  @Column({name: "title"})
  title: string;
  @AutoMap()
  @Column({name: "handle"})
  handle: string;
}