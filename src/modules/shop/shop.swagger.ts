/**
 * @swagger
 * tags:
 *   - name: Shop
 *     description: 商店管理
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ShopCreateDTO:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: 商店名稱
 *         localPhoneNumber:
 *           type: string
 *           description: 市話
 *         mobilePhoneNumber:
 *           type: string
 *           description: 手機
 *         introduction:
 *           type: string
 *           description: 商店介紹
 *
 *     ShopUpdateDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         localPhoneNumber:
 *           type: string
 *         mobilePhoneNumber:
 *           type: string
 *         introduction:
 *           type: string
 *
 *     ShopResponseDTO:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string
 *         userUuid:
 *           type: string
 *         name:
 *           type: string
 *         localPhoneNumber:
 *           type: string
 *         mobilePhoneNumber:
 *           type: string
 *         introduction:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /shop:
 *   post:
 *     summary: 建立商店（建立在目前登入使用者底下）
 *     tags: [Shop]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShopCreateDTO'
 *     responses:
 *       200:
 *         description: 建立成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShopResponseDTO'
 *   get:
 *     summary: 查詢商店列表（admin 可用 query 指定 userUuid）
 *     tags: [Shop]
 *     parameters:
 *       - in: query
 *         name: userUuid
 *         schema:
 *           type: string
 *           format: uuid
 *         required: false
 *         description: 指定使用者 UUID（僅 admin 有效）
 *     responses:
 *       200:
 *         description: 查詢成功
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShopResponseDTO'
 */

/**
 * @swagger
 * /shop/{uuid}:
 *   get:
 *     summary: 查詢單一商店
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: 商店 UUID
 *     responses:
 *       200:
 *         description: 查詢成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShopResponseDTO'
 *   patch:
 *     summary: 更新商店
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: 商店 UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShopUpdateDTO'
 *     responses:
 *       200:
 *         description: 更新成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShopResponseDTO'
 */
