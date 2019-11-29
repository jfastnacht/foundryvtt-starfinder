/**
 * A specialized form used to select damage or condition types which appl to an Actor
 * 
 * @type {FormApplication}
 */
export class TraitSelectorStarfinder extends FormApplication {
    static get defaultOptions() {
        const options = super.defaultOptions;

        options.id = "trait-selector";
        options.classes = ["starfinder"];
        options.title = "Actor Trait Selection";
        options.template = "systems/starfinder/templates/apps/trait-selector.html";
        options.width = 320;
        options.height = "auto";

        return options;
    }

    /**
     * Return a reference to the target attribute
     * 
     * @type {String}
     */
    get attribute() {
        return this.options.name;
    }

    /**
     * Provide data to the HTML template for rendering
     * 
     * @returns {Object}
     */
    getData() {
        let attr = getProperty(this.object.data, this.attribute);
        if (typeof attr.value === "string") attr.value = this.constructor._backCompat(attr.value, this.options.choices);

        const choices = duplicate(this.options.choices);
        for (let [k, v] of Object.entries(choices)) {
            choices[k] = {
                label: v,
                chosen: attr.value.includes(k)
            };
        }

        return {
            choices: choices,
            custom: attr.custom
        };
    }

    /**
     * Support backwards compatability for old-style string separated traits
     * 
     * @param {String} current The current value
     * @param {Array} choices The choices
     * @returns {Array}
     * @private
     */
    static _backCompat(current, choices) {
        if (!current || current.length === 0) return [];
        current = current.split(/[\s,]/).filter(t => !!t);
        return current.map(val => {
            for (let [k,v] of Object.entries(choices)) {
                if (val === v) return k;
            }
            return null;
        }).filter(val => !!val);
    }

    /**
     * Update the Actor object with new trait data processed from the form
     * 
     * @param {Event} event The event that triggers the update
     * @param {Object} formData The data from the form
     * @private
     */
    _updateObject(event, formData) {
        const choices = [];

        for (let [k, v] of Object.entries(formData)) {
            if ((k !== 'custom') && v) choices.push(k);
        }

        this.object.update({
            [`${this.attribute}.value`]: choices,
            [`${this.attribute}.custom`]: formData.custom
        });
    }
}