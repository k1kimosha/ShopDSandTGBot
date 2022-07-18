import { MessageActionRow, MessageButton, MessageSelectMenu, Modal, TextInputComponent } from "discord.js";

/**
 * ButtonsMenu controller
 */
class Buttons {
    /**
     * Create Buttons Menu
     * @param {object} options Options
     * @param {number} options.rows_count Count of rows (1-5)
     * @param {object[]} options.menus Buttons in rows
     * @param {string} options.menus[].customId Button id
     * @param {string} options.menus[].label Button label
     * @param {string} options.menus[].style Button style
     * @param {string} options.menus[].emoji Button emoji
     * @param {string} options.menus[].url Button url
     * @param {boolean} options.menus[].disabled Disabled button
     * @returns {object[]} Rows menu
     */
    async createButtonsMenu({ rows_count, menus }) {
        let rows = [];
        for (let row = 0; row < rows_count; row++) {
            let menu = new MessageActionRow();
            for (let button = 0; button < menus[row].length; button++) {
                menu.addComponents(new MessageButton({
                    customId: menus[row][button].customId,
                    label: menus[row][button].label,
                    style: menus[row][button].style,
                    emoji: menus[row][button].emoji,
                    url: menus[row][button].url,
                    disabled: menus[row][button].disabled
                }));
            };
            rows.push(menu);
        }
        console.log(JSON.stringify(rows));
        return rows;
    }

}

const buttonController = new Buttons();

/**
 * SelectMenu controller
 */
class Select {
    /**
     * Create Select Menu
     * @param {object} options Options
     * @param {object} options.options Options
     * @param {string} options.options.customId Select Menu id
     * @param {string} options.options.label Select Menu label
     * @param {number} options.options.maxValues Max selects point
     * @param {number} options.options.minValues Min selects point
     * @param {boolean} options.options.disabled Disabled select menu
     * @param {object[]} options.choices Points (1-25)
     * @param {string} options.choices[].label Point label
     * @param {string} options.choices[].value Point value
     * @returns {object[]} Select menu
     */
    async createSelectMenu({ options, choices }) {
        let menu = new MessageActionRow();
        menu.addComponents(new MessageSelectMenu({
            customId: options.customId,
            placeholder: options.label,
            maxValues: options.maxValues,
            minValues: options.minValues,
            disabled: options.disabled,
            options: choices
        }));
        console.log(JSON.stringify(menu));
        return menu;
    }

}

const selectMenuController = new Select();

/**
 * Modal controller
 */
class Modals {
    /**
     * Create Modal
     * @param {object} options Options
     * @param {string} options.customId Modal id
     * @param {string} options.title Modal title
     * @param {object[]} options.inputs Text inputs
     * @param {string} options.inputs[].customId Text input id
     * @param {string} options.inputs[].label Text input label
     * @param {number} options.inputs[].style Text input style
     * @param {boolean} options.inputs[].required Text input required
     * @param {number} options.inputs[].minLength Text input min length
     * @param {number} options.inputs[].maxLength Text input max length
     * @param {string} options.inputs[].value Text input default value
     * @param {string} options.inputs[].placeholder Text input placeholder
     * @returns {object[]} Modal
     */
    async createModal({ customId, title, inputs }) {
        let modal = new Modal({
            customId: customId,
            title: title
        });
        for (let i = 0; i < inputs.length; i++) {
            modal.addComponents(new MessageActionRow({
                components: [new TextInputComponent({
                    customId: inputs[i].customId,
                    label: inputs[i].label,
                    style: inputs[i].style,
                    required: inputs[i].required,
                    minLength: inputs[i].minLength,
                    maxLength: inputs[i].maxLength,
                    value: inputs[i].value,
                    placeholder: inputs[i].placeholder
                })]
            }));
        }
        console.log(JSON.stringify(modal));
        return modal;
    }

}

const modalController = new Modals();

export {
    buttonController, selectMenuController, modalController
};