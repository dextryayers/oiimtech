export interface HPService {
  id: number;
  name: string;
  price: number;
  duration: string;
  warranty: string;
  icon: string;
  description: string;
}

export const hpServices: HPService[] = [
  { 
    id: 1, 
    name: 'Ganti LCD', 
    price: 350000, 
    duration: '2 jam', 
    warranty: '3 bulan', 
    icon: '🖥️',
    description: 'Penggantian layar LCD dengan kualitas original. Mengatasi masalah layar pecah, touchscreen tidak responsif, atau tampilan bergaris.'
  },
  { 
    id: 2, 
    name: 'Ganti Baterai', 
    price: 250000, 
    duration: '1 jam', 
    warranty: '6 bulan', 
    icon: '🔋',
    description: 'Ganti baterai HP Anda yang sudah drop atau kembung. Kami menggunakan baterai berkualitas tinggi untuk daya tahan maksimal.'
  },
  { 
    id: 3, 
    name: 'Perbaikan Software', 
    price: 150000, 
    duration: '1-2 jam', 
    warranty: '1 bulan', 
    icon: '📱',
    description: 'Mengatasi masalah sistem operasi, bootloop, lupa pola/password, atau update software yang gagal.'
  },
  { 
    id: 4, 
    name: 'Ganti Charging Port', 
    price: 120000, 
    duration: '1 jam', 
    warranty: '3 bulan', 
    icon: '⚡',
    description: 'Perbaikan konektor pengisian daya yang longgar atau tidak bisa mengisi daya sama sekali.'
  },
  { 
    id: 5, 
    name: 'Perbaikan Water Damage', 
    price: 400000, 
    duration: '1-2 hari', 
    warranty: '1 bulan', 
    icon: '💧',
    description: 'Penanganan khusus untuk HP yang terkena air. Pembersihan korosi dan penggantian komponen yang rusak akibat cairan.'
  },
  { 
    id: 6, 
    name: 'Ganti Kamera', 
    price: 300000, 
    duration: '1 jam', 
    warranty: '3 bulan', 
    icon: '📷',
    description: 'Perbaikan kamera depan atau belakang yang buram, tidak fokus, atau mati total.'
  }
];

export const testimonials = [
  { 
    name: 'Andi Wijaya', 
    rating: 5, 
    comment: 'Servis HP cepat dan rapi! Harga transparan. Teknisi sangat profesional dalam menjelaskan kerusakan.', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Andi' 
  },
  { 
    name: 'Sari Dewi', 
    rating: 5, 
    comment: 'Layarnya diganti, hasilnya seperti baru. Recommended banget buat yang mau servis HP premium!', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sari' 
  },
  { 
    name: 'Budi Santoso', 
    rating: 4, 
    comment: 'Ganti baterai cuma 1 jam, langsung bisa dipakai lagi. Garansinya juga cukup lama.', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Budi' 
  },
  { 
    name: 'Lina Marlina', 
    rating: 5, 
    comment: 'Pelayanan ramah, tempatnya nyaman. HP saya yang kena air bisa hidup lagi!', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Lina' 
  },
  { 
    name: 'Rizky Pratama', 
    rating: 5, 
    comment: 'Sangat puas dengan hasilnya. Kameranya sekarang jernih banget!', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Rizky' 
  },
  { 
    name: 'Dina Lestari', 
    rating: 5, 
    comment: 'Prosesnya transparan, bisa ditunggu juga. Top markotop!', 
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Dina' 
  }
];

export interface FaqItem {
  q: string;
  a: string;
}

export const defaultFaq: FaqItem[] = [
  {
    q: 'Berapa lama proses perbaikan HP?',
    a: 'Tergantung jenis kerusakannya. Perbaikan ringan seperti ganti baterai atau charging port selesai dalam 1 jam dan bisa ditunggu. Perbaikan berat seperti water damage atau perbaikan motherboard membutuhkan 1-2 hari kerja.',
  },
  {
    q: 'Apakah setiap perbaikan mendapatkan garansi?',
    a: 'Ya. Semua perbaikan di OiimTech bergaransi resmi - mulai 1 bulan untuk perbaikan software hingga 6 bulan untuk penggantian baterai. Garansi berlaku untuk jasa maupun komponen yang kami pasang.',
  },
  {
    q: 'Apakah ada biaya untuk diagnosa?',
    a: 'Tidak ada. Diagnosa awal dan konsultasi sepenuhnya gratis. Anda hanya membayar ketika menyetujui estimasi biaya dan perbaikan dilakukan.',
  },
  {
    q: 'Bagaimana cara memesan layanan?',
    a: 'Cukup isi formulir di halaman Booking atau klik "Pesan Sekarang" pada layanan yang Anda butuhkan. Teknisi kami akan menghubungi Anda lewat WhatsApp dalam 15 menit untuk konfirmasi jadwal.',
  },
  {
    q: 'Apakah ada layanan antar jemput HP?',
    a: 'Ada. Kami melayani antar jemput gratis untuk area Surabaya. HP Anda dijemput tim kami, diperbaiki, lalu diantar kembali ke alamat Anda setelah selesai.',
  },
  {
    q: 'Apakah data di HP saya aman?',
    a: 'Sangat aman. Kami menerapkan SOP privasi yang ketat - data Anda tidak akan dibuka, disalin, atau disebarluaskan. Sebelum perbaikan, kami sarankan backup data di rumah sebagai langkah pencegahan standar.',
  },
  {
    q: 'Apakah komponen yang digunakan original?',
    a: 'Kami menyediakan komponen original dan OEM berkualitas tinggi. Selalu kami informasikan pilihan komponen beserta perbedaan harganya sebelum pengerjaan - keputusan tetap di tangan Anda.',
  },
  {
    q: 'Merk HP apa saja yang bisa diservis?',
    a: 'Semua brand kami tangani: Apple, Samsung, Xiaomi, OPPO, VIVO, OnePlus, ASUS, Realme, Infinix, dan lainnya. Termasuk masalah spesifik seperti FaceID Apple, green line Samsung, hingga bootloop Xiaomi.',
  },
  {
    q: 'Bagaimana metode pembayarannya?',
    a: 'Pembayaran dilakukan setelah perbaikan selesai dan HP sudah dites menyeluruh. Metodenya fleksibel: tunai, transfer bank, e-wallet (GoPay, OVO, DANA), atau bayar di tempat (COD).',
  },
];

export interface SiteHero {
  badge: string;
  titleA: string;
  titleHighlight: string;
  titleB: string;
  subtitle: string;
  stats: { value: string; label: string }[];
}

export const defaultHero: SiteHero = {
  badge: 'Buka hari ini - 09.00 - 21.00',
  titleA: 'Service ',
  titleHighlight: 'HP Premium',
  titleB: ' Tanpa Ribet.',
  subtitle:
    'LCD pecah, baterai kembung, kena air? Diagnosa gratis, harga transparan, dan garansi resmi - semua dikerjakan teknisi bersertifikat.',
  stats: [
    { value: '40+', label: 'HP Diperbaiki' },
    { value: '4.9/5', label: 'Rating Pelanggan' },
    { value: '15 mnt', label: 'Respon WhatsApp' },
  ],
};

export interface SiteAnnouncement {
  enabled: boolean;
  text: string;
}

export const defaultAnnouncement: SiteAnnouncement = {
  enabled: true,
  text: 'Buka setiap hari 09.00 - 21.00 WIB',
};

export interface SiteContacts {
  whatsapp: string;
  phoneDisplay: string;
  email: string;
  address: string;
  instagram: string;
  tiktok: string;
  hours: string;
}

export const defaultContacts: SiteContacts = {
  whatsapp: '6287817148552',
  phoneDisplay: '+62 878 1714 8552',
  email: 'info@oiimtech.com',
  address: 'Jl. Dukuh Kupang, Surabaya, Indonesia',
  instagram: 'oiimtech',
  tiktok: '',
  hours: 'Setiap hari 09.00 - 21.00 WIB',
};
