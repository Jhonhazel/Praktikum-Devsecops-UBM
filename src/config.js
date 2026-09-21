// ============================================================
//  PERINGATAN: aplikasi ini SENGAJA dibuat rentan untuk praktikum.
//  Jangan gunakan kode ini (atau pola di dalamnya) di production.
//  Semua "secret" di bawah ini PALSU (hanya untuk simulasi).
// ============================================================

module.exports = {
  port: process.env.PORT || 3000,

  // Secret untuk menandatangani JWT
  jwtSecret: 'kX9mQ2vLp4RtY8wZ3nB6cD1fH7jS5aE0',

  // API key payment gateway (palsu)
  paymentGatewayApiKey: process.env.PAYMENT_GATEAWAY_API_KEY,

  // Pengaturan default aplikasi
  defaultSettings: {
    currency: 'IDR',
    dailyTransferLimit: 10000000,
    notifications: { email: true, sms: false },
  },
};
