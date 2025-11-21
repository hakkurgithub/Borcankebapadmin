import { NextRequest, NextResponse } from 'next/server'
import { getAllProducts, getProductsByCategory } from '../../../lib/products'
import { Product } from '../../../db/schema'

// Bu satır çok önemli! API'nin her seferinde çalışmasını sağlar, önbelleğe almaz.
export const dynamic = 'force-dynamic'
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    let products
    
    if (category) {
      products = await getProductsByCategory(category)
    } else {
      products = await getAllProducts()
    }
    
    // Eğer ürünler boş gelirse veya undefined ise güvenli bir diziye çevir
    if (!products) {
         products = [];
    }

    // Fiyatları formatla
    const productsWithFormattedPrices = products.map((product: Product) => ({
      ...product,
      priceInLira: parseFloat(product.price as any), 
      formattedPrice: `${Math.round(parseFloat(product.price as any))} ₺`
    }))
    
    return NextResponse.json({
      success: true,
      data: productsWithFormattedPrices
    }, {
        status: 200,
        headers: {
            'Cache-Control': 'no-store, max-age=0', // Tarayıcıya "bunu saklama" der
        }
    })
    
  } catch (error) {
    console.error('Products API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Ürünler alınırken bir hata oluştu' 
      },
      { status: 500 }
    )
  }
}