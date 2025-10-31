import express from "express";
import CreateProductUsecase from "../../../usecase/product/create/create.product.usecase";
import ListProductUsecase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req, res) => {
    const repository = new ProductRepository();
    const usecase = new CreateProductUsecase(repository);

    try {
        const dto = {
            name: req.body.name,
            price: req.body.price
        };
        const output = await usecase.execute(dto);
        res.send(output);
    } catch (e) {
        res.status(500).send(e);
    }
});

productRoute.get("/", async (_req, res) => {
    const repository = new ProductRepository();
    const usecase = new ListProductUsecase(repository);

    try {
        const output = await usecase.execute({});
        res.send(output);
    } catch (e) {
        res.status(500).send(e);
    }
});
