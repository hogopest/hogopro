import { ServiceItem, PestGuideItem, TestimonialItem, FAQItem, BookingData } from '../types';

export const COMPANY_CONFIG = {
  name: 'HOGO Pest Management',
  tagline: 'Protect · Prevent · Preserve',
  primaryColor: '#052344',
  secondaryColor: '#0E6B5A',
  whatsappNumber: '6281288894646', // format without '+' or leading zero
  displayPhone: '+62 812-8889-4646',
  email: 'halo@hogopest.id',
  operationalHours: 'Senin - Minggu: 08:00 - 20:00 WIB (Layanan Darurat 24 Jam)',
  headquarters: 'Graha HOGO, Jl. Boulevard Timur No. 45, Kelapa Gading, Jakarta Utara',
  serviceCoverage: ['DKI Jakarta', 'Tangerang & Tangsel', 'Bekasi', 'Depok', 'Bogor', 'Bandung', 'Surabaya', 'Semarang'],
  logoPath: '/assets/aistudio/a_clean_white_background_with_a_modern_minimalist_6c8708ea.png',
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'termite-control',
    name: 'Termite Management (Anti Rayap)',
    shortDescription: 'Perlindungan total struktur kayu dan fondasi bangunan dari serangan rayap tanah maupun kayu kering.',
    category: 'residential',
    icon: 'ShieldAlert',
    warranty: 'Garansi Sertifikat 3 - 5 Tahun',
    targetPest: 'Rayap Tanah (Coptotermes), Rayap Kayu Kering (Cryptotermes)',
    treatmentMethod: [
      'Chemical Barrier Injeksi Fondasi & Lantai',
      'Eco-Friendly Baiting System (Umpan Sentricon / Termite Interception)',
      'Perlindungan Pra-Konstruksi & Pasca-Konstruksi',
      'Deteksi Non-Destruktif dengan Termite Thermal Sensor'
    ],
    features: [
      'Garansi pengerjaan ulang gratis tanpa biaya jika ada rayap kembali',
      'Bahan termitisida tidak berbau menyengat & terdaftar resmi Kementan',
      'Pemeriksaan rutin berkala 6 bulan sekali selama masa garansi',
      'Sertifikat jaminan anti rayap resmi untuk klaim properti'
    ],
    suitableFor: ['Rumah Tinggal', 'Perumahan Baru / Renovasi', 'Gedung Perkantoran', 'Gudang Kayu & Arsip'],
    startingPrice: 'Mulai Rp 1.500.000 / Proyek'
  },
  {
    id: 'rodent-control',
    name: 'Rodent Management (Pengendalian Tikus)',
    shortDescription: 'Sistem komprehensif eliminasi tikus got, tikus atap, dan mencit dengan metode trapping dan sanitasi barier.',
    category: 'residential',
    icon: 'Rat',
    warranty: 'Garansi Monitoring 30 - 90 Hari',
    targetPest: 'Tikus Got (Rattus norvegicus), Tikus Atap (Rattus rattus), Mencit Rumah (Mus musculus)',
    treatmentMethod: [
      'Exclusion & Entry-Point Proofing (Menutup celah jalur tikus)',
      'Tamper-Resistant Bait Stations (Kotak umpan aman terkunci)',
      'Mechanical Snap & Live Trapping di plafon dan area tersembunyi',
      'Monitoring berkala dan sterilisasi bekas kotoran tikus'
    ],
    features: [
      'Aman untuk hewan peliharaan (kucing & anjing) dengan kotak umpan terkunci',
      'Tidak menggunakan racun berbahaya sembarangan yang membusuk di plafon',
      'Laporan pemetaan titik jalur aktif tikus',
      'Rekomendasi sanitasi dan perbaikan struktural'
    ],
    suitableFor: ['Restoran & Dapur Komersial', 'Rumah Tinggal', 'Pabrik & Gudang', 'Supermarket & Retail'],
    startingPrice: 'Mulai Rp 650.000 / Treatment'
  },
  {
    id: 'insect-control',
    name: 'Insect Management (Kecoak & Semut)',
    shortDescription: 'Pembasmian tuntas kecoak Jerman, kecoak Amerika, dan berbagai koloni semut hingga ke sarang intinya.',
    category: 'residential',
    icon: 'Bug',
    warranty: 'Garansi Evaluasi 60 Hari',
    targetPest: 'Kecoak Jerman (Blattella germanica), Kecoak Amerika, Semut Api, Semut Hitam',
    treatmentMethod: [
      'Gel Baiting Presisi di area kelistrikan & celah kabinet',
      'Residual Surface Spraying tanpa meninggalkan noda',
      'Cold Fogging / Misting untuk area celah sempit & drainase',
      'Dusting powder di rongga partisi dinding'
    ],
    features: [
      'Tanpa perlu evakuasi atau membongkar seluruh perabotan rumah',
      'Gel formulasi khusus menarik koloni dan mematikan indukan di sarang',
      'Bahan formulasi aman bersentuhan tidak langsung dengan area dapur',
      'Hasil terlihat signifikan dalam 24-48 jam pertama'
    ],
    suitableFor: ['Apartemen & Kondominium', 'Dapur Rumah Tangga', 'Food Court & Cafe', 'Kamar Rumah Sakit'],
    startingPrice: 'Mulai Rp 500.000 / Kunjungan'
  },
  {
    id: 'flying-insects',
    name: 'Flying Insect Control (Nyamuk & Lalat)',
    shortDescription: 'Pengendalian vektor penyakit DBD, malaria, dan kontaminasi lalat pada area outdoor maupun indoor.',
    category: 'residential',
    icon: 'Sparkles',
    warranty: 'Perlindungan Siklus Berkala',
    targetPest: 'Nyamuk Aedes aegypti, Nyamuk Culex, Lalat Rumah (Musca domestica)',
    treatmentMethod: [
      'Thermal Fogging Outdoor untuk membunuh serangga dewasa seketika',
      'Ultra Low Volume (ULV) Cold Misting untuk indoor tanpa residu minyak',
      'Larvasida Ramah Lingkungan pada saluran air dan tampungan air',
      'Pemasangan Insect Light Trap (Fly Catcher) untuk area higienis'
    ],
    features: [
      'Efektif menurunkan populasi vektor DBD & lalat secara instan',
      'Pelarut water-based yang tidak meninggalkan bekas berminyak di lantai',
      'Aman untuk area taman dan vegetasi hias',
      'Jadwal fleksibel (pagi hari atau senja saat nyamuk aktif)'
    ],
    suitableFor: ['Kompleks Perumahan', 'Sekolah & Kampus', 'Taman & Area Terbuka', 'Hotel & Resort'],
    startingPrice: 'Mulai Rp 750.000 / Treatment'
  },
  {
    id: 'bedbug-treatment',
    name: 'Bed Bug Elimination (Kutu Kasur)',
    shortDescription: 'Solusi tuntas gigitan kutu kasur dengan kombinasi dry steam uap panas tinggi dan insektisida residual kasur.',
    category: 'specialized',
    icon: 'BedDouble',
    warranty: 'Garansi Bebas Kutu 45 Hari',
    targetPest: 'Kutu Kasur / Tinggi (Cimex lectularius)',
    treatmentMethod: [
      'High Temperature Dry Steamer (Uap panas 180°C membunuh telur & nimfa)',
      'Vacuuming HEPA Filter pada lipatan matras, dipan, dan sela sofa',
      'Aplikasi Insektisida Spesifik Micro-Encapsulated tanpa bau keras',
      'Pemasangan Bed Bug Interceptor Monitor pada kaki tempat tidur'
    ],
    features: [
      'Menjangkau telur kutu kasur mikroskopis yang kebal terhadap semprotan biasa',
      'Kasur dapat digunakan kembali dalam 4-6 jam setelah ventilasi',
      'Teknisi berpengalaman menangani hotel berbintang dan hunian pribadi',
      'Garansi inspeksi ulang tanpa dipungut biaya'
    ],
    suitableFor: ['Kamar Tidur Pribadi', 'Kost Eksklusif & Asrama', 'Hotel, Hostel, & Airbnb', 'Sofa & Bioskop'],
    startingPrice: 'Mulai Rp 850.000 / Ruangan'
  },
  {
    id: 'commercial-ipm',
    name: 'Integrated Pest Management (IPM Bisnis & F&B)',
    shortDescription: 'Kontrak pemeliharaan pengendalian hama komprehensif berstandar audit BPOM, HACCP, GMP, dan ISO.',
    category: 'commercial',
    icon: 'Building2',
    warranty: 'Kontrak Berkala & Support Audit',
    targetPest: 'Semua Kategori Hama Struktural, Gudang, & Serangga Terbang',
    treatmentMethod: [
      'Audit Risiko & Inspeksi Awal Bebas Biaya',
      'Sistem Pemantauan Barcode / QR Code di setiap bait station',
      'Digital Pest Trending Report untuk kepatuhan auditor',
      'Kunjungan rutin terjadwal (mingguan, dwimingguan, bulanan)'
    ],
    features: [
      'Dokumentasi lengkap SDS (Safety Data Sheet) dan izin bahan kimia resmi',
      'Sertifikat higienitas dan pemenuhan audit BPOM / Halal / HACCP',
      'Teknisi berseragam rapi dengan SOP keamanan kerja standar korporasi',
      'Emergency response cepat jika terjadi temuan mendadak di area operasional'
    ],
    suitableFor: ['Pabrik Makanan & Minuman', 'Jaringan Restoran & Kafe', 'Pusat Logistik & Pergudangan', 'Rumah Sakit & Klinik'],
    startingPrice: 'Kontrak Kustom Sesuai Luas'
  }
];

export const PEST_GUIDE_LIST: PestGuideItem[] = [
  {
    id: 'rayap',
    name: 'Rayap (Termites)',
    latinName: 'Coptotermes gestroi',
    riskLevel: 'Kritis',
    signs: [
      'Jalur tanah kering (mud tubes) menjalar di dinding atau kusen',
      'Kayu terdengar kopong saat diketuk atau pintu sulit ditutup',
      'Ditemukan sayap laron berserakan di sekitar lampu atau lantai',
      'Terdapat serpihan halus menyerupai pasir kayu di sudut lemari'
    ],
    risks: [
      'Meruntuhkan plafon, kuda-kuda atap, dan rangka bangunan',
      'Menghancurkan dokumen penting, buku, dan kitchen set',
      'Kerugian finansial renovasi puluhan hingga ratusan juta rupiah'
    ],
    recommendation: 'Jangan semprot dengan insektisida aerosol biasa karena rayap akan menyebar ke titik lain. Lakukan inspeksi sensor HOGO segera.'
  },
  {
    id: 'tikus',
    name: 'Tikus (Rodents)',
    latinName: 'Rattus norvegicus & Rattus rattus',
    riskLevel: 'Tinggi',
    signs: [
      'Kotoran hitam silindris kecil di dekat dapur atau bawah rak',
      'Suara berisik gesekan atau cakaran di atas plafon saat malam',
      'Bungkus makanan robek atau kabel listrik yang terkelupas',
      'Jejak noda minyak (rub marks) di pinggir dinding bawah'
    ],
    risks: [
      'Pemicu utama kebakaran rumah akibat korsleting kabel digigit tikus',
      'Menularkan penyakit mematikan leptospirosis, pes, dan salmonella',
      'Mencemari bahan makanan di gudang dan dapur'
    ],
    recommendation: 'Gunakan sistem perangkap tertutup terkalibrasi dan tutup titik masuk primer (exclusion method) bersama tim teknisi HOGO.'
  },
  {
    id: 'kecoak',
    name: 'Kecoak Jerman (German Cockroach)',
    latinName: 'Blattella germanica',
    riskLevel: 'Tinggi',
    signs: [
      'Kecoak berukuran kecil (1-1.5 cm) terlihat di celah kulkas, microwave, atau kabinet',
      'Bau apek berminyak yang menyengat di area dapur',
      'Kantung telur (ootheca) berwarna cokelat muda di sela furnitur',
      'Bintik hitam mirip bubuk kopi di celah engsel pintu'
    ],
    risks: [
      'Berkembang biak luar biasa cepat (1 kantung telur = 30-40 nimfa)',
      'Membawa bakteri penyebab diare, tifus, dan memicu asma anak',
      'Menghancurkan reputasi rating kebersihan restoran dan kafe'
    ],
    recommendation: 'Aplikasi baiting gel HOGO dengan formula atraktan khusus agar racun dibawa ke dalam sarang induk.'
  },
  {
    id: 'kutu-kasur',
    name: 'Kutu Kasur (Bed Bugs)',
    latinName: 'Cimex lectularius',
    riskLevel: 'Tinggi',
    signs: [
      'Bentol merah gatal berjajar di kulit setelah bangun tidur',
      'Bercak darah kecil kecokelatan di sprei atau tepi kasur',
      'Kutu pipih oval sebesar biji apel bersembunyi di jahitan kasur',
      'Aroma manis apek samar di sekitar area tidur'
    ],
    risks: [
      'Gangguan tidur kronis, kecemasan, dan infeksi sekunder pada kulit',
      'Menyebar sangat cepat melalui koper pakaian atau tamu menginap',
      'Sulit dibasmi hanya dengan penjemuran kasur tradisional'
    ],
    recommendation: 'Kombinasi uap bersuhu tinggi (dry steam) dan perlakuan residual celah kasur oleh tim bersertifikat HOGO.'
  }
];

export const TESTIMONIALS_LIST: TestimonialItem[] = [
  {
    name: 'Ir. Hendra Kusuma',
    role: 'Pemilik Rumah',
    propertyType: 'Rumah Tinggal 350 m²',
    city: 'Pantai Indah Kapuk, Jakarta',
    quote: 'Kusen jati dan kitchen set saya sempat diserang rayap parah. Tim HOGO datang tepat waktu, melakukan inspeksi dengan sensor termal canggih tanpa merusak dinding, lalu memasang barrier kimia. Sudah 2 tahun berjalan dan rumah tetap aman 100%. Sangat profesional!',
    rating: 5,
    serviceUsed: 'Termite Management System'
  },
  {
    name: 'Chef Marissa Widjaja',
    role: 'Head of Operations',
    propertyType: 'Restoran & Bakery (3 Cabang)',
    city: 'Senopati & Dharmawangsa, Jakarta Selatan',
    quote: 'Standar higienitas restoran kami sangat ketat untuk audit dinas kesehatan. HOGO memberikan laporan digital yang rapi, penanganan kecoak tanpa bau yang aman untuk dapur, dan tim selalu responsif saat dibutuhkan. Layanan B2B terbaik yang pernah kami pakai.',
    rating: 5,
    serviceUsed: 'Commercial IPM Contract'
  },
  {
    name: 'Bambang Soedirjo',
    role: 'Facility Manager',
    propertyType: 'Gudang Logistik 2.000 m²',
    city: 'Kawasan Industri Cikarang, Jawa Barat',
    quote: 'Masalah tikus yang menggerogoti karton barang langsung tuntas dalam sebulan setelah tim HOGO memasang tamper-proof bait stations dan menutup celah ventilasi. Laporannya selalu jelas dan harga sangat transparan.',
    rating: 5,
    serviceUsed: 'Rodent & Industrial Pest Management'
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    question: 'Apakah bahan kimia dan obat yang digunakan HOGO aman untuk anak-anak dan hewan peliharaan?',
    answer: 'Ya, keselamatan keluarga dan hewan peliharaan adalah prioritas kami. HOGO hanya menggunakan formulasi kimia yang terdaftar resmi di Kementerian Pertanian RI dan memenuhi standar Organisasi Kesehatan Dunia (WHO). Setelah proses treatment selesai dan ruangan diberi ventilasi selama 1 - 2 jam, ruangan aman kembali dihuni.',
    category: 'Keamanan'
  },
  {
    question: 'Berapa lama garansi yang diberikan untuk layanan anti rayap HOGO?',
    answer: 'Untuk penanganan rayap (Termite Management), kami memberikan sertifikat garansi resmi 3 tahun (pasca-konstruksi) hingga 5 tahun (pra-konstruksi). Jika ditemukan infestasi rayap aktif selama masa garansi, teknisi kami akan melakukan treatment ulang secara GRATIS tanpa pungutan biaya tambahan.',
    category: 'Garansi'
  },
  {
    question: 'Bagaimana langkah pemesanan dan apakah ada biaya survei/inspeksi awal?',
    answer: 'Anda dapat memesan langsung melalui fitur booking online di website ini atau langsung menghubungi WhatsApp resmi kami. Untuk area perumahan dan komersial, kami memberikan layanan KONSULTASI & SURVEI AWAL GRATIS untuk mendiagnosis tingkat keparahan serangan hama sebelum penawaran diajukan.',
    category: 'Pemesanan'
  },
  {
    question: 'Apakah saya harus mengosongkan rumah saat treatment dilakukan?',
    answer: 'Untuk mayoritas treatment (seperti umpan kecoak berformula gel, kotak tikus tertutup, dan injeksi rayap), Anda tidak perlu mengosongkan rumah. Namun untuk treatment ULV Cold Fogging nyamuk atau uap panas kutu kasur, disarankan ruangan tidak dimasuki manusia dan hewan peliharaan selama pengerjaan berlangsung hingga 1-2 jam setelahnya.',
    category: 'Proses Pengerjaan'
  },
  {
    question: 'Berapa lama waktu yang dibutuhkan untuk satu kali sesi pengerjaan?',
    answer: 'Untuk rumah tinggal standar (100 - 250 m²), sesi treatment berkisar antara 60 hingga 120 menit tergantung luas area dan jenis hama yang ditangani. Untuk fasilitas komersial dan industri, waktu disesuaikan dengan jadwal shift operasional agar tidak mengganggu operasional bisnis Anda.',
    category: 'Waktu'
  }
];

export const PHILOSOPHY_PILLARS = [
  {
    title: 'PROTECT',
    meaning: 'Melindungi Aset & Kesehatan',
    description: 'Memberikan benteng pertahanan terdepan bagi kenyamanan keluarga, integritas struktur properti, dan perlindungan reputasi bisnis dari risiko penyakit serta kerugian finansial akibat hama.',
    icon: 'ShieldCheck'
  },
  {
    title: 'PREVENT',
    meaning: 'Mencegah Infestasi Berulang',
    description: 'Tidak hanya membasmi hama yang terlihat, kami menganalisis akar masalah, memutus rantai perkembangbiakan, menutup jalur masuk (proofing), dan memasang barier preventif berkesinambungan.',
    icon: 'Lock'
  },
  {
    title: 'PRESERVE',
    meaning: 'Menjaga Kelestarian & Higienitas',
    description: 'Menjaga keawetan bangunan jangka panjang sekaligus melestarikan lingkungan melalui metode ramah lingkungan, bahan kimia terukur non-toksik bagi non-target, dan minim residu.',
    icon: 'Leaf'
  }
];

export function buildWhatsAppMessage(booking: Partial<BookingData>): string {
  const lines = [
    `*FORMULIR BOOKING LAYANAN HOGO PEST MANAGEMENT*`,
    `----------------------------------------`,
    `Halo HOGO Pest Management, saya ingin menjadwalkan layanan/inspeksi hama dengan detail berikut:`,
    ``,
    `👤 *Nama Pemesan:* ${booking.fullName || '-'}`,
    `📱 *No. WhatsApp:* ${booking.phoneWhatsApp || '-'}`,
    `🎯 *Layanan Dipilih:* ${booking.serviceName || 'Konsultasi Umum'}`,
    `🏠 *Tipe Properti:* ${booking.propertyType || 'Rumah Tinggal'}`,
    `📐 *Estimasi Luas:* ${booking.areaSize ? `${booking.areaSize} m²` : '-'}`,
    `📅 *Rencana Tanggal:* ${booking.scheduledDate || 'Segera / Fleksibel'}`,
    `⏰ *Pilihan Waktu:* ${booking.timeSlot || 'Pagi (08:00 - 12:00)'}`,
    `📍 *Alamat / Kota:* ${booking.address || '-'} (${booking.city || 'Jabodetabek'})`,
    booking.notes ? `📝 *Keluhan Hama:* ${booking.notes}` : ``,
    booking.isUrgent ? `🚨 *Status:* Butuh Tindakan Cepat (Urgent)` : ``,
    ``,
    `Mohon info konfirmasi ketersediaan jadwal teknisi dan estimasi biayanya. Terima kasih!`,
    `----------------------------------------`,
    `_HOGO Pest Management · Protect · Prevent · Preserve_`
  ].filter(line => line !== undefined);

  return encodeURIComponent(lines.join('\n'));
}

export function getWhatsAppBookingUrl(booking: Partial<BookingData>): string {
  const text = buildWhatsAppMessage(booking);
  return `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${text}`;
}

export function getQuickConsultationUrl(topic: string = 'Konsultasi Layanan Pengendalian Hama'): string {
  const text = encodeURIComponent(
    `Halo HOGO Pest Management, saya ingin berkonsultasi mengenai: ${topic}. Mohon info estimasi dan jadwal survei gratis. Terima kasih!`
  );
  return `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${text}`;
}
