import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { AbstractEntity } from "../app.entity";

@Entity({name: "discounts"})
export class Discount extends AbstractEntity {
  @PrimaryGeneratedColumn({name: "id",type: "bigint"})
  id: bigint;
  @Column({name: "code"})
  code: string;
  @Column({name: "is_dynamic"})
  isDynamic: boolean;
  @Column({name: "rule_id", type: "bigint"})
  ruleId: bigint;
  @Column({name: "is_disabled"})
  isDisabled: boolean;
  @Column({name: "parent_discount_id", type: "bigint"})
  parentDiscountId: bigint;
  @Column({name: "starts_at"})
  startsAt: Date;
  @Column({name: "ends_at"})
  endsAt: string;
  @Column({name: "usage_limit"})
  usageLimit: string;
  @Column({name: "usage_count"})
  usageCount: string;
  @Column({name: "valid_duration"})
  validDuration: string;
}