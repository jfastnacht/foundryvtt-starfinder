export default function(engine) {
    engine.closures.add("calculateStarshipArmorClass", (fact, context) => {
        const data = fact.data;

        const pilotingBonus = data.crew.pilot.actors[0]?.data?.data?.skills?.pil?.ranks || 0;
        const defenses = CONFIG.SFRPG.armorDefenseMap[data.details.systems.armor] || 0;
        const sizeMod = CONFIG.SFRPG.starshipSizeMod[data.details.size] || 0;
        const misc = data.attributes.ac?.misc || 0;

        data.attributes.ac = {
            value: 10 + pilotingBonus + defenses + misc + sizeMod,
            misc: misc,
            tooltip: []
        };
        
        return fact;
    });
}