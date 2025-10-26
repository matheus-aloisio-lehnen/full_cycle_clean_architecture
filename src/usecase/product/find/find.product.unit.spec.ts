import FindProductUsecase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Should find a product use case", () => {
    const product = new Product("1", "p1", 10);

    const MockRepository = () => {
        return {
            find: jest.fn().mockResolvedValue(product),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn()
        };
    };

    it("Should find a product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUsecase(productRepository);
        const input = { id: "1" };
        const output = { id: "1", name: "p1", price: 10 };
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });

    it("Should not find a product", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Produto não encontrado");
        });
        const usecase = new FindProductUsecase(productRepository);
        const input = { id: "123" };
        await expect(usecase.execute(input)).rejects.toThrowError("Produto não encontrado");
    });
});