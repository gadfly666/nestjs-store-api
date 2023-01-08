import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { AbstractEntity } from "../app.entity";

@Entity({name: "discount_conditions"})
export class DiscountCondition extends AbstractEntity {
  @PrimaryGeneratedColumn({name: "id",type: "bigint"})
  id: bigint;
  @Column({name: "type"})
  type: string;
  @Column({name: "operator"})
  operator: string;
  @Column({name: "discount_rule_id", type: "bigint"})
  discountRuleId: bigint;
}