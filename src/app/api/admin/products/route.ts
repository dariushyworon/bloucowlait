import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

function checkAuth(req: NextRequest) {
  const pw = req.headers.get('x-admin-password');
  return pw === process.env.ADMIN_PASSWORD;
}

// GET — list all products
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('id');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST — create a new product
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const body = await req.json();
  const { data, error } = await supabaseAdmin
    .from('products')
    .insert([body])
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// PUT — update an existing product
export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const body = await req.json();
  const { id, ...fields } = body;
  const { data, error } = await supabaseAdmin
    .from('products')
    .update(fields)
    .eq('id', id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE — remove a product by id
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const { id } = await req.json();
  const { error } = await supabaseAdmin
    .from('products')
    .delete()
    .eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
