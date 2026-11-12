import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Gita Exam Management Platform API',
    version: '1.0.0',
    description: `
Official RESTful API documentation for the National Gita Leadership Contest & Examination Platform.

### Features
- **JWT Authentication & RBAC**: Access & Refresh token rotation, 9 role tiers.
- **Exam Management**: Multi-stage examinations, availability windows, instructions.
- **Question Bank**: Bhagavad Gita MCQs (18 Chapters, Sanskrit verses & translations), answer hiding before submission.
- **Secure Exam Attempts**: Server-enforced timers, autosave, idempotent auto-submission.
- **Server Evaluation**: Score calculation, pass/fail thresholds, stage promotions.
- **Certificates**: Cryptographic verification codes and tamper-proof merit records.
- **Books & Stock Guard**: Negative Stock Protection for book distribution.
- **Donations & 80G Receipts**: Philanthropic sponsorship with IT Act 80G tax receipts.
- **Payments**: Order generation and secure webhook verification.
    `,
    contact: {
      name: 'Gita Examination Directorate Support',
      email: 'support@gitacontest.in',
      url: 'https://gitacontest.in',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000/api/v1',
      description: 'Local Development Server',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT access token (e.g. Bearer <token>)',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);
