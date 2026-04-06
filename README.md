# Inventaris Pasokan Pupuk

Starter project Next.js untuk Admin Asisten Pemupukan dan Krani Tanaman.

## Stack
- Next.js App Router
- Prisma + PostgreSQL
- Auth.js / NextAuth Credentials
- Tailwind CSS

## Cara Menjalankan

1. Masuk ke folder project.
2. Salin file environment.
3. Install dependency.
4. Generate Prisma client.
5. Jalankan migration dan seed.
6. Jalankan development server.

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

## Akun Seed
- Admin: admin@pupuk.local / admin123
- Krani: krani@pupuk.local / krani123

## Catatan
- Jalankan perintah Prisma dari folder project ini, bukan dari folder parent.
- Jika TypeScript di VS Code masih menampilkan cache error lama, jalankan `TypeScript: Restart TS Server`.
- Untuk logout/login dan route protection, project ini memakai Auth.js versi beta yang sesuai dengan pola `auth`, `handlers`, `signIn`, dan `signOut` di file `auth.ts`.
