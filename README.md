# 📡 Pametno okruženje : Web aplikacija za upravljanje uređajima

Ova aplikacija omogućava korisnicima da daljinski upravljaju pametnim uređajima u sobama - kao što su svetla, klima uređaji, alarmi i vrata - kroz veb interfejs, uz podršku za različite korisničke uloge i napredne funkcionalnosti.

---

## ✅ Korisnički zahtev

Korisnik želi mogućnost da putem jedinstvenog i sigurnog interfejsa:
- Upravlja uređajima u više prostorija (ON/OFF, status, tip)
- Upravlja uređajima u različitim sobama
- Pregleda i beleži istoriju akcija po uređaju
- Pristupa sistemu prema sopstvenoj ulozi (guest, user, admin)
- Pregleda vremenske podatke i koristi eksport podataka (PDF/CSV)

---

## 🧱 Struktura baze podataka

- `users`: korisnici sistema (`admin`, `user`, `guest`)
- `rooms`: prostorije u vlasništvu korisnika
- `devices`: uređaji unutar soba
- `action_logs`: sve zabeležene radnje korisnika nad uređajima

Relacije su strukturirane kao:
- 1 korisnik -> N soba
- 1 soba -> N uređaja
- 1 uređaj -> N akcija (logova)
- 1 korisnik -> N akcija (logova)

---

## 🧩 Modalitet rešenja

Sistem koristi **modularnu arhitekturu** sa REST API pristupom:

- **Backend (Laravel):**
  - MVC šablon
  - RESTful rute (CRUD, nested)
  - Middleware za uloge i sigurnost
  - Autentifikacija sa Laravel Sanctum
  - Eksterni API: OpenWeatherMap
  - Eksport u CSV i PDF

- **Frontend (React):**
  - Komponente: `DeviceCard`, `RoomCard`, `GlowContainer`
  - Hookovi: `useIsAdmin`, `useIsLoggedin`
  - Axios za poziv API-ja
  - Raspored prikaza po ulogama
  - TailwindCSS i Bootstrap stilizacija

---

## ⚙️ Tehnologije

- **Frontend:** React, Vite, TailwindCSS, Axios
- **Backend:** Laravel 12, Sanctum, DomPDF
- **Baza:** SQLite (lokalna)
- **API eksterni:** OpenWeatherMap, IP-API
- **Versioning:** Git, GitHub

---

## 📁 Pokretanje projekta **(MacOS, Linux verzija)**

1. Kloniranje repozitorijuma
```bash
git clone https://github.com/elab-development/internet-tehnologije-2024-projekat-appzauprpametnimokruzenjem_2020_0204
```

1. Pokretanje backend-a [port:8000]
```bash
cd backend
composer install
php artisan migrate --seed
php artisan serve
```

2. Pokretanje frontend-a [port:5173]
```bash
cd frontend
npm install
npm run dev
```

