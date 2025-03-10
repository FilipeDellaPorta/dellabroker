export function inspect(target, propertykey, descriptor) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`--- Método ${propertykey}`);
        console.log(`------ parâmetros: ${JSON.stringify(args)}`);
        const retorno = metodoOriginal.apply(this, args);
        console.log(`------ retorno: ${JSON.stringify(args)}`);
        return retorno;
    };
    return descriptor;
}
//# sourceMappingURL=Inspect.js.map