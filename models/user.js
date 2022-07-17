import { sqlConnection } from "../utils/mysql.js";

/**
 * UserModel controller
 */
class User {
    /**
     * Get user from database
     * @param {object} options Options
     * @param {string} options.ds_uuid Discord uuid
     * @param {string} options.tg_uuid Telegram uuid
     * @returns {object} Status and (user object?)
     */
    async getUser({ ds_uuid = null, tg_uuid = null }) {
        const getUser = await sqlConnection.execute("SELECT * FROM `users` WHERE ds_uuid = ? OR tg_uuid = ?", [ds_uuid, tg_uuid]);

        if (!getUser.length) {
            return {
                status: false
            };
        }

        return {
            status: true,
            getUser
        };
    };

    /**
     * Update user in database
     * @param {object} options Options
     * @param {string} options.uuid Shop uuid
     * @param {string} options.ds_uuid Discord uuid
     * @param {string} options.tg_uuid Telegram uuid
     * @param {object} options.data Updated data
     * @param {string} options.data.ds_uuid Discord uuid
     * @param {string} options.data.tg_uuid Telegram uuid
     * @param {boolean} options.data.status User activate status
     * @returns {object} Status
     */
    async updateUser({ uuid = null, ds_uuid = null, tg_uuid = null, data }) {
        const updateUser = await sqlConnection.execute("UPDATE `users` SET ? WHERE uuid = ? OR ds_uuid = ? OR tg_uuid = ?", [data, uuid, ds_uuid, tg_uuid]);

        if (!updateUser.changedRows) {
            return {
                status: false
            };
        }

        return {
            status: true
        };
    };

    /**
     * Create new user in database
     * @param {object} options Options
     * @param {string} options.uuid Shop uuid
     * @param {string} options.ds_uuid Discord uuid
     * @param {string} options.tg_uuid Telegram uuid
     * @returns {object} Status
     */
    async createUser({ uuid, ds_uuid = null, tg_uuid = null }) {
        const createUser = await sqlConnection.execute("INSERT INTO `users` (uuid, ds_uuid, tg_uuid, status) VALUES (?, ?, ?, 1)", [uuid, ds_uuid, tg_uuid]);

        if (!createUser.affectedRows) {
            return {
                status: false
            };
        }

        return {
            status: true
        };
    };

}

const userModel = new User();

export {
    userModel
};