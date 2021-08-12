import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepositories';
import AppError from '@shared/erros/AppError';
import Product from '../typeorm/entities/Products';
// import IRequest from 'interfaces/IRequest';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class CreateProductSerice {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(<string>name);

    if (productExists) {
      throw new AppError('There is already one product with this name.');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductSerice;
