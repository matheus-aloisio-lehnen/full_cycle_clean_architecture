import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {
    static listXML(data: OutputListCustomerDto): string {
        const xmlOption = {
            header: true,
            indent: "  ",
            newLine: "\n",
            allowEmpty: true,
        }
        return toXML({
            customers: {
                customer: data.customers.map(c => {
                    return {
                        id: c.id,
                        name: c.name,
                        address: {
                            street: c.address.street,
                            number: c.address.number,
                            zip: c.address.zip,
                            city: c.address.city,
                        }
                    }
                })
            }
        }, xmlOption)
    }
}