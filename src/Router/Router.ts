import { Router } from "express";
import { BuyerController } from "../Controller/BuyerController";
import { ClientController } from "../Controller/ClientController";
import { PaymentController } from "../Controller/PaymentController";


export const clientRouter = Router()
export const buyerRouter = Router()
export const paymentRouter = Router()

const clientController = new ClientController()
const buyerController = new BuyerController()
const paymentController = new PaymentController()

paymentRouter.get("/:id", paymentController.getPaymentId) // Endpoint pega compras pelo id do payment
buyerRouter.get("/:name", buyerController.getBuyerName) // Endpoint pega informações do comprador
clientRouter.get("/:name", clientController.getClientName) // Endpoint pega informações do client
clientRouter.post("/create", clientController.createClient) // Endpoint cadastrar o cliente "Loja"
buyerRouter.post("/create", buyerController.createBuyer) // Endpoint Cadastrar dados da compra do usuário para a "Loja"
paymentRouter.post("/create", paymentController.createPayment) // Endpoint Registrar compra ou cartão de crédito ou Boleto Bancário
