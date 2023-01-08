import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, Relation, OneToMany } from "typeorm";
import { AbstractEntity } from "../app.entity";

@Entity({name: "line_items"})
export class LineItem extends AbstractEntity {
  @PrimaryGeneratedColumn({name: "id",type: "bigint"})
  id: bigint;
  @Column({name: "cart_id", type: "bigint"})
  cartId: bigint;
  @ManyToOne(() => Cart, {lazy: true})
  @JoinColumn({name: "cart_id", referencedColumnName: "id"})
  cart: Relation<Cart>;
  @Column({name: "title"})
  title: string;
  @Column({name: "description", nullable: true})
  description: string;
  @Column({name: "thumbnail"})
  thumbnail: string;
  @Column({name: "unit_price", type: "bigint"})
  unitPrice: bigint;
  @Column({name: "variant_id", type: "bigint"})
  variantId: bigint; 
  @Column({name: "quantity"})
  quantity: number;
}

export enum CartType {
  DEFAULT = "default",
  SWAP = "swap",
  DRAFT_ORDER = "draft_order",
  PAYMENT_LINK = "payment_link",
  CLAIM = "claim",
}

@Entity({name: "carts"})
export class Cart extends AbstractEntity {
  @PrimaryGeneratedColumn({name: "id",type: "bigint"})
  id: bigint;
  @Column({name: "email", nullable: true})
  email: string;
  @Column({name: "shipping_address_id", nullable: true, type: "bigint"})
  shippingAdrressId: bigint;
  @Column({name: "type", type: "enum", enum: CartType, default: CartType.DEFAULT})
  type: CartType;
  @OneToMany(() => LineItem, (item) => item.cart, {lazy: true})
  items: LineItem[];
}
