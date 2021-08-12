import { Request, Response } from 'express';
import CreateProductSerice from '../services/CreateProductService';
import DeleteProductSerice from '../services/DeleteProductService';
import ListProductSerice from '../services/ListProductService';
import ShowProductSerice from '../services/ShowProductService';
import UpdateProductSerice from '../services/UpdateProductService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductSerice();

    const products = await listProducts.execute();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = new ShowProductSerice();

    const product = await showProduct.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id, name, price, quantity } = request.body;

    const createProduct = new CreateProductSerice();

    const product = await createProduct.execute({ id, name, price, quantity });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProduct = new UpdateProductSerice();

    const product = await updateProduct.execute({ id, name, price, quantity });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = new DeleteProductSerice();

    await deleteProduct.execute({ id });

    return response.json([]);
  }
}
