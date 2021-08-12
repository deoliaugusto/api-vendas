import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepositories';
import AppError from '@shared/erros/AppError';
import Product from '../typeorm/entities/Products';

class ListProductSerice {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const products = await productsRepository.find();

    // if (products.length > 0) {
    //   throw new AppError('There is  any product in the repository.');
    // }

    return products;
  }
}

export default ListProductSerice;
