import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Unit Test find customer use case", () => {

    const customer = new Customer("1", "Customer 1");
    const address = new Address("1", 1, "1", "1");
    customer.changeAddress(address);

    const MockRepository = () => {
        return {
            find: jest.fn().mockReturnValue(Promise.resolve(customer)),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        }
    }

    it("should find a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository)

        const input = {
            id: "1"
        }

        const output = {
            id: "1",
            name: "Customer 1",
            address: {
                street: "1",
                number: 1,
                zip: "1",
                city: "1"
            }
        }
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    })

    it("should not find a customer", () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        })
        const usecase = new FindCustomerUseCase(customerRepository)

        const input = {
            id: "123"
        }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrowError("Customer not found");

    })

})