import ListProductUsecase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";

const product1 = new Product("1", "Product 1", 10);
const product2 = new Product("2", "Product 2", 20);

const MockRepository = () => ({
    find: jest.fn(),
    findAll: jest.fn().mockResolvedValue([product1, product2]),
    create: jest.fn(),
    update: jest.fn()
});

describe("Unit test list product use case", () => {
    it("should return a list of products", async () => {
        const productRepository = MockRepository();
        const usecase = new ListProductUsecase(productRepository);

        const result = await usecase.execute({});

        expect(result.products.length).toBe(2);

        expect(result.products[0].id).toBe(product1.id);
        expect(result.products[0].name).toBe(product1.name);
        expect(result.products[0].price).toBe(product1.price);

        expect(result.products[1].id).toBe(product2.id);
        expect(result.products[1].name).toBe(product2.name);
        expect(result.products[1].price).toBe(product2.price);
    });
});
