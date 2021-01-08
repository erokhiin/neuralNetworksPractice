import { linearClasifierModule } from "./modules/linearClasifierModule";
import { xorModule } from "./modules/xorModule";

const root = document.querySelector("#root")

const linearClasifierNode = root.appendChild(document.createElement("div"))
const xorNode = root.appendChild(document.createElement("div"))

linearClasifierModule(linearClasifierNode);
xorModule(xorNode);

