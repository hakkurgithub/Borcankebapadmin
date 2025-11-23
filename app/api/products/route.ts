import { NextRequest, NextResponse } from 'next/server'
import { getAllProducts, getProductsByCategory } from '../../../lib/products'

// Bu satır çok önemli! API'nin her seferinde çalışmasını sağlar.
export const dynamic = 'force-dynamic'
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    // 🛠️ DÜZELTME BURADA:
    // TypeScript'in hata vermemesi için "any[]" kullanıyoruz.
    // Bu sayede veritabanından ne gelirse gelsin kabul eder.
    let products: any[] = [];
    
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
    const productsWithFormattedPrices = products.map((product: any) => ({
      ...product,
      // Fiyatı sayıya çevirirken hata olmaması için kontroller
      priceInLira: parseFloat(product.price || 0), 
      formattedPrice: `${Math.round(parseFloat(product.price || 0))} ₺`
    }))
    
    return NextResponse.json({
      success: true,
      data: productsWithFormattedPrices
    }, {
        status: 200,
        headers: {
            'Cache-Control': 'no-store, max-age=0',
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