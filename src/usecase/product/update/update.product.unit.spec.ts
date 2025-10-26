import UpdateProductUsecase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

const MockRepository = () => ({
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn().mockResolvedValue(undefined),
});

describe("Unit test update product use case", () => {
    it("should update a product", async () => {
        const product = new Product("1", "Product 1", 10);
        const productRepository = MockRepository();
        productRepository.find.mockResolvedValue(product);

        const usecase = new UpdateProductUsecase(productRepository);

        const input = { id: "1", name: "Updated name", price: 20 };
        const result = await usecase.execute(input);

        expect(result.id).toBe("1");
        expect(result.name).toBe("Updated name");
        expect(result.price).toBe(20);
    });

    it("should throw error when product not found", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });

        const usecase = new UpdateProductUsecase(productRepository);

        const input = { id: "999", name: "Test", price: 10 };
        await expect(usecase.execute(input))
        .rejects
        .toThrow("Product not found");
    });

    it("should throw error when new name is empty", async () => {
        const product = new Product("1", "Product 1", 10);
        const productRepository = MockRepository();
        productRepository.find.mockResolvedValue(product);

        const usecase = new UpdateProductUsecase(productRepository);

        const input = { id: "1", name: "", price: 10 };

        await expect(usecase.execute(input))
        .rejects
        .toThrow("Name is required");
    });

    it("should throw error when new price < 0", async () => {
        const product = new Product("1", "Product 1", 10);
        const productRepository = MockRepository();
        productRepository.find.mockResolvedValue(product);

        const usecase = new UpdateProductUsecase(productRepository);

        const input = { id: "1", name: "Product X", price: -1 };

        await expect(usecase.execute(input))
        .rejects
        .toThrow("Price must be greater than zero");
    });
});
