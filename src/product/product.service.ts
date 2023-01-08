import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not,Repository } from 'typeorm';
import { Product, ProductStatus, ProductType, ProductOption, ProductVariant, MoneyAmount } from './product.entity';
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
    @InjectRepository(MoneyAmount)
    private moneyAmountRepository: Repository<MoneyAmount>,
  ) {}

  async create(input: ProductInput): Promise<Product> {
    const {
      options,
      type,
      images,
      ...rest
    } = input

    let product = this.productRepository.create(rest);

    if (type) {
      let type_ = this.productTypeRepository.create({...type})
      type_ = await this.productTypeRepository.save(type_)
      product.typeId = type_.id
    }

    product = await this.productRepository.save(product);

    // TODO load produtions options to response
    await Promise.all(
      (options ?? []).map(async (option) => {
        const res = this.productOptionRepository.create({
          ...option,
          productId: product.id,
        })
        await this.productOptionRepository.save(res)
      })
    )

    // Cannot create product which is deleted
    if (product.status == ProductStatus.DELETED) {
      product.status = ProductStatus.DRAFT;
    } 

    return await this.retrieve(product.id);
  }

  async retrieve(id: bigint): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        "id": id,
        "status": Not(ProductStatus.DELETED)
      },
      relations: ["type", "options"]
    });


    if (!product) {
      throw new NotFoundException({
        "productId": id
      });
    }

    return product;
  }

  async update(id: bigint, input: ProductInput): Promise<Product> {
    let product = await this.productRepository.findOne({
      where: {
        "id": id,
        "status": Not(ProductStatus.DELETED)
      },
      relations: ["type", "options"]
    })

    if (!product) {
      throw new NotFoundException({
        "productId": id
      });
    }

    const {
      options,
      type,
      images,
      ...rest
    } = input

    for (const [key, value] of Object.entries(rest)) {
      if (value !== "undefined") {
        product[key] = value
      }
    }

    // Currently skipping update options
    product = await this.productRepository.save(product);
    return product;
  }
  

  async delete(id: bigint): Promise<void> {
    const product = await this.productRepository.findOne({
      where: {
        "id": id,
        "status": Not(ProductStatus.DELETED)
      }
    })

    if (product) {
      product.status = ProductStatus.DELETED;
      product.deletedAt = new Date();
      await this.productRepository.save(product);
    }

    // ?
    return Promise.resolve()
  }

  async addOption(productId: bigint, optionInput: ProductOptionInput): Promise<Product> {

    const product = await this.productRepository.findOne({
      where: {
        "id": productId
      },
      relations: ["options"]
    });

    if (!product) {
      throw new NotFoundException({
        "productId": productId
      });
    }

    if (product.options.find((o) => o.title !== optionInput.title)) {
      const option = this.productOptionRepository.create({...optionInput});
      await this.productOptionRepository.save(option);
    }
    
    return await this.retrieve(productId);

  }

  async updateOption(productId: bigint, optionId: bigint, optionInput: ProductOptionInput): Promise<Product> {

    let option = await this.productOptionRepository.findOne({
      where: {
        "id": optionId,
        "productId": productId
      },
      relations: ["product"]
    });

    if (!option) {
      throw new NotFoundException({
        productId: productId,
        optionId: optionId
      });
    }

    if (option.product.options.find((o) => (o.title !== optionInput.title))) {
      option.title = optionInput.title;
      option.metadata = optionInput.metadata;
      await this.productOptionRepository.save(option);
    }

    return await this.retrieve(productId);
  }

  async deleteOption(productId: bigint, optionId: bigint): Promise<void> {
    
    let option = await this.productOptionRepository.findOne({
      where: {
        "id": optionId,
        "productId": productId
      },
      relations: ["product"]
    });

    if (option) {
      await this.productOptionRepository.remove(option);
    }
    
    return Promise.resolve();
  }

  async createVariant(id: bigint, input: ProductVariantInput): Promise<ProductVariant> {
    const product = await this.productRepository.findOne({
      where: {
        "id": id 
      },
      relations: ["variants"]
    });

    if (!product) {
      throw new NotFoundException({
        "productId": id 
      });
    }

    const {prices, ...rest} = input;

    if (!rest.variantRank) {
      rest.variantRank = BigInt(product.variants.length);
    }

    let variant = this.productVariantRepository.create({...rest, productId: product.id})
    variant = await this.productVariantRepository.save(variant);

    if (prices) {
      for (let price of prices) {
        price = this.moneyAmountRepository.create({...price, variantId: variant.id})
        await this.moneyAmountRepository.save(price)
      }
    }

    return variant;
  }

  async updateVariant(productId: bigint, variantId: bigint, input: ProductVariantInput): Promise<ProductVariant> {
    let variant = await this.productVariantRepository.findOne({
      where: {
        "id": variantId,
        "productId": productId  
      },
      relations: ["prices"]
    });

    if (!variant) {
      throw new NotFoundException({
        "variantId": variantId 
      });
    }

    const {prices, ...rest} = input;


    for (const [key, value] of Object.entries(rest)) {
      variant[key] = value
    }

    // TODO update variant prices
    variant = await this.productVariantRepository.save(variant);
    return variant;
  }

  async deleteVariant(productId: bigint, variantId: bigint): Promise<void> {
    let variant = await this.productVariantRepository.findOne({
      where: {
        "id": variantId,
        "productId": productId
      },
      relations: ["prices"]
    });

    if (variant) {
     variant.deletedAt = new Date();
     await this.productVariantRepository.save(variant);
    }

    return Promise.resolve();
  }

}
