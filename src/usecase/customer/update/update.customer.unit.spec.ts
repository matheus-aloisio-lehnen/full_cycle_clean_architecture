import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "John",
    new Address('1', 1, '1', '1'
    )
);

const input = {
    id: customer.id,
    name: "John Updated",
    address: {
        street: "1 Updated",
        number: 1234,
        zip: "1 Updated",
        city: "1 Updated"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test update customer use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository)
        const output = await usecase.execute(input)
        expect(output).toEqual(input)
    })
})
