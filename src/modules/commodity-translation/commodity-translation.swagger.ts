/**
 * @swagger
 * tags:
 *   - name: CommodityTranslation
 *     description: 商品翻譯管理
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CommodityTranslationCreateDTO:
 *       type: object
 *       required:
 *         - commodityUuid
 *         - locale
 *         - name
 *       properties:
 *         commodityUuid:
 *           type: string
 *           description: 商品 UUID
 *         locale:
 *           type: string
 *           description: 語系代碼
 *           example: zh-Hant
 *         name:
 *           type: string
 *           description: 商品名稱
 *         introduction:
 *           type: string
 *           description: 商品介紹
 *
 *     CommodityTranslationUpdateDTO:
 *       type: object
 *       required:
 *         - targetLocale
 *       properties:
 *         targetLocale:
 *           type: string
 *           description: 目標翻譯語系
 *           example: zh-Hant
 *         newLocale:
 *           type: string
 *           description: 新的翻譯語系
 *           example: en
 *         name:
 *           type: string
 *           description: 商品名稱
 *         introduction:
 *           type: string
 *           description: 商品介紹
 *
 *     CommodityTranslationResponseDTO:
 *       type: object
 *       properties:
 *         locale:
 *           type: string
 *           description: 語系代碼
 *         name:
 *           type: string
 *           description: 商品名稱
 *         introduction:
 *           type: string
 *           nullable: true
 *           description: 商品介紹
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 建立時間
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 更新時間
 *
 *   parameters:
 *     CommodityTranslationLocale:
 *       in: query
 *       name: locale
 *       required: true
 *       schema:
 *         type: string
 *       description: 語系代碼
 */

/**
 * @swagger
 * /commodity-translation:
 *   post:
 *     summary: 建立商品翻譯（僅admin或商店擁有者）
 *     tags: [CommodityTranslation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommodityTranslationCreateDTO'
 *     responses:
 *       200:
 *         description: 建立成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommodityTranslationResponseDTO'
 */

/**
 * @swagger
 * /commodity-translation/{commodityUuid}:
 *   get:
 *     summary: 查詢單一商品翻譯
 *     tags: [CommodityTranslation]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: commodityUuid
 *         required: true
 *         schema:
 *           type: string
 *         description: 商品 UUID
 *       - $ref: '#/components/parameters/CommodityTranslationLocale'
 *     responses:
 *       200:
 *         description: 查詢成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommodityTranslationResponseDTO'
 *   patch:
 *     summary: 更新商品翻譯（僅admin或商店擁有者）
 *     tags: [CommodityTranslation]
 *     parameters:
 *       - in: path
 *         name: commodityUuid
 *         required: true
 *         schema:
 *           type: string
 *         description: 商品 UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommodityTranslationUpdateDTO'
 *     responses:
 *       200:
 *         description: 更新成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommodityTranslationResponseDTO'
 */
