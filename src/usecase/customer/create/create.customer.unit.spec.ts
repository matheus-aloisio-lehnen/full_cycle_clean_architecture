import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "Customer 1",
    address: {
        street: "1",
        number: 1,
        zip: "1",
        city: "1"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test Customer create use case", () => {

    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository)
        const output = await usecase.execute(input)
        expect(output).toEqual({
            id : expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        })
    })

    it("should throw an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository)
        input.name = ""
        await expect(usecase.execute(input)).rejects.toThrow("Name is required")
    })
    it("should throw an error when street is missing", async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository)
        input.address.street = ""
        await expect(usecase.execute(input)).rejects.toThrow("Street is required")
    })
})