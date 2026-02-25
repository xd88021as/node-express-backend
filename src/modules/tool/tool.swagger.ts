/**
 * @swagger
 * tags:
 *   - name: Tool
 *     description: 小工具
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ToolCryptoDTO:
 *       type: object
 *       required:
 *         - plaintext
 *       properties:
 *         plaintext:
 *           type: string
 *           description: 明文
 *
 *     ToolCryptoResponseDTO:
 *       type: object
 *       properties:
 *         ciphertext:
 *           type: string
 *           description: 加密文字
 */

/**
 * @swagger
 * /tool/crypto:
 *   post:
 *     summary: 加密明文
 *     tags: [Tool]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ToolCryptoDTO'
 *     responses:
 *       200:
 *         description: 加密成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ToolCryptoResponseDTO'
 */
