import { app } from "./Controller/app";
import { buyerRouter, clientRouter, paymentRouter } from "./Router/Router";

app.use("/client", clientRouter)
app.use("/buyer", buyerRouter)
app.use("/payment", paymentRouter)