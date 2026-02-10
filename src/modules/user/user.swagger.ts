/**
 * @swagger
 * tags:
 *   - name: User
 *     description: 使用者管理
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     UserCreateDTO:
 *       type: object
 *       required:
 *         - account
 *         - password
 *       properties:
 *         account:
 *           type: string
 *           description: 帳號（必須為唯一）
 *           example: test123
 *         password:
 *           type: string
 *           description: 使用者密碼
 *           example: 123
 *         name:
 *           type: string
 *           description: 使用者名稱（未填寫將用亂數表示）
 *         nickname:
 *           type: string
 *           description: 綽號
 *         introduction:
 *           type: string
 *           description: 介紹文字
 *         balance:
 *           type: string
 *           description: 餘額，使用string避免浮點誤差
 *         currency:
 *           type: string
 *           default: TWD
 *           description: 幣別
 *         language:
 *           type: string
 *           default: zh-TW
 *           description: 語言（IETF language tag）
 *         statusName:
 *           type: string
 *           default: active
 *           description: 狀態名稱
 *         roleName:
 *           type: string
 *           default: user
 *           description: 角色名稱
 *
 *     UserUpdateDTO:
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *           description: 新密碼
 *         name:
 *           type: string
 *           description: 使用者名稱
 *         nickname:
 *           type: string
 *           description: 綽號
 *         introduction:
 *           type: string
 *           description: 介紹文字
 *         balance:
 *           type: string
 *           description: 餘額，使用string避免浮點誤差
 *         currency:
 *           type: string
 *           description: 幣別
 *         language:
 *           type: string
 *           description: 語言（IETF language tag）
 *         statusName:
 *           type: string
 *           description: 狀態名稱（例如：active、banned）
 *         roleName:
 *           type: string
 *           description: 角色名稱（例如：user、admin、partner）
 *
 *     UserChangePasswordDTO:
 *       type: object
 *       required:
 *         - oldPassword
 *         - newPassword
 *       properties:
 *         oldPassword:
 *           type: string
 *           description: 舊密碼
 *         newPassword:
 *           type: string
 *           description: 新密碼
 *
 *     UserResponseDTO:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string
 *           format: uuid
 *           description: 使用者 UUID
 *         account:
 *           type: string
 *           description: 帳號
 *         name:
 *           type: string
 *           description: 使用者名稱
 *         nickname:
 *           type: string
 *           description: 綽號
 *         introduction:
 *           type: string
 *           description: 介紹文字
 *           nullable: true
 *         balance:
 *           type: string
 *           description: 餘額，使用string避免浮點誤差
 *         currency:
 *           type: string
 *           description: 幣別
 *         language:
 *           type: string
 *           description: 語言（IETF language tag）
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 註冊時間
 *         statusName:
 *           type: string
 *           description: 狀態名稱
 *         roleName:
 *           type: string
 *           description: 角色名稱
 *
 *   parameters:
 *     Currency:
 *       in: query
 *       name: currency
 *       schema:
 *         type: string
 *       description: 幣別
 *     StatusName:
 *       in: query
 *       name: statusName
 *       schema:
 *         type: string
 *       description: 狀態名稱
 *     RoleName:
 *       in: query
 *       name: roleName
 *       schema:
 *         type: string
 *       description: 角色名稱
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
 *       description: 排序方式ASC/DESC（預設 ASC）
 */

/**
 * @swagger
 * /user:
 *   post:
 *     tags: [User]
 *     summary: 創建使用者，僅admin可用，常規創建流程走/auth/sign-up
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateDTO'
 *     responses:
 *       200:
 *         description: 創建成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDTO'
 *
 *   get:
 *     tags: [User]
 *     summary: 查詢使用者列表，僅admin可用
 *     parameters:
 *       - $ref: '#/components/parameters/Currency'
 *       - $ref: '#/components/parameters/StatusName'
 *       - $ref: '#/components/parameters/RoleName'
 *       - $ref: '#/components/parameters/CreatedFrom'
 *       - $ref: '#/components/parameters/CreatedTo'
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *       - $ref: '#/components/parameters/OrderBy'
 *       - $ref: '#/components/parameters/OrderDirection'
 *     responses:
 *       200:
 *         description: 回傳使用者列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponseDTO'
 */

/**
 * @swagger
 * /user/{uuid}:
 *   get:
 *     tags: [User]
 *     summary: 查詢單一使用者
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: 使用者 UUID
 *     responses:
 *       200:
 *         description: 回傳使用者資料
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDTO'
 *
 *   patch:
 *     tags: [User]
 *     summary: 修改使用者資料
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
 *             $ref: '#/components/schemas/UserUpdateDTO'
 *     responses:
 *       200:
 *         description: 修改成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDTO'
 */

/**
 * @swagger
 * /account/{uuid}/password:
 *   patch:
 *     tags: [User]
 *     summary: 修改密碼（需本人或 admin）
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
 *             $ref: '#/components/schemas/UserChangePasswordDTO'
 *     responses:
 *       200:
 *         description: 修改成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDTO'
 */
