import { MessageActionRow, MessageButton, Modal, TextInputComponent } from "discord.js";


class Buttons {
    /**
     * 
     * @param {object} options
     * @param {number} options.rows_count
     * @param {Array.<{customId: string, label: string, style: string}>} options.menus
     * @returns 
     */
    async createButtons ({rows_count, menus}) {
        let rows = [];
        for (let row = 0; row < rows_count; row++) {
            let menu = new MessageActionRow();
            for (let button = 0; button < menus[row].length; button++) {
                menu.addComponents(new MessageButton({
                    customId: menus[row][button].customId,
                    label: menus[row][button].label,
                    style: menus[row][button].style,
                    emoji: menus[row][button].emoji
                }));
            };
            rows.push(menu);
        }
        console.log(JSON.stringify(rows));
        return rows;
    }

}

export {
    Buttons
};