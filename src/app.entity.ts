import { AutoMap } from "@automapper/classes";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class AbstractEntity {
  @AutoMap()
  @CreateDateColumn({name: "created_at", type: "timestamp without time zone"})
  createdAt: Date;
  @AutoMap()
  @UpdateDateColumn({name: "updated_at", type: "timestamp without time zone"})
  updatedAt: Date;
}