import {sqlConnection} from "../utils/mysql.js";

/**
 * ManageModel controller
 */
class Manage {
    /**
     * Get manage from database
     * @param {string} uuid Manage uuid
     * @returns {object} Status and (manage object?)
     */
    async getManage(uuid) {
        const getManage = await sqlConnection.execute("SELECT * FROM `manages` WHERE uuid = ?", [uuid]);

        if (!getManage.length) {
            return {
                status: false
            };
        }

        return {
            status: true,
            getManage
        };
    };

    /**
     * Update manage in database
     * @param {object} options Options
     * @param {string} options.uuid Manage uuid
     * @param {object} options.data Updated data
     * @param {boolean} options.data.status Manage activate status
     * @returns {object} Status
     */
    async updateManage({uuid, data}) {
        const updateManage = await sqlConnection.execute("UPDATE `manages` SET ? WHERE uuid = ?", [data, uuid]);

        if (!updateManage.changedRows) {
            return {
                status: false
            };
        }

        return {
            status: true
        };
    };

    /**
     * Create new manage in database
     * @param {string} uuid Manage uuid
     * @returns {object} Status
     */
    async createManage(uuid) {
        const createManage = await sqlConnection.execute("INSERT INTO `manages` (uuid, status) VALUES (?, 1)", [uuid]);

        if (!createManage.affectedRows) {
            return {
                status: false
            };
        }

        return {
            status: true
        };
    };

}

const manageModel = new Manage();

export {
    manageModel
};