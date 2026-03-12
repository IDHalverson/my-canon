import { DEBUG_LOGGING_ON } from "../constants";
export const debugLog = (...args) => DEBUG_LOGGING_ON ? console.log(...args) : null;
