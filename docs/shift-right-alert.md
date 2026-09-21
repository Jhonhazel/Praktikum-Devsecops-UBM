# Shift Right Security Alert

## Event yang Dipantau

Aplikasi mencatat setiap kegagalan login menggunakan event:

`LOGIN_FAILED`

Log mencakup:

- timestamp
- username
- source IP

Password, token, dan secret tidak dicatat ke log.

## Alert Rule

Alert akan dipicu apabila terdapat:

- minimal 100 event `LOGIN_FAILED`
- dalam jangka waktu 5 menit

Pseudo-rule:

IF count(LOGIN_FAILED) >= 100
WITHIN 5 minutes
THEN trigger HIGH severity alert

## Alert Information

Alert minimal berisi:

- jumlah login gagal
- waktu awal dan akhir periode
- source IP
- username yang menjadi target
- severity

## Severity

HIGH

## Response

Jika alert terpicu:

1. Security Champion atau DevOps menerima notifikasi.
2. Tim memeriksa source IP dan username target.
3. Tim menentukan apakah pola tersebut merupakan brute-force attack.
4. Jika perlu, IP diblokir atau akun terkait diberi perlindungan tambahan.
5. Temuan digunakan sebagai feedback untuk memperbaiki kontrol keamanan.