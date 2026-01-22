import rateLimit from 'express-rate-limit'

export const rateLimitScore = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 30, // 30 requests por IP nesse minuto
  message: { message: 'Muitas requisições, tente novamente em instantes' }
})
