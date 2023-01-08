import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany, Relation} from "typeorm";
import { AbstractEntity } from "../app.entity";

// TODO archive table instead of status
export enum ProductStatus {
  DRAFT = "draft",
  PROPOSED = "proposed",
  PUBLISHED = "published",
  REJECTED = "rejected",
  DELETED = "deleted",
}

@Entity({name: "product_options"})
export class ProductOption extends AbstractEntity {
  @PrimaryGeneratedColumn({name: "id", type: "bigint"})
  id: bigint;
  @Column({name: "product_id"})
  productId: bigint;
  @ManyToOne(() => Product, {lazy: true})
  @JoinColumn({name: "product_id", referencedColumnName: "id"})
  product: Relation<Product>;
  @Column({name: "title"})
  title: string;
  @Column({name: "metadata", nullable: true, type: "jsonb"})
  metadata: Record<string, any>;
}

@Entity({name: "product_types"})
export class ProductType extends AbstractEntity {
  @PrimaryGeneratedColumn({name: "id", type: "bigint"})
  id: bigint;
  @Column({name: "value"})
  value: string;
  @OneToOne(() => Product, (product) => product.type, {lazy: true})
  product: Relation<Product>;
}

@Entity({name: "products"})
export class Product extends AbstractEntity {
  @PrimaryGeneratedColumn({name: "id", type: "bigint"})
  id: bigint;
  @Column({name: "title", nullable: true})
  title: string;
  @Column({name: "subtitle", nullable: true})
  subtitle: string;
  @Column({name: "description", nullable: true})
  description: string;
  @Column({name: "thumbnail", nullable: true})
  thumbnail: string;
  @Column({name: "profile_id", nullable: true})
  // ID of the shipping profile that the product belong to
  profileId: string;
  @Column({name: "weight", type:'bigint'})
  weight: bigint;
  @Column({name: "height", type: 'bigint'})
  height: bigint;
  @Column({name: "width", type: 'bigint'})
  width: bigint;
  @Column({name: "hs_code", nullable: true})
  hsCode: string;
  @Column({name: "mid_code", nullable: true})
  midCode: string;
  @Column({name: "material", nullable: true})
  material: string;
  @Column({name: "collection_id", nullable: true})
  collectionId: string;
  @Column({name: "type_id", nullable: true})
  typeId: bigint;
  @OneToOne(() => ProductType, {lazy: true})
  @JoinColumn({name: "type_id", referencedColumnName: "id"})
  type: ProductType;
  @Column({
    name: "status",
    type: "enum",
    enum: ProductStatus,
    default: ProductStatus.DRAFT
  })
  status: ProductStatus;
  @Column({name: "images", array: true, type: "varchar", default: []})
  images: string[];
  @Column({name: "external_id", nullable: true})
  externalId: string;
  @OneToMany(() => ProductOption, (option) => option.product, {lazy: true})
  options: ProductOption[];
  @OneToMany(() => ProductVariant, (variant) => variant.product, {lazy: true})
  variants: ProductVariant[];
  @Column({name: "deleted_at", nullable: true})
  deletedAt: Date; 
}

@Entity({name: "product_variants"})
export class ProductVariant extends AbstractEntity {
  @PrimaryGeneratedColumn({name: "id", type: "bigint"})
  id: bigint;
  @Column({name: "title", nullable: true})
  title: string;
  @Column({name: "product_id", nullable: true})
  productId: bigint;
  @ManyToOne(() => Product, {lazy: true})
  @JoinColumn({name: "product_id"})
  product: Product;
  @OneToMany(() => MoneyAmount, (price) => price.variant, {lazy: true})
  prices: MoneyAmount[];
  @Column({name: "sku", nullable: true})
  sku: string;
  @Column({name: "barcode", nullable: true})
  barcode: string;
  @Column({name: "ean", nullable: true})
  ean: string;
  @Column({name: "upc", nullable: true})
  upc: string;
  @Column({name: "variant_rank", default: 0, type: 'bigint'})
  varianRank: bigint;
  @Column({name: "inventory_quantity", type: 'bigint'})
  inventoryQuantity: bigint;
  @Column({name: "hs_code", nullable: true})
  hsCode: string;
  @Column({name: "mid_code", nullable: true})
  midCode: string;
  @Column({name: "material", nullable: true})
  material: string;
  @Column({name: "weight", type: "bigint", nullable: true})
  weight: bigint;
  @Column({name: "height", type: "bigint", nullable: true})
  height: bigint;
  @Column({name: "length", type: "bigint", nullable: true})
  length: bigint;
  @Column({name: "width", type: "bigint", nullable: true})
  width: bigint;
  // TODO add metadata
  @Column({name: "deleted_at", nullable: true})
  deletedAt: Date;
}

@Entity({name: "money_amounts"})
export class MoneyAmount extends AbstractEntity {
  @PrimaryGeneratedColumn({name: "id", type: "bigint"})
  id: bigint;
  @Column({name: "amount", type: "bigint", nullable: true})
  amount: bigint;
  @Column({name: "variant_id", type: "bigint"})
  variantId: bigint;
  @ManyToOne(() => ProductVariant, (variant) => variant.prices, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "variant_id" })
  variant: Relation<ProductVariant>;
}
