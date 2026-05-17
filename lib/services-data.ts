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
