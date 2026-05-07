# FreshFlow | AI-Driven Sustainable Kitchen Intelligence

**FreshFlow**, modern restoran yönetimini manuel bir süreçten çıkarıp, veri odaklı ve otonom bir ekosisteme dönüştüren bir **Next.js 15 SaaS** platformudur. Hava durumu verilerini, satış tahminlerini ve stok yönetimini birleştirerek hem kârlılığı artırır hem de gıda israfını minimize eder.

---

##  Öne Çıkan Özellikler

###  Menu Intelligence (Dinamik Fiyatlandırma)
* **Hava Durumu Entegrasyonu:** OpenWeatherMap API kullanarak anlık hava durumunu takip eder.
* **Akıllı Algoritma:** Yağmurlu havalarda "Comfort Food" talebini öngörür, sıcak havalarda soğuk içecek marjlarını otomatik optimize eder.
* **Dinamik Menü:** Tek tuşla tüm menü fiyatlarını piyasa ve hava koşullarına göre günceller.

###  The Kitchen Rail (Modern Envanter)
* **Yatay Akışlı UI:** Mutfak operasyonlarına uygun, hızlı kaydırılabilir "Rail" tasarımı.
* **Atomik İşlemler:** Prisma Transaction yapısı ile bir ürün satıldığında reçetesindeki tüm malzemeler aynı anda stoktan düşer.
* **Emniyet Stok Uyarıları:** Kritik seviyenin altına düşen ürünler için görsel uyarılar ve sipariş önerileri.

###  Sürdürülebilirlik Odaklılık
* **Atık Önleme:** AI tahminleme sayesinde ihtiyaç fazlası alımları engeller.
* **Etki Raporu:** Önlenen gıda israfını ve karbon salınım tasarrufunu metriklerle raporlar.

---

## 🛠️ Teknoloji Yığını

* **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion.
* **Backend:** Next.js Server Actions, Node.js.
* **Database:** Neon DB (Serverless PostgreSQL).
* **ORM:** Prisma (v5.22.0) - Engine Type: Library.
* **State Management:** Zustand (with Persistence).
* **Authentication:** Custom Session-based Auth with Bcrypt & Middleware.
* **External APIs:** OpenWeatherMap API.

---

##  Kurulum ve Çalıştırma

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/enderkaran/freshflow.git
cd freshflow
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın (`.env`)
```env
DATABASE_URL="your-neon-db-url"
OPENWEATHERMAP_API_KEY="your-api-key"
```

### 4. Veritabanını Yapılandırın
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 5. Uygulamayı Başlatın
```bash
npm run dev
```

---

##  Proje Yapısı

* `/app`: Next.js 15 Rotaları (Dashboard, Review Order, Login, vb.).
* `/lib/actions`: Server Side logic ve veritabanı aksiyonları.
* `/lib/transactions`: Atomik veritabanı işlemleri ve API servisleri.
* `/components`: "Quiet Luxury" tasarım diline uygun reusable bileşenler.
* `/prisma`: Veritabanı şeması ve Seed verileri.

---

##  Geliştirici
**Ender Karan** *Software Developer & MIS Graduate*

"YBS arka planı ile yazılım dünyasını birleştirerek, işletmeler için verimli ve sürdürülebilir çözümler geliştiriyorum."

---

##  Lisans
Bu proje MIT lisansı altındadır.

---
