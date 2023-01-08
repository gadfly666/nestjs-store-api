import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart, LineItem} from './cart.entity';
import { CartInput } from './cart.input';
import { User } from 'src/user/user.entity';
import { ProductVariant } from 'src/product/product.entity';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(LineItem)
    private lineItemRepository: Repository<LineItem>,
    @InjectRepository(ProductVariant)
    private productVariantRepository: Repository<ProductVariant>,

  ) {}

  async create(input: CartInput, user: User): Promise<Cart> {

    const {
      items
    } = input
    
    if (user) {
      // TODO find customer info
    }

    var cart = this.cartRepository.create();
    cart = await this.cartRepository.save(cart);

    await Promise.all(
      // TODO implement coppy variant id
      (items ?? []).map(async (option) => {
        const variant = await this.productVariantRepository.findOne({
          where: {
            "id": option.variant_id,
          },
          relations: ["prices"]
        });

        if (variant) {
          const {
            id,
            price,
            ...rest
          } = variant

          const res = this.lineItemRepository.create({
            ...rest,
            cartId: cart.id,
            variantId: id,
            unitPrice: price,
            quantity: option.quantity
          })
          await this.lineItemRepository.save(res)
        }
      })
    )

    return await this.retrieve(cart.id);
  }

  async retrieve(id: bigint): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: {
        "id": id,
      },
      relations: ["items"]
    });


    if (!cart) {
      throw new NotFoundException({
        "cartId": id
      });
    }

    return cart;
  }

}