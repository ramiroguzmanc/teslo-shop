import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService')
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto)
      await this.productRepository.save(product)
      return product
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async findAll() {
    try {
      const products = await this.productRepository.find()
      return products
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productRepository.findOneBy({ id })
      if (!product) {
        throw new NotFoundException(
          'No se ha encontrado el producto solicitado'
        )
      }
      return product
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  async remove(id: string) {
    try {
      const product = await this.findOne(id)
      await this.productRepository.remove(product)
      return 'Producto eliminado exitosamente'
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail)
    }

    this.logger.error(error)
    throw new InternalServerErrorException(
      'Unexpected error, check server logs'
    )
  }
}
