import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { AbstractEntity } from "../app.entity";

@Entity({name: "gift_cards"})
export class GiftCard extends AbstractEntity {
  @PrimaryGeneratedColumn({name: "id",type: "bigint"})
  id: bigint;
  @Column({name: "code"})
  code: string;
  @Column({name: "value", type: "bigint"})
  value: bigint;
  @Column({name: "balance", type: "bigint"})
  balance: bigint;
  @Column({name: "order_id", type: "bigint"})
  orderId: bigint;
  @Column({name: "is_disabled"})
  isDisabled: boolean;
  @Column({name: "ends_at", type: "timestamp without time zone"})
  endsAt: Date;
}