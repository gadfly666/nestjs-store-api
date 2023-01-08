import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not,Repository } from 'typeorm';
import { Product, ProductStatus, ProductType, ProductOption, ProductVariant} from './product.entity';
import { ProductInput, ProductOptionInput, ProductVariantInput } from './product.input';
import { privateDecrypt } from 'crypto';
import { resourceLimits } from 'worker_threads';

@Injectable()
export class ProductService {

  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
    @InjectRepository(ProductOption)
    private productOptionRepository: Repository<ProductOption>,
    @InjectRepository(ProductVariant)
    private productVariantRepository: Repository<ProductVariant>,
  ) {}

  async list(): Promise<[Product[], Number]> {
    return [await this.productRepository.find(), await this.productRepository.count()];
  }

  async listVariants(id: bigint): Promise<[ProductVariant[], Number]> {
    return [
      await this.productVariantRepository.find({
        where: {
          "productId": id,
        }
      }), 
      await this.productVariantRepository.count({
        where: {
          "productId": id
        }
      })
    ];
  }

}
