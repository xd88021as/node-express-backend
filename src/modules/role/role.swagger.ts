/**
 * @swagger
 * tags:
 *   - name: Role
 *     description: 角色管理
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
 *           description: 角色名稱（必須唯一）
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
 *           description: 既有角色名稱
 *           example: admin
 *         newName:
 *           type: string
 *           description: 新角色名稱
 *           example: tester
 *
 *     RoleResponseDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: 角色名稱
 *           example: admin
 */

/**
 * @swagger
 * /role:
 *   post:
 *     summary: 建立角色
 *     tags: [Role]
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
 *     summary: 取得所有角色
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: 成功回傳角色列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoleResponseDTO'
 *
 *   patch:
 *     summary: 更新角色名稱
 *     tags: [Role]
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
