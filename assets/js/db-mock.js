/**
 * ==========================================================================
 * E-DAILY REPORT PEMPROV DKI JAKARTA - IN-MEMORY DATABASE ENGINE
 * Arsitektur: LocalStorage Singleton with Advanced Jakarta Seeder
 * Case: Kompleksitas Pajak Daerah, Penegakan Perda, & IT Smart City
 * ==========================================================================
 */

const MockDB = {
    DB_KEY: 'edaily_database_jakarta',

    seedData: {
        // Master Bidang di Pemprov DKI Jakarta (Struktur lebih luas)
        bidang: [
            { id: "B00", nama: "Kepala Badan Pendapatan Daerah" },
            { id: "B01", nama: "Pusat Data dan Informasi Pendapatan (Pusdatin)" },
            { id: "B02", nama: "Bidang Pajak Kendaraan Bermotor (PKB)" },
            { id: "B03", nama: "Bidang Peraturan & Hukum Pendapatan" },
            { id: "B04", nama: "Suku Badan Pendapatan Jakarta Pusat" },
            { id: "B05", nama: "Suku Badan Pendapatan Jakarta Selatan" },
            { id: "B06", nama: "Suku Badan Pendapatan Jakarta Barat" },
            { id: "B07", nama: "Suku Badan Pendapatan Jakarta Timur" },
            { id: "B08", nama: "Suku Badan Pendapatan Jakarta Utara" }
        ],

        users: [
            // TOP LEVEL: KEPALA BADAN
            { id: "U01", username: "kaban.dki", name: "Dr. H. Heru Kuswanto, M.Si", role: "KADIS", bidang_id: "B00", manager_id: null },

            // MIDDLE MGMT: KEPALA BIDANG / KEPALA SUKU BADAN
            { id: "U02", username: "kabid.pusdatin", name: "Ir. Ahmad Fauzan, M.Kom (Kabid Pusdatin)", role: "PENILAI", bidang_id: "B01", manager_id: "U01" },
            { id: "U03", username: "kasuban.jaksel", name: "Diana Putri, SH, LLM (Kasuban Jaksel)", role: "PENILAI", bidang_id: "B05", manager_id: "U01" },
            { id: "U15", username: "kasuban.jakpus", name: "Drs. Hendra Cipta, M.Si (Kasuban Jakpus)", role: "PENILAI", bidang_id: "B04", manager_id: "U01" },

            // LOWER MGMT: KEPALA SEKSI (KASI)
            { id: "U04", username: "kasi.sistem", name: "Reno Sebastian, S.Kom (Kasi Sistem Informasi)", role: "PENILAI", bidang_id: "B01", manager_id: "U02" },
            { id: "U05", username: "kasi.audit", name: "Budi Santoso, ST (Kasi Audit Lapangan)", role: "PENILAI", bidang_id: "B05", manager_id: "U03" },
            { id: "U16", username: "kasi.penagihan", name: "Rina Marlina, SE (Kasi Penagihan Jakpus)", role: "PENILAI", bidang_id: "B04", manager_id: "U15" },

            // PEGAWAI: PELAKSANA / STAF PUSDATIN (IT)
            { id: "U06", username: "naufal.dev", name: "Naufal Fadlillah (Fullstack Dev)", role: "PEGAWAI", bidang_id: "B01", manager_id: "U04" },
            { id: "U07", username: "siska.analis", name: "Siska Indah (Data Analyst)", role: "PEGAWAI", bidang_id: "B01", manager_id: "U04" },
            { id: "U11", username: "doni.jarkom", name: "Doni Pratama (Network Engineer)", role: "PEGAWAI", bidang_id: "B01", manager_id: "U04" },

            // PEGAWAI: PELAKSANA / STAF JAKSEL
            { id: "U08", username: "bambang.pajak", name: "Bambang Sujatmiko (Petugas Audit Pajak)", role: "PEGAWAI", bidang_id: "B05", manager_id: "U05" },
            { id: "U09", username: "maria.lapangan", name: "Maria Sihaloho (Staf Penagihan Lapangan)", role: "PEGAWAI", bidang_id: "B05", manager_id: "U05" },
            { id: "U12", username: "yudi.reklame", name: "Yudi Hermanto (Satgas Pajak Reklame)", role: "PEGAWAI", bidang_id: "B05", manager_id: "U05" },

            // PEGAWAI: PELAKSANA / STAF JAKPUS
            { id: "U17", username: "sri.pbb", name: "Sri Wahyuni (Admin PBB-P2)", role: "PEGAWAI", bidang_id: "B04", manager_id: "U16" },
            { id: "U18", username: "anton.hotel", name: "Anton Wijaya (Pengawas Pajak Hotel)", role: "PEGAWAI", bidang_id: "B04", manager_id: "U16" },

            // ADMIN SISTEM
            { id: "U10", username: "admin.it", name: "Admin IT Pemprov DKI", role: "ADMIN", bidang_id: null, manager_id: null }
        ],

        skp: [
            // SKP Pusdatin (Program Kerja IT)
            { id: "SKP-IT-01", user_id: "U06", tahun: 2026, kegiatan: "Pengembangan Integrasi API Pajak Online dengan Bank DKI", target_jam: 150 },
            { id: "SKP-IT-02", user_id: "U07", tahun: 2026, kegiatan: "Penyusunan Laporan Analitik Penerimaan Pajak Daerah via BigQuery", target_jam: 100 },
            { id: "SKP-IT-03", user_id: "U11", tahun: 2026, kegiatan: "Maintenance Server & Keamanan Jaringan Balaikota", target_jam: 160 },

            // SKP Operasional Lapangan (Jaksel)
            { id: "SKP-OPS-01", user_id: "U08", tahun: 2026, kegiatan: "Pemeriksaan Lapangan Wajib Pajak Restoran & Hotel di Wilayah Kemang", target_jam: 120 },
            { id: "SKP-OPS-02", user_id: "U09", tahun: 2026, kegiatan: "Penempelan Stiker Penunggak Pajak Reklame & PBB-P2", target_jam: 130 },
            { id: "SKP-OPS-03", user_id: "U12", tahun: 2026, kegiatan: "Penyisiran Objek Reklame Ilegal di Jalan Protokol Sudirman-Thamrin", target_jam: 140 },

            // SKP Operasional Lapangan (Jakpus)
            { id: "SKP-JP-01", user_id: "U17", tahun: 2026, kegiatan: "Validasi Berkas Permohonan Pengurangan PBB-P2", target_jam: 160 },
            { id: "SKP-JP-02", user_id: "U18", tahun: 2026, kegiatan: "Monitoring Tapping Box Pajak Hotel Bintang 4 & 5", target_jam: 150 },

            // SKP Manajerial (Penilai)
            { id: "SKP-MGR-01", user_id: "U04", tahun: 2026, kegiatan: "Supervisi dan Evaluasi Infrastruktur IT Pajak Daerah", target_jam: 160 },
            { id: "SKP-MGR-02", user_id: "U05", tahun: 2026, kegiatan: "Koordinasi Operasi Penertiban Bersama Satpol PP", target_jam: 160 },
        ],

        lkh: [
            // --- KELOMPOK IT (PUSDATIN) ---
            {
                id: "LKH-IT-001", user_id: "U06", skp_id: "SKP-IT-01",
                aktivitas: "Fixing bugs pada modul endpoint pembayaran Bank DKI menggunakan Node.js dan Redis Cache.",
                lokasi_mode: "WFO", lat: -6.1824, lng: 106.8291, // Balaikota DKI
                waktu_menit: 300, status: "APPROVED", tanggal: "2026-04-18T16:00:00",
                feedback: "Kerja bagus, pastikan payload JSON sudah sesuai dokumentasi."
            },
            {
                id: "LKH-IT-002", user_id: "U06", skp_id: "SKP-IT-01",
                aktivitas: "Deployment hotfix UI Dashboard E-Daily Report ke server production.",
                lokasi_mode: "WFO", lat: -6.1825, lng: 106.8290,
                waktu_menit: 180, status: "PENDING", tanggal: "2026-04-20T14:30:00",
                feedback: ""
            },
            {
                id: "LKH-IT-003", user_id: "U07", skp_id: "SKP-IT-02",
                aktivitas: "Cleaning data anomali penerimaan pajak reklame triwulan 1 via BigQuery.",
                lokasi_mode: "WFH", lat: -6.2589, lng: 106.8183, // WFH di Kemang
                waktu_menit: 240, status: "APPROVED", tanggal: "2026-04-19T17:00:00",
                feedback: "Laporan sudah diterima. Visualisasi di Tableau cukup jelas."
            },
            {
                id: "LKH-IT-004", user_id: "U11", skp_id: "SKP-IT-03",
                aktivitas: "Pengecekan log firewall dan mitigasi serangan DDoS pada gateway pajak.jakarta.go.id",
                lokasi_mode: "WFO", lat: -6.1824, lng: 106.8295,
                waktu_menit: 400, status: "APPROVED", tanggal: "2026-04-19T18:00:00",
                feedback: "Pastikan SOP keamanan siber diterapkan ketat."
            },
            {
                id: "LKH-IT-005", user_id: "U06", skp_id: "SKP-IT-01",
                aktivitas: "Refactoring arsitektur backend dan code review modul API secara remote (Work From Anywhere).",
                lokasi_mode: "WFA", lat: -6.8322, lng: 107.6206, // Area Punclut
                waktu_menit: 240, status: "APPROVED", tanggal: "2026-04-23T11:00:00",
                feedback: "Perubahan struktur kode sangat bersih. Komunikasi tim tetap lancar meski sedang remote."
            },

            // --- KELOMPOK LAPANGAN JAKSEL (OPS) ---
            {
                id: "LKH-OPS-001", user_id: "U08", skp_id: "SKP-OPS-01",
                aktivitas: "Audit omzet harian Restoran di Mall Kota Kasablanka. Memeriksa kesesuaian data tapping box dengan struk kasir.",
                lokasi_mode: "LUAR", lat: -6.2238, lng: 106.8435, // Kokas
                waktu_menit: 240, status: "APPROVED", tanggal: "2026-04-19T14:00:00",
                feedback: "Audit selesai, WP kooperatif. Lanjutkan ke area Senopati besok."
            },
            {
                id: "LKH-OPS-002", user_id: "U08", skp_id: "SKP-OPS-01",
                aktivitas: "Kunjungan ke Hotel Bintang 4 di Kemang untuk klarifikasi tunggakan pajak bulan Maret.",
                lokasi_mode: "LUAR", lat: -6.2625, lng: 106.8142, // Kemang
                waktu_menit: 150, status: "PENDING", tanggal: "2026-04-20T11:00:00",
                feedback: ""
            },
            {
                id: "LKH-OPS-003", user_id: "U09", skp_id: "SKP-OPS-02",
                aktivitas: "Penempelan stiker 'OBJEK PAJAK INI MENUNGGAK' pada restoran di Jalan Senopati Raya.",
                lokasi_mode: "LUAR", lat: -6.2341, lng: 106.8095, // Senopati
                waktu_menit: 210, status: "APPROVED", tanggal: "2026-04-18T15:30:00",
                feedback: "Dokumentasi foto sudah dilampirkan via sistem. ACC."
            },
            {
                id: "LKH-OPS-004", user_id: "U09", skp_id: "SKP-OPS-02",
                aktivitas: "Penagihan door-to-door WP PBB-P2 dengan tunggakan di atas 50 Juta di wilayah Tebet.",
                lokasi_mode: "LUAR", lat: -6.4024, lng: 106.7942, // ANOMALI: Koordinat di Depok
                waktu_menit: 180, status: "REJECTED", tanggal: "2026-04-20T10:00:00",
                feedback: "DITOLAK: Koordinat GPS menunjukkan Anda berada di wilayah Depok saat jam kerja, padahal surat tugas di Tebet. Mohon klarifikasi dan revisi LKH Anda."
            },
            {
                id: "LKH-OPS-005", user_id: "U12", skp_id: "SKP-OPS-03",
                aktivitas: "Patroli bersama Satpol PP mencopot baliho reklame tidak berizin di sepanjang Jalan TB Simatupang.",
                lokasi_mode: "LUAR", lat: -6.2921, lng: 106.8202, // TB Simatupang
                waktu_menit: 300, status: "PENDING", tanggal: "2026-04-21T13:00:00",
                feedback: ""
            },

            // --- KELOMPOK LAPANGAN JAKPUS ---
            {
                id: "LKH-JP-001", user_id: "U17", skp_id: "SKP-JP-01",
                aktivitas: "Pemberkasan dan validasi 50 dokumen permohonan keringanan PBB-P2 untuk pensiunan.",
                lokasi_mode: "WFO", lat: -6.1754, lng: 106.8272, // Monas area
                waktu_menit: 420, status: "APPROVED", tanggal: "2026-04-18T16:30:00",
                feedback: "Berkas lengkap. Silakan teruskan ke meja Kasuban."
            },
            {
                id: "LKH-JP-002", user_id: "U18", skp_id: "SKP-JP-02",
                aktivitas: "Pengecekan server Tapping Box yang offline di Hotel Kempinski Bundaran HI.",
                lokasi_mode: "LUAR", lat: -6.1950, lng: 106.8225, // Bundaran HI
                waktu_menit: 180, status: "PENDING", tanggal: "2026-04-21T14:15:00",
                feedback: ""
            },

            // --- KELOMPOK MANAJERIAL (KASI & KASUBAN) ---
            {
                id: "LKH-MGR-001", user_id: "U04", skp_id: "SKP-MGR-01",
                aktivitas: "Memimpin rapat sprint mingguan dengan tim Fullstack Developer terkait modul Dashboard Eksekutif.",
                lokasi_mode: "WFO", lat: -6.1824, lng: 106.8291,
                waktu_menit: 120, status: "APPROVED", tanggal: "2026-04-18T11:00:00",
                feedback: "Auto-Approve (Top Executive)"
            },
            {
                id: "LKH-MGR-002", user_id: "U05", skp_id: "SKP-MGR-02",
                aktivitas: "Rapat koordinasi lintas instansi dengan Kejaksaan Tinggi terkait Wajib Pajak membandel.",
                lokasi_mode: "LUAR", lat: -6.2301, lng: 106.8322, // Kuningan (Kejati)
                waktu_menit: 240, status: "APPROVED", tanggal: "2026-04-19T13:00:00",
                feedback: "Notulensi rapat harap dilampirkan via email."
            }
        ],

        pengumuman: [
            {
                id: "P-DKI-01", sender_id: "U01", target_bidang: "ALL", tipe: "URGENT",
                judul: "Instruksi Kaban: Percepatan Target Pajak Triwulan II",
                pesan: "Diharapkan seluruh Kepala Suku Badan dan Kepala Bidang untuk melakukan monitoring ekstra ketat terhadap penagihan lapangan. Target realisasi Triwulan II harus mencapai 45% dari APBD. Segera tindak WP yang terindikasi menahan pembayaran.",
                tanggal: "2026-04-15T08:00:00"
            },
            {
                id: "P-DKI-02", sender_id: "U02", target_bidang: "B01", tipe: "INFO",
                judul: "Migrasi Server Cloud Jakarta Smart City",
                pesan: "Kepada seluruh tim Pusdatin, server database utama pajak.jakarta.go.id akan mengalami downtime terjadwal pada hari Sabtu pukul 00.00 - 04.00 WIB untuk proses scaling memori. Harap semua pipeline ETL dihentikan sebelum waktu tersebut.",
                tanggal: "2026-04-18T09:00:00"
            },
            {
                id: "P-DKI-03", sender_id: "U03", target_bidang: "B05", tipe: "URGENT",
                judul: "Penertiban Serentak Reklame Sudirman-Thamrin",
                pesan: "Tim Lapangan Jaksel (Seksi Penagihan), bersiap untuk operasi gabungan malam ini jam 22:00 WIB. Kita akan mencopot reklame tak berizin di sepanjang Jl. Sudirman. Pastikan rompi dan ID Card dibawa.",
                tanggal: "2026-04-20T15:30:00"
            }
        ],

        notifikasi: [
            { id: "N-1", user_id: "U04", message: "Naufal Fadlillah mengirimkan LKH baru untuk divalidasi.", is_read: false, type: "LKH_SUBMIT", tanggal: "2026-04-20T14:31:00" },
            { id: "N-2", user_id: "U09", message: "PERINGATAN: LKH Anda (Penagihan door-to-door WP PBB) DITOLAK karena lokasi tidak valid.", is_read: false, type: "LKH_REJECT", tanggal: "2026-04-20T11:05:00" },
            { id: "N-3", user_id: "U05", message: "Yudi Hermanto mengirimkan LKH baru (Penyisiran Objek Reklame) untuk divalidasi.", is_read: false, type: "LKH_SUBMIT", tanggal: "2026-04-21T13:05:00" },
            { id: "N-4", user_id: "U07", message: "LKH Anda (Cleaning data anomali penerimaan pajak) telah DISETUJUI.", is_read: false, type: "LKH_APPROVE", tanggal: "2026-04-19T18:15:00" }
        ],

        activity_logs: [
            { id: "L-01", user_id: "U10", action: "DB_SEED", desc: "Sistem Induk E-Daily Report Pemprov DKI Jakarta berhasil diinisialisasi.", timestamp: "2026-04-01T00:00:00" },
            { id: "L-02", user_id: "U04", action: "APPROVE_LKH", desc: "Memvalidasi LKH Naufal (Fixing bugs endpoint Bank DKI).", timestamp: "2026-04-18T17:15:00" },
            { id: "L-03", user_id: "U05", action: "REJECT_LKH", desc: "Menolak LKH Maria (Anomali GPS terdeteksi di Depok).", timestamp: "2026-04-20T11:00:00" },
            { id: "L-04", user_id: "U01", action: "BROADCAST", desc: "Menerbitkan instruksi pimpinan: Percepatan Target Pajak Triwulan II.", timestamp: "2026-04-15T08:05:00" },
            { id: "L-05", user_id: "U10", action: "CREATE_USER", desc: "Mendaftarkan entitas ASN baru: Anton Wijaya (PEGAWAI)", timestamp: "2026-04-10T10:00:00" }
        ]
    },

    // ======================================================================
    // CORE ENGINE: INITIALIZATION & STORAGE
    // ======================================================================
    init() {
        if (!localStorage.getItem(this.DB_KEY)) {
            console.log("MockDB DKI: Seeding data percontohan Pemprov DKI Jakarta...");
            localStorage.setItem(this.DB_KEY, JSON.stringify(this.seedData));
        }
    },

    _getData() {
        return JSON.parse(localStorage.getItem(this.DB_KEY));
    },

    _saveData(data) {
        localStorage.setItem(this.DB_KEY, JSON.stringify(data));
    },

    // ======================================================================
    // ORM METHODS (Logika Bisnis DKI Jakarta)
    // ======================================================================

    // --- Users & Org Structure ---
    getUsers() { return this._getData().users; },
    getUserById(id) { return this._getData().users.find(u => u.id === id); },
    getBawahan(managerId) { return this._getData().users.filter(u => u.manager_id === managerId); },
    getBidang() { return this._getData().bidang; },

    // --- LKH (Laporan Kinerja Harian) ---
    getLkh() { return this._getData().lkh; },

    getLkhByUserId(userId) {
        return this.getLkh().filter(l => l.user_id === userId).sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    },

    getLkhForReview(managerId) {
        const bawahanIds = this.getBawahan(managerId).map(b => b.id);
        return this.getLkh().filter(l => bawahanIds.includes(l.user_id) && l.status === "PENDING");
    },

    submitLkh(lkhData) {
        const db = this._getData();
        const newLkh = {
            id: "LKH-NEW-" + Date.now(),
            status: "PENDING",
            tanggal: new Date().toISOString(),
            feedback: "",
            ...lkhData
        };
        db.lkh.push(newLkh);
        this._saveData(db);

        this.insertLog(lkhData.user_id, "SUBMIT_LKH", `Mengirim LKH Jakarta: ${lkhData.aktivitas}`);

        const user = this.getUserById(lkhData.user_id);
        if (user && user.manager_id) {
            this.createNotification(user.manager_id, "LKH_SUBMIT", `LKH Baru dari ${user.name}`);
        }
        return newLkh;
    },

    reviewLkh(lkhId, managerId, status, feedback = "") {
        const db = this._getData();
        const idx = db.lkh.findIndex(l => l.id === lkhId);
        if (idx > -1) {
            db.lkh[idx].status = status;
            db.lkh[idx].feedback = feedback;
            this._saveData(db);

            this.insertLog(managerId, `REVIEW_LKH`, `Memvalidasi LKH: ${lkhId} menjadi ${status}`);
            this.createNotification(db.lkh[idx].user_id, `LKH_${status}`, `LKH Anda ${status === 'APPROVED' ? 'Disetujui' : 'Ditolak'}.`);
        }
    },

    // --- Engine Skoring Kalkulasi ---
    calculateScoringByTeam(managerId) {
        const bawahan = this.getBawahan(managerId);
        const lkhAll = this.getLkh();

        return bawahan.map(staf => {
            const lkhValid = lkhAll.filter(l => l.user_id === staf.id && l.status === "APPROVED");
            const totalMenit = lkhValid.reduce((sum, l) => sum + parseInt(l.waktu_menit), 0);
            const totalJam = (totalMenit / 60).toFixed(1);

            // Standar DKI: Target Jam Kerja efektif per bulan (approx 160 jam)
            const target = 160;
            const persentase = Math.min(100, (totalJam / target) * 100).toFixed(1);

            return {
                user_id: staf.id,
                nama: staf.name,
                total_jam_valid: totalJam,
                persentase: parseFloat(persentase)
            };
        });
    },

    getAgregatDinas() {
        const lkhAll = this.getLkh();
        return {
            total: lkhAll.length,
            approved: lkhAll.filter(l => l.status === "APPROVED").length,
            rejected: lkhAll.filter(l => l.status === "REJECTED").length,
            pending: lkhAll.filter(l => l.status === "PENDING").length
        };
    },

    // --- Utilities ---
    getLogs() {
        return this._getData().activity_logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    },

    insertLog(userId, action, desc) {
        const db = this._getData();
        const user = db.users.find(u => u.id === userId);
        db.activity_logs.push({
            id: "LOG" + Date.now(),
            user_id: userId,
            nama_user: user ? user.name : 'System',
            action: action,
            desc: desc,
            timestamp: new Date().toISOString()
        });
        this._saveData(db);
    },

    createNotification(userId, type, message) {
        const db = this._getData();
        db.notifikasi.push({
            id: "N" + Date.now(),
            user_id: userId,
            type: type,
            message: message,
            is_read: false,
            tanggal: new Date().toISOString()
        });
        this._saveData(db);
    }
};

MockDB.init();