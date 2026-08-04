// Migrasi data orders + site_content dari Neon (DATABASE_URL) ke Supabase.
// Jalankan SETELAH supabase/schema.sql dijalankan di SQL Editor:
//   node scripts/migrate-neon-to-supabase.mjs
import { readFileSync } from 'node:fs';
import { neon } from '@neondatabase/serverless';
import { createClient } from '@supabase/supabase-js';

function loadEnv() {
  const vars = {};
  for (const line of readFileSync(new URL('../.env', import.meta.url), 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !(m[1] in process.env)) vars[m[1]] = m[2];
  }
  return { ...vars, ...process.env };
}

const env = loadEnv();
if (!env.DATABASE_URL || !env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
  console.error('Butuh DATABASE_URL, SUPABASE_URL, SUPABASE_ANON_KEY di .env');
  process.exit(1);
}

const sql = neon(env.DATABASE_URL);
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

const { error: probeError } = await supabase.from('orders').select('id').limit(1);
if (probeError) {
  console.error('Tabel "orders" belum ada di Supabase.');
  console.error('Jalankan dulu supabase/schema.sql di SQL Editor, lalu ulangi perintah ini.');
  console.error(probeError.message);
  process.exit(1);
}

// ---------- 1. Orders ----------
const neonOrders = await sql`select * from orders order by id`;
console.log(`Orders di Neon: ${neonOrders.length}`);

const BATCH = 100;
for (let i = 0; i < neonOrders.length; i += BATCH) {
  const batch = neonOrders.slice(i, i + BATCH).map((r) => ({
    id: r.id,
    order_date: r.order_date,
    service_name: r.service_name,
    price: r.price,
    customer_name: r.customer_name,
    phone: r.phone,
    address: r.address,
    note: r.note ?? '',
    client_id: r.client_id,
    status: r.status,
  }));
  const { error } = await supabase.from('orders').upsert(batch, { onConflict: 'id' });
  if (error) {
    console.error(`Batch orders ${i} gagal:`, error.message);
    process.exit(1);
  }
}
console.log('Orders tersinkron ke Supabase.');

// ---------- 2. site_content (konten hasil edit di panel admin) ----------
const { error: probeContent } = await supabase.from('site_content').select('key').limit(1);
if (probeContent) {
  console.error('Tabel "site_content" belum ada — jalankan supabase/schema.sql dulu.');
  process.exit(1);
}

const neonContent = await sql`select key, payload, updated_at from site_content`;
console.log(`site_content di Neon: ${neonContent.length} key`);

const contentBatch = neonContent.map((r) => ({
  key: r.key,
  payload: r.payload,
  updated_at: r.updated_at,
}));
if (contentBatch.length > 0) {
  const { error } = await supabase.from('site_content').upsert(contentBatch, { onConflict: 'key' });
  if (error) {
    console.error('Sinkron site_content gagal:', error.message);
    process.exit(1);
  }
  console.log(`site_content tersinkron: ${contentBatch.map((c) => c.key).join(', ')}`);
}

// ---------- 3. Verifikasi ----------
const { count, error: countError } = await supabase
  .from('orders')
  .select('id', { count: 'exact', head: true });
if (countError) {
  console.error('Verifikasi gagal:', countError.message);
  process.exit(1);
}
console.log(`Total orders di Supabase: ${count}`);
console.log('Migrasi selesai.');
