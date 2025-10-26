import CreateProductUsecase from "./create.product.usecase";

const MockRepository = () => ({
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn().mockResolvedValue(undefined),
    update: jest.fn(),
});

describe("Unit test Product create use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUsecase(productRepository);

        const input = { type: "a" as const, name: "Product 1", price: 10 };
        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUsecase(productRepository);

        const input = { type: "a" as const, name: "", price: 10 };
        await expect(usecase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw an error when price is negative", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUsecase(productRepository);

        const input = { type: "a" as const, name: "Product 1", price: -1 };
        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero");
    });
});
