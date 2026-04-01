/**
 * @swagger
 * tags:
 *   - name: ShopTranslation
 *     description: 商店翻譯管理
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ShopTranslationCreateDTO:
 *       type: object
 *       required:
 *         - shopUuid
 *         - locale
 *         - name
 *       properties:
 *         shopUuid:
 *           type: string
 *           description: 商店 UUID
 *         locale:
 *           type: string
 *           description: 語系代碼
 *           example: zh-Hant
 *         name:
 *           type: string
 *           description: 商店名稱
 *         introduction:
 *           type: string
 *           description: 商店介紹
 *
 *     ShopTranslationUpdateDTO:
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
 *           description: 商店名稱
 *         introduction:
 *           type: string
 *           description: 商店介紹
 *
 *     ShopTranslationResponseDTO:
 *       type: object
 *       properties:
 *         locale:
 *           type: string
 *           description: 語系代碼
 *         name:
 *           type: string
 *           description: 商店名稱
 *         introduction:
 *           type: string
 *           nullable: true
 *           description: 商店介紹
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 建立時間
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 更新時間
 *
 *     ShopTranslationPaginationResponseDTO:
 *       type: object
 *       properties:
 *         translations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ShopTranslationResponseDTO'
 *         total:
 *           type: integer
 *           description: 總筆數
 *
 *   parameters:
 *     ShopTranslationLocale:
 *       in: query
 *       name: locale
 *       schema:
 *         type: string
 *       description: 語系代碼
 *     ShopTranslationCreatedFrom:
 *       in: query
 *       name: createdFrom
 *       schema:
 *         type: string
 *         format: date-time
 *       description: 建立起始時間
 *     ShopTranslationCreatedTo:
 *       in: query
 *       name: createdTo
 *       schema:
 *         type: string
 *         format: date-time
 *       description: 建立結束時間
 *     ShopTranslationPage:
 *       in: query
 *       name: page
 *       schema:
 *         type: integer
 *         default: 1
 *       description: 分頁頁碼（預設 1）
 *     ShopTranslationLimit:
 *       in: query
 *       name: limit
 *       schema:
 *         type: integer
 *         default: 10
 *       description: 每頁筆數（預設 10）
 *     ShopTranslationOrderBy:
 *       in: query
 *       name: orderBy
 *       schema:
 *         type: string
 *       description: 排序欄位
 *     ShopTranslationOrderDirection:
 *       in: query
 *       name: orderDirection
 *       schema:
 *         type: string
 *         enum: [ASC, DESC]
 *       description: 排序方式 ASC 或 DESC
 */

/**
 * @swagger
 * /shop-translation:
 *   post:
 *     summary: 建立商店翻譯（僅admin或商店擁有者）
 *     tags: [ShopTranslation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShopTranslationCreateDTO'
 *     responses:
 *       200:
 *         description: 建立成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShopTranslationResponseDTO'
 */

/**
 * @swagger
 * /shop-translation/{shopUuid}:
 *   get:
 *     summary: 查詢商店翻譯列表
 *     tags: [ShopTranslation]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: shopUuid
 *         required: true
 *         schema:
 *           type: string
 *         description: 商店 UUID
 *       - $ref: '#/components/parameters/ShopTranslationLocale'
 *       - $ref: '#/components/parameters/ShopTranslationCreatedFrom'
 *       - $ref: '#/components/parameters/ShopTranslationCreatedTo'
 *       - $ref: '#/components/parameters/ShopTranslationPage'
 *       - $ref: '#/components/parameters/ShopTranslationLimit'
 *       - $ref: '#/components/parameters/ShopTranslationOrderBy'
 *       - $ref: '#/components/parameters/ShopTranslationOrderDirection'
 *     responses:
 *       200:
 *         description: 查詢成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShopTranslationPaginationResponseDTO'
 *   patch:
 *     summary: 更新商店翻譯（僅admin或商店擁有者）
 *     tags: [ShopTranslation]
 *     parameters:
 *       - in: path
 *         name: shopUuid
 *         required: true
 *         schema:
 *           type: string
 *         description: 商店 UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShopTranslationUpdateDTO'
 *     responses:
 *       200:
 *         description: 更新成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShopTranslationResponseDTO'
 */
