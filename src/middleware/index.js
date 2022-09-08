import logger from "./logger.js";
import { applyMiddleware } from "redux";

export default applyMiddleware(logger);
