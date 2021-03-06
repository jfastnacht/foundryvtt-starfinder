export default function (engine) {
    engine.closures.add("calculateStarshipPower", (fact, context) => {
        const data = fact.data;
        const powercore = CONFIG.SFRPG.powercoreMap[data.details.systems.powercore] || { size: ["tiny"], pcu: 0 };

        data.attributes.power = {
            value: 0,
            max: powercore.pcu,
            tooltip: []
        };

        return fact;
    });
}