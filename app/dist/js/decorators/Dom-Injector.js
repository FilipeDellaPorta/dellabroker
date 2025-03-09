export function domInjector(seletor) {
    return function (target, propertykey) {
        console.log(`Modificando o prototype ${target.constructor.name} e adicionando getter para a propriedade ${propertykey}`);
        const getter = function () {
            const elemento = document.querySelector(seletor);
            console.log(`buscando elemento do DOM com o seletor ${seletor} para injetar em ${propertykey}`);
            return elemento;
        };
        Object.defineProperty(target, propertykey, {
            get: getter,
        });
    };
}
