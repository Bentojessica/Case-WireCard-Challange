import { app } from "./Controller/app";
import { clientRouter, paymentRouter } from "./Router/Router";

app.use("/client", clientRouter)
app.use("/payment", paymentRouter)