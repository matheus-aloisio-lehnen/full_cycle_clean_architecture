import Product from "./product";

describe("Product unit tests", () => {
    const invalidCases: {
        title: string;
        args: [string, string, number];
        error: string;
    }[] = [
        {
            title: "Should throw error when id is empty",
            args: ["", "Product 1", 100],
            error: "product: Id is required"
        },
        {
            title: "Should throw error when name is empty",
            args: ["123", "", 100],
            error: "product: Name is required"
        },
        {
            title: "Should throw error when price is less than zero",
            args: ["123", "Product 1", -1],
            error: "product: Price must be greater than zero"
        },
        {
            title: "Should throw error when id and name are empty",
            args: ["", "", 100],
            error: "product: Id is required,product: Name is required"
        },
        {
            title: "Should throw error when id is empty and price is less than zero",
            args: ["", "Product 1", -1],
            error: "product: Id is required,product: Price must be greater than zero"
        },
        {
            title: "Should throw error when name is empty and price is less than zero",
            args: ["123", "", -1],
            error: "product: Name is required,product: Price must be greater than zero"
        },
        {
            title: "Should throw error when id, name and price are invalid",
            args: ["", "", -1],
            error: "product: Id is required,product: Name is required,product: Price must be greater than zero"
        }
    ];

    invalidCases.forEach(({ title, args, error }) => {
        it(title, () => {
            const [id, name, price] = args;
            expect(() => new Product(id, name, price)).toThrowError(error);
        });
    });

    it("should change name", () => {
        const product = new Product("123", "Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("should change price", () => {
        const product = new Product("123", "Product 1", 100);
        product.changePrice(150);
        expect(product.price).toBe(150);
    });
});
