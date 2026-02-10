/**
 * @swagger
 * tags:
 *   - name: UserStatus
 *     description: 使用者狀態管理
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RoleCreateDTO:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: 使用者狀態名稱（必須唯一）
 *           example: admin
 *
 *     RoleUpdateDTO:
 *       type: object
 *       required:
 *         - targetName
 *         - newName
 *       properties:
 *         targetName:
 *           type: string
 *           description: 既有使用者狀態名稱
 *           example: admin
 *         newName:
 *           type: string
 *           description: 新使用者狀態名稱
 *           example: tester
 *
 *     RoleResponseDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: 使用者狀態名稱
 *           example: admin
 */

/**
 * @swagger
 * /user-status:
 *   post:
 *     summary: 建立使用者狀態
 *     tags: [UserStatus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleCreateDTO'
 *     responses:
 *       200:
 *         description: 建立成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponseDTO'
 *
 *   get:
 *     summary: 取得所有使用者狀態
 *     tags: [UserStatus]
 *     responses:
 *       200:
 *         description: 成功回傳使用者狀態列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoleResponseDTO'
 *
 *   patch:
 *     summary: 更新使用者狀態名稱
 *     tags: [UserStatus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleUpdateDTO'
 *     responses:
 *       200:
 *         description: 更新成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponseDTO'
 */
