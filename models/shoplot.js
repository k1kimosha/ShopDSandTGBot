import { sqlConnection } from "../utils/mysql.js";

/**
 * ShopLotModel controller
 */
class ShopLot {
    /**
     * Get shop lot(s) from database
     * @param {object} options Options
     * @param {string} options.lot_uuid Lot uuid
     * @param {string} options.seller_uuid Seller uuid
     * @returns {object} Status and (shop lost(s) object?)
     */
    async getLot({ lot_uuid = null, seller_uuid = null }) {
        const getLot = await sqlConnection.execute("SELECT * FROM `shop_lots` WHERE uuid = ? OR seller = ?", [lot_uuid, seller_uuid]);

        if (!getLot.length) {
            return {
                status: false
            };
        }

        return {
            status: true,
            getLot
        };
    };

    /**
     * Update shop lot(s)
     * @param {object} options Options
     * @param {string} options.lot_uuid Lot uuid
     * @param {string} options.seller_uuid Seller uuid
     * @param {object} options.data Updated data
     * @param {string} options.data.lot_name Lot name
     * @param {string} options.data.lot_description Lot description
     * @param {string} options.data.gallery Lot gallery
     * @param {number} options.data.type Lot type
     * @param {number} options.data.price Lot price
     * @param {boolean} options.data.status Lot activate status
     * @returns {object} Status
     */
    async updateLot({ lot_uuid = null, seller_uuid = null, data }) {
        const updateLot = await sqlConnection.execute("UPDATE `shop_lots` SET ? WHERE uuid = ? OR seller = ?", [data, lot_uuid, seller_uuid]);

        if (!updateLot.changedRows) {
            return {
                status: false
            };
        }

        return {
            status: true
        };
    };

    /**
     * Create new shop lot in database
     * @param {object} options Options
     * @param {string} options.lot_uuid Lot uuid
     * @param {string} options.seller_uuid Seller uuid
     * @param {string} options.lot_name Lot name
     * @param {string} options.lot_description Lot description?
     * @param {string} options.gallery Lot gallery?
     * @param {number} options.type Lot type
     * @param {number} options.price Lot price
     * @returns {object} Status
     */
    async createLot({ lot_uuid, seller_uuid, lot_name, lot_description = null, gallery = null, type, price }) {
        const createLot = await sqlConnection.execute("INSERT INTO `shop_lots` (uuid, seller, lot_name, lot_description, gallery, type, price, status) VALUES (?, ?, ?, ?, ?, ?, ?, 1)", [lot_uuid, seller_uuid, lot_name, lot_description, gallery, type, price]);

        if (!createLot.affectedRows) {
            return {
                status: false
            };
        }

        return {
            status: true
        };
    };

}

const shopLotModel = new ShopLot();

export {
    shopLotModel
};