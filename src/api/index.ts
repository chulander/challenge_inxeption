import * as express from "express";
import worker from "./worker";
import workers from "./workers";

const apiRouter = express.Router();

apiRouter.use("/worker", worker);
apiRouter.use("/workers", workers);

export default apiRouter;
