/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: 使用者驗證
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthSignInDTO:
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
 *           description: 密碼
 *           example: 123
 *
 *     AuthSignUpDTO:
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
 *           description: 密碼
 *           example: 123
 *         currency:
 *           type: string
 *           default: TWD
 *           description: 幣別
 *         language:
 *           type: string
 *           default: zh-TW
 *           description: 語言（IETF language tag）
 *
 *     AuthResponseDTO:
 *       type: object
 *       properties:
 *         playerUuid:
 *           type: string
 *           description: 玩家 UUID
 *         balance:
 *           type: string
 *           description: 餘額，使用string避免浮點誤差
 *         currency:
 *           type: string
 *           description: 幣別
 *         exchangeRate:
 *           type: string
 *           description: 匯率，使用string避免浮點誤差
 *         language:
 *           type: string
 *           description: 語言（IETF language tag）
 *         token:
 *           type: string
 *           description: 驗證成功後回傳的 JWT Token
 */

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: 使用者登入
 *     tags: [Auth]
 *     security: []  # 不需要 JWT 驗證
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthSignInDTO'
 *     responses:
 *       200:
 *         description: 登入成功，回傳 JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponseDTO'
 */

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: 使用者註冊
 *     tags: [Auth]
 *     security: []  # 不需要 JWT 驗證
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthSignUpDTO'
 *     responses:
 *       200:
 *         description: 註冊成功，回傳 JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponseDTO'
 */
