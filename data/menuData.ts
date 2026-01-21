export type MenuCategory = "Kebaplar" | "Dönerler" | "Pideler" | "Tatlılar" | "İçecekler";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: MenuCategory;
  image: string;
  rating?: number;
}

export const MENU_ITEMS: MenuItem[] = [
  { id: "k-01", name: "Adana Kebap", price: 320, description: "Zırh kıyması, özel baharatlar, közlenmiş sebzeler.", category: "Kebaplar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/adana-porsiyon.jpg", rating: 5 },
  { id: "k-02", name: "Urfa Kebap", price: 320, description: "Acısız zırh kıyması, özel sunum.", category: "Kebaplar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/urfa-porsiyon.jpg", rating: 5 },
  { id: "d-01", name: "Et Döner", price: 280, description: "Yaprak et döner, pilav ve salata ile.", category: "Dönerler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/porsiyon-et-doner.jpg", rating: 5 },
  { id: "p-01", name: "Kıymalı Pide", price: 240, description: "Özel hamur, dana kıyma, taş fırın lezzeti.", category: "Pideler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kiymali-pide.jpg", rating: 5 },
  { id: "t-01", name: "Künefe", price: 180, description: "Hatay usulü bol peynirli künefe.", category: "Tatlılar", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kunefe.jpeg", rating: 5 },
  { id: "i-01", name: "Ayran", price: 40, description: "Bol köpüklü yayık ayranı.", category: "İçecekler", image: "https://raw.githubusercontent.com/hakkurgithub/images/main/acik-ayran.jpg", rating: 5 }
];

export const MENU_CATEGORIES: MenuCategory[] = ["Kebaplar", "Dönerler", "Pideler", "Tatlılar", "İçecekler"];