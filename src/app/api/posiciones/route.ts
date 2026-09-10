import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';
export const revalidate = 60;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const torneo_id = searchParams.get('torneo_id');
    const categoria_grupo_id = searchParams.get('categoria_grupo_id');

    if (!torneo_id || !categoria_grupo_id) {
      return NextResponse.json(
        { error: 'Parámetros torneo_id y categoria_grupo_id son obligatorios' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('v_tabla_posiciones')
      .select('*')
      .eq('torneo_id', torneo_id)
      .eq('categoria_grupo_id', categoria_grupo_id)
      .order('puntos', { ascending: false })
      .order('diferencia_goles', { ascending: false })
      .order('goles_favor', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
