import { createContext } from "react";
import navValues from "./navValues";

const NavigationContext = createContext(navValues.home);

export default NavigationContext;
