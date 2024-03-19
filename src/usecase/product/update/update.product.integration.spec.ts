import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const sut = new UpdateProductUseCase(productRepository);

    const product = new Product("123", "Product 1", 10);

    await productRepository.create(product);

    const input = {
      id: "123",
      name: "Product 1 updated",
      price: 20,
    };

    const output = {
      id: "123",
      name: "Product 1 updated",
      price: 20,
    };

    const result = await sut.execute(input);

    expect(result).toEqual(output);
  });
});
