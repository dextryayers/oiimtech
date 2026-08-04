import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function getClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('SUPABASE_URL / SUPABASE_ANON_KEY belum diset di environment');
  }
  if (!client) {
    client = createClient(url, key);
  }
  return client;
}

/** Tabel dibuat via supabase/schema.sql di SQL Editor. No-op untuk kompatibilitas. */
export async function ensureSchema(): Promise<void> {
  return;
}

export interface OrderRow {
  id: number;
  order_date: string;
  service_name: string;
  price: number;
  customer_name: string;
  phone: string;
  address: string;
  note: string;
  client_id: string;
  status: string;
}

export interface Order {
  id: number;
  orderDate: string;
  serviceName: string;
  price: number;
  customerName: string;
  phone: string;
  address: string;
  note: string;
  status: string;
}

export const ORDER_STATUSES = ['Pending', 'Pesanan Diterima', 'Diproses', 'Selesai', 'Dibatalkan'] as const;

export function toOrder(row: OrderRow): Order {
  const rawDate = row.order_date as unknown;
  return {
    id: Number(row.id),
    orderDate:
      rawDate instanceof Date ? rawDate.toISOString() : String(rawDate),
    serviceName: row.service_name,
    price: Number(row.price),
    customerName: row.customer_name,
    phone: row.phone,
    address: row.address,
    note: row.note,
    status: row.status,
  };
}

function mapRows(data: OrderRow[] | null): Order[] {
  return (data ?? []).map(toOrder);
}

export async function listOrdersByClient(clientId: string): Promise<Order[]> {
  const { data, error } = await getClient()
    .from('orders')
    .select('*')
    .eq('client_id', clientId)
    .order('id', { ascending: false })
    .limit(100);
  if (error) throw error;
  return mapRows(data);
}

export async function createOrder(input: {
  serviceName: string;
  price: number;
  customerName: string;
  phone: string;
  address: string;
  note: string;
  clientId: string;
}): Promise<Order> {
  const { data, error } = await getClient()
    .from('orders')
    .insert({
      service_name: input.serviceName,
      price: input.price,
      customer_name: input.customerName,
      phone: input.phone,
      address: input.address,
      note: input.note,
      client_id: input.clientId,
      status: 'Pending',
    })
    .select()
    .single();
  if (error) throw error;
  return toOrder(data as OrderRow);
}

export async function deleteOrder(id: number, clientId: string): Promise<boolean> {
  const { data, error } = await getClient()
    .from('orders')
    .delete()
    .eq('id', id)
    .eq('client_id', clientId)
    .select('id');
  if (error) throw error;
  return (data?.length ?? 0) > 0;
}

export async function listAllOrders(limit = 200): Promise<Order[]> {
  const { data, error } = await getClient()
    .from('orders')
    .select('*')
    .order('id', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return mapRows(data);
}

export async function updateOrderStatus(id: number, status: string): Promise<Order | null> {
  const { data, error } = await getClient()
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) {
    if ((error as { code?: string }).code === 'PGRST116') return null;
    throw error;
  }
  if (!data) return null;
  return toOrder(data as OrderRow);
}

export async function deleteOrderById(id: number): Promise<boolean> {
  const { data, error } = await getClient()
    .from('orders')
    .delete()
    .eq('id', id)
    .select('id');
  if (error) throw error;
  return (data?.length ?? 0) > 0;
}

export async function readContent(key: string): Promise<unknown | null> {
  const { data, error } = await getClient()
    .from('site_content')
    .select('payload')
    .eq('key', key)
    .maybeSingle();
  if (error) throw error;
  if (!data || data.payload === null || data.payload === undefined) return null;
  const payload = data.payload;
  if (typeof payload === 'string') {
    try {
      return JSON.parse(payload);
    } catch {
      return null;
    }
  }
  return payload;
}

export async function upsertContent(key: string, payload: unknown): Promise<void> {
  const { error } = await getClient()
    .from('site_content')
    .upsert({ key, payload, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  if (error) throw error;
}

export interface CommentRow {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  question: string;
  created_at: string;
}

export interface Comment {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  question: string;
  createdAt: string;
}

function toComment(row: CommentRow): Comment {
  const rawDate = row.created_at as unknown;
  return {
    id: Number(row.id),
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    address: row.address,
    question: row.question,
    createdAt: rawDate instanceof Date ? rawDate.toISOString() : String(rawDate),
  };
}

export async function createComment(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  question: string;
}): Promise<Comment> {
  const { data, error } = await getClient()
    .from('comments')
    .insert({
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      phone: input.phone,
      address: input.address,
      question: input.question,
    })
    .select()
    .single();
  if (error) throw error;
  return toComment(data as CommentRow);
}

export async function listComments(limit = 200): Promise<Comment[]> {
  const { data, error } = await getClient()
    .from('comments')
    .select('*')
    .order('id', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map(toComment);
}

export async function deleteCommentById(id: number): Promise<boolean> {
  const { data, error } = await getClient()
    .from('comments')
    .delete()
    .eq('id', id)
    .select('id');
  if (error) throw error;
  return (data?.length ?? 0) > 0;
}
