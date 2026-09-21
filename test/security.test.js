const { test, before, after } = require('node:test');
const assert = require('node:assert');

process.env.JWT_SECRET = 'test-jwt-secret';
process.env.PAYMENT_GATEWAY_API_KEY = 'test-payment-key';

const { createApp } = require('../src/app');

let server;
let base;

before(async () => {
  const app = await createApp();

  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });

  base = `http://localhost:${server.address().port}`;
});

after(() => server.close());

async function login(username, password) {
  return fetch(`${base}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
}

test('user tidak dapat transfer dari akun milik pengguna lain', async () => {
  const loginRes = await login('budi', 'budi123');
  const { token } = await loginRes.json();

  const res = await fetch(`${base}/api/transfer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      from: 'sari',
      to: 'andi',
      amount: 1000,
    }),
  });

  assert.strictEqual(res.status, 403);
});

test('transfer dengan nominal negatif ditolak', async () => {
  const loginRes = await login('budi', 'budi123');
  const { token } = await loginRes.json();

  const res = await fetch(`${base}/api/transfer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      from: 'budi',
      to: 'sari',
      amount: -1000,
    }),
  });

  assert.strictEqual(res.status, 400);
});