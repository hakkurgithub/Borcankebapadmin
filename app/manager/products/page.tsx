// app/manager/products/page.tsx
import { db } from "@/db/drizzle"
import { products } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// Server Actions
async function updateProduct(formData: FormData) {
  "use server"
  
  try {
    const id = parseInt(formData.get("id") as string)
    const name = formData.get("name") as string
    const priceStr = formData.get("price") as string
    const price = priceStr // Direkt TL cinsinden string olarak kaydet (numeric type)
    const category = formData.get("category") as string
    const description = formData.get("description") as string || ''
    const image = formData.get("image") as string || ''
    
    console.log('✅ Updating product:', { id, name, price, category, image })
    
    await db.update(products)
      .set({ 
        name, 
        price, 
        category,
        description,
        image 
      })
      .where(eq(products.id, id))
    
    console.log('✅ Product updated successfully:', id)
    revalidatePath("/manager/products")
  } catch (error) {
    console.error('❌ Error updating product:', error)
  }
}

async function toggleProductStatus(formData: FormData) {
  "use server"
  
  try {
    const id = parseInt(formData.get("id") as string)
    const currentStatus = formData.get("currentStatus") === "true"
    
    console.log('🔄 Toggling product status:', { id, currentStatus, newStatus: !currentStatus })
    
    await db.update(products)
      .set({ isActive: currentStatus ? 0 : 1 })
      .where(eq(products.id, id))
    
    console.log('✅ Product status toggled successfully:', id)
    revalidatePath("/manager/products")
  } catch (error) {
    console.error('❌ Error toggling product status:', error)
  }
}

export default async function ManagerProductsPage() {
  // Get all products from database
  const allProducts = await db.select().from(products).orderBy(products.id)
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Ürün Yönetimi</h1>
        <a 
          href="/manager" 
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          ← Panele Dön
        </a>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid gap-6">
          {allProducts.map((product) => (
            <div 
              key={product.id} 
              className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <form action={updateProduct} className="space-y-4">
                <input type="hidden" name="id" value={product.id} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`name-${product.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Ürün Adı
                    </label>
                    <input
                      id={`name-${product.id}`}
                      type="text"
                      name="name"
                      defaultValue={product.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`price-${product.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Fiyat (₺)
                    </label>
                    <input
                      id={`price-${product.id}`}
                      type="number"
                      name="price"
                      defaultValue={parseFloat(product.price as any).toFixed(2)}
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`category-${product.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori
                    </label>
                    <select
                      id={`category-${product.id}`}
                      name="category"
                      defaultValue={product.category || 'Döner'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Kebaplar & Izgaralar">Kebaplar & Izgaralar</option>
                      <option value="Pide & Lahmacun">Pide & Lahmacun</option>
                      <option value="Döner">Döner</option>
                      <option value="Dürüm">Dürüm</option>
                      <option value="Çorbalar">Çorbalar</option>
                      <option value="Yan Ürünler">Yan Ürünler</option>
                      <option value="Tatlılar">Tatlılar</option>
                      <option value="İçecekler">İçecekler</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Durum
                    </label>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-2 rounded-lg font-medium ${
                        product.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.isActive ? '✓ Aktif' : '✗ Pasif'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor={`image-${product.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Resim URL
                  </label>
                  <input
                    id={`image-${product.id}`}
                    type="url"
                    name="image"
                    defaultValue={product.image || ''}
                    placeholder="https://raw.githubusercontent.com/..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {product.image && (
                    <div className="mt-2">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="h-20 w-20 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor={`description-${product.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Açıklama
                  </label>
                  <textarea
                    id={`description-${product.id}`}
                    name="description"
                    defaultValue={product.description || ''}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    💾 Kaydet
                  </button>
                </div>
              </form>
              
              {/* Toggle Status Form - Ayrı form olarak */}
              <form action={toggleProductStatus} className="inline">
                <input type="hidden" name="id" value={product.id} />
                <input type="hidden" name="currentStatus" value={product.isActive ? "true" : "false"} />
                <button
                  type="submit"
                  className={`px-6 py-2 rounded-lg font-medium ${
                    product.isActive
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {product.isActive ? '🔴 Pasif Yap' : '🟢 Aktif Yap'}
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}