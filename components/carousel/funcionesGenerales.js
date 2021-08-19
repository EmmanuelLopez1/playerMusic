export const FuncionesGenerales = class funciones {
    constructor() {
        
    }

    elimindarNodosText(node) {
        node.forEach((element) => {
            if (element.nodeType === 3 && !/\S/.test(element.nodeValue)) {
                element.parentNode.removeChild(element);
            }
        })
    }
}
