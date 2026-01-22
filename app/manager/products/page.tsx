"use client";

import { useEffect, useState } from "react";
import {
  addProduct,
  deleteProduct,
  updateProduct,
  getManagerProducts,
  toggleProductStatus,
  ProductDTO,
} from "../../../lib/actions";

export default function ManagerProductsPage() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    description: "",
    category: "",
    image: "",
    price: 0,
  });

  const [isEditing, setIsEditing] = useState(false);

  /* ===============================
     LOAD PRODUCTS
  ================================ */
  async function loadProducts() {
    setLoading(true);
    const data = await getManagerProducts();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  /* ===============================
     SUBMIT
  ================================ */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isEditing) {
      await updateProduct(formData.id, {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        image: formData.image,
        price: formData.price,
      });
    } else {
      await addProduct({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        image: formData.image,
        price: formData.price,
      });
    }

    setFormData({
      id: 0,
      name: "",
      description: "",
      category: "",
      image: "",
      price: 0,
    });

    setIsEditing(false);
    loadProducts();
  }

  /* ===============================
     RENDER
  ================================ */
  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Ürün Yönetimi</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Ürün adı"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <input
          placeholder="Kategori"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Fiyat"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
        />
        <button type="submit">
          {isEditing ? "Güncelle" : "Ekle"}
        </button>
      </form>

      <hr />

      {products.map((p) => (
        <div key={p.id} style={{ marginBottom: 10 }}>
          <b>{p.name}</b> – {p.price} ₺ –{" "}
          {p.isPopular ? "Aktif" : "Pasif"}

          <button
            onClick={() =>
              toggleProductStatus(p.id, !p.isPopular).then(loadProducts)
            }
          >
            Durum Değiştir
          </button>

          <button
            onClick={() => {
              setIsEditing(true);
              setFormData({
                id: p.id,
                name: p.name,
                description: p.description ?? "",
                category: p.category,
                image: p.image ?? "",
                price: p.price,
              });
            }}
          >
            Düzenle
          </button>

          <button
            onClick={() => deleteProduct(p.id).then(loadProducts)}
          >
            Sil
          </button>
        </div>
      ))}
    </div>
  );
}
