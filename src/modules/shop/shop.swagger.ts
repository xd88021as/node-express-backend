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
 *     ShopResponseDTO:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string
 *           description: 商店 UUID
 *         userUuid:
 *           type: string
 *           description: 使用者 UUID
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
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 創建時間
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 最後更改時間
 *
 *     ShopPaginationResponseDTO:
 *       type: object
 *       properties:
 *         shops:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ShopResponseDTO'
 *         total:
 *           type: integer
 *           description: 總筆數
 *
 *   parameters:
 *     UserUuid:
 *       in: query
 *       name: userId
 *       schema:
 *         type: string
 *       description: 使用者 UUID
 *     UserAccount:
 *       in: query
 *       name: userAccount
 *       schema:
 *         type: string
 *       description: 使用者帳號
 *     CreatedFrom:
 *       in: query
 *       name: createdFrom
 *       schema:
 *         type: string
 *         format: date-time
 *       description: 註冊起始時間
 *     CreatedTo:
 *       in: query
 *       name: createdTo
 *       schema:
 *         type: string
 *         format: date-time
 *       description: 註冊結束時間
 *     Page:
 *       in: query
 *       name: page
 *       schema:
 *         type: integer
 *         default: 1
 *       description: 分頁頁碼（預設 1）
 *     Limit:
 *       in: query
 *       name: limit
 *       schema:
 *         type: integer
 *         default: 10
 *       description: 每頁筆數（預設 10）
 *     OrderBy:
 *       in: query
 *       name: orderBy
 *       schema:
 *         type: string
 *       description: 排序欄位（預設 id）
 *     OrderDirection:
 *       in: query
 *       name: orderDirection
 *       schema:
 *         type: string
 *         enum: [ASC, DESC]
 *       description: 排序方式ASC/DESC（預設 ASC）
 */

/**
 * @swagger
 * /shop:
 *   get:
 *     summary: 查詢商店列表
 *     tags: [Shop]
 *     security: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserUuid'
 *       - $ref: '#/components/parameters/UserAccount'
 *       - $ref: '#/components/parameters/CreatedFrom'
 *       - $ref: '#/components/parameters/CreatedTo'
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *       - $ref: '#/components/parameters/OrderBy'
 *       - $ref: '#/components/parameters/OrderDirection'
 *     responses:
 *       200:
 *         description: 查詢成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShopPaginationResponseDTO'
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
 *         required: true
 *         schema:
 *           type: string
 *         description: 商店 UUID
 *     responses:
 *       200:
 *         description: 回傳商店資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShopResponseDTO'
 */

/**
 * @swagger
 * /user/{uuid}/shop:
 *   post:
 *     summary: 建立指定使用者的商店
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: 使用者 UUID
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
 */

/**
 * @swagger
 * /user/{uuid}/shop/{shopUuid}:
 *   patch:
 *     summary: 更新指定使用者的商店
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: 使用者 UUID
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
 *             $ref: '#/components/schemas/ShopUpdateDTO'
 *     responses:
 *       200:
 *         description: 更新成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShopResponseDTO'
 */
