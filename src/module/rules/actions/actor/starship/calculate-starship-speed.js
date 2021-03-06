export default function (engine) {
    engine.closures.add("calculateStarshipSpeed", (fact, context) => {
        const data = fact.data;
        const thrusters = CONFIG.SFRPG.thrustersMap[data.details.systems.thrusters] || { speed: 8, mode: 0 };

        data.attributes.speed = {
            value: thrusters.speed,
            tooltip: []
        };

        return fact;
    });
}