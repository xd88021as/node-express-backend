import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { ENV } from '@config/env';

const isDev = ENV.ENVIRONMENT === 'dev';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: `API`,
      version: '1.0.0',
      description: `

## 驗證方式
- 請在 Authorization header 帶入：Bearer <JWT>
- 多數 API 需要 JWT

## Token 續簽行為
- Token 有效期為 15 分鐘
- 當 Token 接近過期時（目前門檻：2 分鐘），呼叫需要授權的 API 會自動簽發新 Token，舊的 Token 將失效
- 新 Token 會回傳在 response headers：\`Authorization\` 與 \`X-Access-Token\`

## admin測試帳號 
- 因admin帳號目前不提供申請，因此直接提供一組用以測試功能，一般帳號請直接用註冊的
- 帳號：admin01 密碼：123
      `,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            '使用 Authorization: Bearer <JWT>。當 token 接近過期時，API 可能在回應 header 帶回新 token。',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: isDev ? ['src/modules/**/*.swagger.ts'] : ['dist/modules/**/*.swagger.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customSiteTitle: `wes-side-project API Docs`,
    })
  );
}
