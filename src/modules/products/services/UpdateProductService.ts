import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepositories';
import AppError from '@shared/erros/AppError';
import Product from '../typeorm/entities/Products';
import IRequest from 'interfaces/IRequest';

class UpdateProductSerice {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await productsRepository.findByName(<string>name);

    if (productExists) {
      throw new AppError('There is already one product with this name.');
    }

    product.name = <string>name;
    product.price = <number>price;
    product.quantity = <number>quantity;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductSerice;
