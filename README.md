# Borcan Kebap - NextAuth & Drizzle ORM Kurulum Kılavuzu

Bu proje NextAuth (kimlik doğrulama) ve Drizzle ORM (veritabanı) ile yapılandırılmıştır.

## 🚀 Kurulum Adımları

### 1. Ortam Değişkenlerini Ayarlayın

Projenin kök dizininde `.env.local` adında bir dosya oluşturun ve `.env.example` dosyasını referans alarak aşağıdaki değişkenleri doldurun:

#### NextAuth Secret Anahtarı

Güvenli bir anahtar oluşturmak için terminalde aşağıdaki komutu çalıştırın:

```bash
# Terminal'de çalıştırın
openssl rand -base64 32
```

Çıkan sonucu kopyalayıp `.env.local` dosyanızdaki `AUTH_SECRET` değişkenine yapıştırın.

#### GitHub OAuth App Oluşturun

1. GitHub > Settings > Developer settings > OAuth Apps > New OAuth App
2. **Application name**: **Borcan Kebap** (veya istediğiniz bir isim)
3. **Homepage URL**: `http://localhost:3000`
4. **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
5. Oluşturulan "Client ID" ve "Client Secret" değerlerini `.env.local` dosyanızdaki `AUTH_GITHUB_ID` ve `AUTH_GITHUB_SECRET` değişkenlerine yazın.

#### Vercel Postgres Kurulumu

1. [Vercel Dashboard](https://vercel.com/dashboard) > Storage > Create Database > Postgres
2. Veritabanını oluşturduktan sonra "Connection Strings" sekmesine gidin.
3. Tüm bağlantı string'lerini (özellikle `POSTGRES_URL`) `.env.local` dosyanıza kopyalayın.

### 2. Veritabanı Migration'larını Çalıştırın

Veritabanı şemasını Vercel'deki veritabanınıza göndermek için:

```bash
# Migration dosyalarını oluştur
npm run db:generate

# Migration'ları veritabanına uygula (Vercel'e push et)
npm run db:migrate

# Alternatif: Schema'yı direkt push et (hızlı geliştirme için)
npm run db:push
```

### 3. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışmaya başlayacaktır.

## 📊 Veritabanı Yönetimi

### Drizzle Studio

Veritabanınızı görsel olarak yönetmek için Drizzle Studio'yu kullanabilirsiniz:

```bash
npm run db:studio
```

### Mevcut Komutlar

- `npm run db:generate` - Migration dosyaları oluşturur.
- `npm run db:migrate` - Oluşturulan migration'ları veritabanına uygular.
- `npm run db:push` - Şemayı (schema.ts) doğrudan veritabanına basar (veri kaybına neden olabilir, dikkatli kullanın).
- `npm run db:studio` - Drizzle Studio'yu yerel olarak açar.

## 🗄️ Veritabanı Şeması

Proje aşağıdaki temel tabloları içerir:

### Kimlik Doğrulama Tabloları (NextAuth)

- `users` - Kullanıcılar (role gibi ek alanlarla genişletilebilir)
- `accounts` - OAuth hesap bilgileri (GitHub, Google vb.)
- `sessions` - Aktif kullanıcı oturumları
- `verificationTokens` - E-posta doğrulama tokenları

### İş Mantığı Tabloları

- `products` - Menü ürünleri (fiyatlar kuruş cinsinden tutulabilir)
- `orders` - Alınan siparişler
- `order_items` - Siparişlerin detayları (hangi üründen kaç adet)
- `reservations` - Masa rezervasyonları

### Örnek Kullanıcı Rolleri

- `b2b` - İşletme müşterileri (isteğe bağlı)
- `manager` - Yöneticiler (admin paneli erişimi için)

## 🔐 Kimlik Doğrulama

### Giriş/Çıkış URL'leri

- Giriş Sayfası: `/auth/signin`
- Çıkış İşlemi: `/auth/signout`
- Hata Sayfası: `/auth/error`

### Sunucu Tarafında Kullanım Örneği

```tsx
import { auth } from "@/lib/auth"

export default async function Page() {
  const session = await auth()
  
  if (!session) {
    return <div>Giriş yapmalısınız</div>
  }
  
  return <div>Merhaba {session.user?.name}</div>
}
```

## 🚀 Production Deployment (Vercel)

1. Projenizi Vercel'e deploy edin.
2. `.env.local` dosyanızdaki tüm değişkenleri Vercel projenizin "Environment Variables" kısmına ekleyin.
3. `NEXTAUTH_URL` değişkenini Vercel'deki production URL'iniz (örn: `https://borcan-kebap.vercel.app`) olarak güncelleyin.
4. GitHub OAuth App ayarlarınıza gidin ve "Authorization callback URL" olarak production URL'inizi ekleyin (örn: `https://borcan-kebap.vercel.app/api/auth/callback/github`).

## 📝 Notlar

- Güvenlik amacıyla `.env.local` dosyası `.gitignore`'a eklenmiştir. Asla public reponuzda paylaşmayın.
- Geliştirme için `.env.example` dosyasını referans alın.
- Production ortamında mutlaka güçlü ve yeni bir `AUTH_SECRET` kullanın.

## 🆘 Sorun Giderme

### NextAuth Hataları

- `AUTH_SECRET` değişkeninin hem yerelde hem de Vercel'de ayarlandığından emin olun.
- GitHub OAuth App callback URL'lerinin (hem `localhost` hem de production) doğru yazıldığından emin olun.

### Veritabanı Hataları

- `POSTGRES_URL` bağlantı string'inizin Vercel'den doğru kopyalandığını kontrol edin.
- Yeni bir tablo eklediyseniz `npm run db:generate` ve `npm run db:migrate` komutlarını çalıştırdığınızdan emin olun.

---

## Next.js Bilgileri

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
