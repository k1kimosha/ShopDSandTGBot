import { sqlConnection } from "../utils/mysql";

/**
 * LocalChatModel controller
 */
class LocalChat {
    /**
     * Get local chat from database
     * @param {string} uuid Local chat uuid
     * @returns {object} Status and (Local Chat object?)
     */
    async getChat(uuid) {
        const getChat = await sqlConnection.execute("SELECT * FROM `local_chats` WHERE uuid = ?", [uuid]);

        if (!getChat.length) {
            return {
                status: false
            };
        }

        return {
            status: true,
            getChat
        };
    };

    /**
     * Update local chat in database
     * @param {object} options Options
     * @param {string} options.uuid Local chat uuid
     * @param {object} options.data Updated data
     * @param {number} options.data.seller_type Seller platform type
     * @param {string} options.data.seller_uuid Seller platform uuid
     * @param {number} options.data.buyer_type Buyer platform type
     * @param {string} options.data.buyer_uuid Buyer platform uuid
     * @param {number} options.data.status Local chat activate status
     * @returns {object} Status
     */
    async updateChat({ uuid, data }) {
        const updateChat = await sqlConnection.execute("UPDATE `local_chats` SET * WHERE uuid = ?", [data, uuid]);

        if (!updateChat.changedRows) {
            return {
                status: false
            };
        }

        return {
            status: true
        };
    };

    /**
     * Create new local chat in database
     * @param {object} options Options
     * @param {string} options.uuid Local chat uuid
     * @param {number} options.seller_type Seller platform type
     * @param {string} options.seller_uuid Seller platform uuid
     * @param {number} options.buyer_type Buyer platform type
     * @param {string} options.buyer_uuid Buyer platform uuid
     * @returns {object} Status
     */
    async createChat({ uuid, seller_type, seller_uuid, buyer_type, buyer_uuid }) {
        const createChat = await sqlConnection.execute("INSERT INTO `local_chats` (uuid, seller_type, seller_uuid, buyer_type, buyer_uuid, status) VALUES (?, ?, ?, ?, ?, 1)", [uuid, seller_type, seller_uuid, buyer_type, buyer_uuid]);

        if (!createChat.affectedRows) {
            return {
                status: false
            };
        }

        return {
            status: true
        };
    };

}

const localChatModel = new LocalChat();

export {
    localChatModel
};