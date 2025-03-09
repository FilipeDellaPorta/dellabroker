export function logarRuntime(emSegundos = false) {
    return function (target, propertykey, descriptor) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...args) {
            let divisor = 1;
            let unidade = 'milissegundos';
            if (emSegundos) {
                divisor = 1000;
                unidade = 'segundosS';
            }
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`${propertykey}, tempo de execução: ${(t2 - t1) / divisor} ${unidade}.`);
            retorno;
        };
        return descriptor;
    };
}
//# sourceMappingURL=LogarRuntime.js.map