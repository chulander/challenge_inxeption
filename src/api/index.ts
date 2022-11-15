import * as express from "express";
import worker from "./worker";
import activity from "./activity";

const apiRouter = express.Router();

apiRouter.use("/worker", worker);
apiRouter.use("/activity", activity);

export default apiRouter;
