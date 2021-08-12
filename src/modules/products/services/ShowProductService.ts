import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepositories';
import AppError from '@shared/erros/AppError';
import Product from '../typeorm/entities/Products';
import IRequest from 'interfaces/IRequest';

class ShowProductSerice {
  public async execute({ id }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}

export default ShowProductSerice;
