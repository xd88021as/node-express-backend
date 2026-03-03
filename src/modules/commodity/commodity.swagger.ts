/**
 * @swagger
 * tags:
 *   - name: Commodity
 *     description: 商品管理
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CommodityCreateDTO:
 *       type: object
 *       required:
 *         - name
 *         - currency
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: 商品名稱
 *         introduction:
 *           type: string
 *           description: 商品介紹
 *         currency:
 *           type: string
 *           description: 幣別
 *           default: TWD
 *         price:
 *           type: string
 *           description: 價格
 *
 *     CommodityUpdateDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: 商品名稱
 *         introduction:
 *           type: string
 *           description: 商品介紹
 *         currency:
 *           type: string
 *           description: 幣別
 *         price:
 *           type: string
 *           description: 價格
 *
 *     CommodityResponseDTO:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string
 *         name:
 *           type: string
 *         introduction:
 *           type: string
 *         currency:
 *           type: string
 *         price:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         shopUuid:
 *           type: string
 *         shopName:
 *           type: string
 *
 *     CommodityPaginationResponseDTO:
 *       type: object
 *       properties:
 *         commodities:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CommodityResponseDTO'
 *         total:
 *           type: integer
 *           description: 總筆數
 *
 *   parameters:
 *     ShopUuid:
 *       in: query
 *       name: shopUuid
 *       schema:
 *         type: string
 *       description: 商店 UUID
 *     ShopName:
 *       in: query
 *       name: shopName
 *       schema:
 *         type: string
 *       description: 商店名稱
 *     Currency:
 *       in: query
 *       name: currency
 *       schema:
 *         type: string
 *       description: 幣別
 *     CreatedFrom:
 *       in: query
 *       name: createdFrom
 *       schema:
 *         type: string
 *         format: date-time
 *       description: 建立起始時間
 *     CreatedTo:
 *       in: query
 *       name: createdTo
 *       schema:
 *         type: string
 *         format: date-time
 *       description: 建立結束時間
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
 *       description: 排序方式 ASC/DESC（預設 ASC）
 */

/**
 * @swagger
 * /commodity:
 *   get:
 *     summary: 查詢商品列表
 *     tags: [Commodity]
 *     security: []
 *     parameters:
 *       - $ref: '#/components/parameters/ShopUuid'
 *       - $ref: '#/components/parameters/ShopName'
 *       - $ref: '#/components/parameters/Currency'
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
 *               $ref: '#/components/schemas/CommodityPaginationResponseDTO'
 */

/**
 * @swagger
 * /commodity/{commodityUuid}:
 *   get:
 *     summary: 查詢單一商品
 *     tags: [Commodity]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: commodityUuid
 *         required: true
 *         schema:
 *           type: string
 *         description: 商品 UUID
 *     responses:
 *       200:
 *         description: 回傳商品資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommodityResponseDTO'
 */

/**
 * @swagger
 * /user/{userUuid}/shop/{shopUuid}/commodity:
 *   post:
 *     summary: 在指定商店建立商品（僅admin或本人的商店）
 *     tags: [Commodity]
 *     parameters:
 *       - in: path
 *         name: userUuid
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
 *             $ref: '#/components/schemas/CommodityCreateDTO'
 *     responses:
 *       200:
 *         description: 建立成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommodityResponseDTO'
 */

/**
 * @swagger
 * /user/{userUuid}/shop/{shopUuid}/commodity/{commodityUuid}:
 *   patch:
 *     summary: 更新指定商店的商品（僅admin或本人的商店）
 *     tags: [Commodity]
 *     parameters:
 *       - in: path
 *         name: userUuid
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
 *             $ref: '#/components/schemas/CommodityUpdateDTO'
 *     responses:
 *       200:
 *         description: 更新成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommodityResponseDTO'
 */
