import { Router } from "express";
import { ClientController } from "../Controller/ClientController";
import { PaymentController } from "../Controller/PaymentController";


export const clientRouter = Router()
export const paymentRouter = Router()

const clientController = new ClientController()
const paymentController = new PaymentController()

paymentRouter.get("/:id", paymentController.getPaymentId) // Endpoint pega compras pelo id do payment
clientRouter.get("/:name", clientController.getClientName) // Endpoint pega informações do client
clientRouter.post("/create", clientController.createClient) // Endpoint cadastrar o cliente "Loja"
paymentRouter.post("/create", paymentController.createPayment) // Endpoint Registrar compra ou cartão de crédito ou Boleto Bancário
