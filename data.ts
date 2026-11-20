
import { SiteData } from './types';

export const initialSiteData: SiteData = {
  companyName: "Logam Industri ART",
  description: "Terletak di jantung distrik pandai besi warisan Indonesia, Logam Industri ART adalah bengkel terkemuka yang mengkhususkan diri dalam instalasi tembaga dan kuningan arsitektural pesanan. Kami menjembatani celah antara teknik palu Jawa kuno dan estetika global kontemporer.",
  history: "Apa yang dimulai sebagai bengkel keluarga pada tahun 2005 telah berkembang menjadi pemasok internasional untuk perhotelan mewah dan proyek perumahan kelas atas, menjaga ritme palu yang sakral di setiap bagian.",
  vision: "Menjadi standar global untuk pengerjaan logam mewah, membuktikan bahwa keahlian tradisional adalah ekspresi tertinggi dari eksklusivitas modern.",
  mission: "1. Menjaga kemurnian tembaga kelas medis 99,9%.\n2. Memberdayakan master pandai besi melalui praktik perdagangan adil yang berkelanjutan.\n3. Memberikan keunggulan tanpa kompromi di 5 benua.",
  legalities: [
    {
      id: "leg-1",
      name: "Nomor Induk Berusaha (NIB) Registry",
      image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "leg-2",
      name: "Official Industrial License (IUI)",
      image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "leg-3",
      name: "Global Export Compliance Certificate",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
    }
  ],
  contact: {
    address: "Global Craftsmanship Hub, Cepogo, Boyolali, Jawa Tengah 57362",
    phone: "+62 812-3456-7890",
    email: "concierge@logamindustriart.com",
    instagram: "logam.industri.art",
    whatsapp: "+6281234567890",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15818.1!2d110.51!3d-7.51!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a696800000001%3A0x123456789abcdef!2sBoyolali!5e0!3m2!1id!2sid!4v1620000000000!5m2!1id!2sid"
  },
  products: [
    {
      id: "1",
      name: "Bak Mandi Tembaga Tempa Warisan",
      description: "Karya khas yang menampilkan insulasi dinding ganda dan hasil akhir tempaan tangan yang dalam.",
      material: "Tembaga Murni 99,9% Solid",
      price: "Rp 45.000.000",
      unitCost: 28000000,
      image: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?auto=format&fit=crop&w=1200&q=90",
      stock: 3,
      minStock: 1,
      monthlySales: 2
    },
    {
      id: "2",
      name: "Lampu Gantung Kuningan Mewah",
      description: "Pencahayaan arsitektural yang dirancang untuk langit-langit berkubah, menggunakan kuningan kelas arsitektural.",
      material: "Kuningan Arsitektural Kelas-A",
      price: "Rp 18.500.000",
      unitCost: 11000000,
      image: "https://images.unsplash.com/photo-1543248939-ff40856f65d4?auto=format&fit=crop&w=1200&q=90",
      stock: 6,
      minStock: 2,
      monthlySales: 4
    },
    {
      id: "3",
      name: "Konsol Tembaga Minimalis",
      description: "Perpaduan antara presisi industri dan kehangatan organik.",
      material: "Tembaga & Kaca Tempered",
      price: "Rp 7.500.000",
      unitCost: 4200000,
      image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=90",
      stock: 12,
      minStock: 5,
      monthlySales: 8
    }
  ],
  gallery: [
    { id: "g1", type: 'image', url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80", title: "Menghaluskan Patina" },
    { id: "g2", type: 'image', url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80", title: "Master Smith Sedang Bekerja" }
  ],
  articles: [
    {
      id: "a1",
      title: "Tembaga: Logam Mulia Kesehatan Modern",
      excerpt: "Temukan sains antimikroba di balik tembaga.",
      content: "Di luar keindahannya yang tak terbantahkan, tembaga adalah bahan yang hidup...",
      date: "24 Okt 2024",
      image: "https://images.unsplash.com/photo-1554009975-d74653b879f1?auto=format&fit=crop&w=1000&q=80"
    }
  ],
  faqs: [
    { question: "Apakah Anda melayani pengiriman internasional?", answer: "Ya, kami menangani logistik ke seluruh dunia melalui kurir khusus barang seni." }
  ],
  carousel: [
    "https://images.unsplash.com/photo-1615873968403-89e068629275?auto=format&fit=crop&w=2000&q=95",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=95"
  ],
  finances: [
    { month: "Agt 2024", revenue: 155000000, expenses: 92000000 },
    { month: "Sep 2024", revenue: 128000000, expenses: 84000000 },
    { month: "Okt 2024", revenue: 192000000, expenses: 105000000 },
    { month: "Nov 2024", revenue: 215000000, expenses: 118000000 }
  ],
  analytics: {
    aiInteractions: 1240,
    whatsappInquiries: 450,
    socialReach: {
      instagram: 5200,
      youtube: 1800,
      linkedin: 850,
      facebook: 1200
    }
  }
};
