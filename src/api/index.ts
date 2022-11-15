import * as express from "express";
import activity from "./activity";
import worker from "./employee";

const apiRouter = express.Router();

apiRouter.use("/activity", activity);
apiRouter.use("/employee", worker);

export default apiRouter;
