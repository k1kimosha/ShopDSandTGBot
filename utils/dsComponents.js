import { MessageActionRow, MessageButton, Modal, TextInputComponent } from "discord.js";

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
    async createButtonsMenu ({rows_count, menus}) {
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

export {
    buttonController
};