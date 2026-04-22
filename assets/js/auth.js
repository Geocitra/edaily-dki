/**
 * ==========================================================================
 * E-DAILY REPORT - SECURITY & AUTHENTICATION ENGINE
 * Role-Based Access Control (RBAC) Simulator using LocalStorage
 * ==========================================================================
 */

const AuthEngine = {
    // Key untuk menyimpan sesi di browser
    SESSION_KEY: 'edaily_current_user',

    /**
     * 1. Fungsi Login (Dijalankan dari halaman index.html)
     * Mengambil ID User dari form, merekam di localStorage, dan me-redirect ke folder yang tepat.
     */
    login: function (userObject) {
        // Simpan objek user (id, name, role, manager_id, bidang_id) ke session
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(userObject));

        // Catat aktivitas Login (Jika db-mock.js sudah me-load log engine)
        if (typeof MockDB !== 'undefined') {
            MockDB.insertLog(userObject.id, 'LOGIN', `${userObject.name} berhasil login ke sistem.`);
        }

        // Routing pintar: Arahkan ke folder berdasarkan Role
        let targetFolder = '';
        switch (userObject.role) {
            case 'ADMIN': targetFolder = 'admin/'; break;
            case 'KADIS': targetFolder = 'kadis/'; break;
            case 'PENILAI': targetFolder = 'penilai/'; break;
            case 'PEGAWAI': targetFolder = 'pegawai/'; break;
            default:
                alert("Role tidak dikenali!");
                return;
        }

        // Redirect ke dashboard masing-masing role
        window.location.href = targetFolder + 'dashboard.html';
    },

    /**
     * 2. Fungsi Logout
     * Membersihkan localStorage dan menendang user kembali ke pintu gerbang (index.html)
     */
    logout: function () {
        const user = this.getCurrentUser();
        if (user && typeof MockDB !== 'undefined') {
            MockDB.insertLog(user.id, 'LOGOUT', `${user.name} keluar dari sistem.`);
        }

        localStorage.removeItem(this.SESSION_KEY);

        // Kalkulasi path mundur untuk kembali ke index.html
        // Karena logout bisa dipanggil dari dalam folder role (misal /pegawai/dashboard.html)
        const inSubFolder = window.location.pathname.split('/').length > 2;
        window.location.href = inSubFolder ? '../index.html' : 'index.html';
    },

    /**
     * 3. Ambil Sesi Saat Ini
     * Mengembalikan objek JSON user jika login, atau null jika belum.
     */
    getCurrentUser: function () {
        const data = localStorage.getItem(this.SESSION_KEY);
        return data ? JSON.parse(data) : null;
    },

    /**
     * 4. Middleware / Route Guard (KUNCI UTAMA KEAMANAN MOCKUP)
     * Fungsi ini HARUS dipanggil secara otomatis saat file JS ini di-load di setiap halaman.
     * Mengecek URL aktif vs Role yang sedang login.
     */
    guardRoute: function () {
        const currentPath = window.location.pathname.toLowerCase();
        const user = this.getCurrentUser();

        // Jika user belum login dan BUKAN berada di halaman index/login, tendang ke index
        if (!user) {
            if (!currentPath.endsWith('index.html') && !currentPath.endsWith('/')) {
                alert('Sesi anda telah habis atau belum login. Silahkan login kembali.');
                // Hitung kedalaman folder untuk redirect yang tepat
                window.location.href = currentPath.includes('/admin/') || currentPath.includes('/kadis/') || currentPath.includes('/penilai/') || currentPath.includes('/pegawai/') ? '../index.html' : 'index.html';
            }
            return; // Hentikan eksekusi jika di index.html
        }

        // --- Aturan Isolasi Folder Berdasarkan Role ---
        let isAuthorized = true;

        if (currentPath.includes('/admin/') && user.role !== 'ADMIN') isAuthorized = false;
        if (currentPath.includes('/kadis/') && user.role !== 'KADIS') isAuthorized = false;
        if (currentPath.includes('/penilai/') && user.role !== 'PENILAI') isAuthorized = false;
        if (currentPath.includes('/pegawai/') && user.role !== 'PEGAWAI') isAuthorized = false;

        // Jika mencoba mengakses folder yang bukan haknya
        if (!isAuthorized) {
            alert(`Akses Ditolak! Role [${user.role}] tidak memiliki izin mengakses modul ini.`);
            this.logout();
        }

        // --- Render UI Konteks (Opsional tapi penting untuk presentasi) ---
        // Jika lolos guard, otomatis ganti nama dan role di Topbar/Sidebar jika elemennya ada
        document.addEventListener("DOMContentLoaded", () => {
            const userNameEl = document.getElementById('session-user-name');
            const userRoleEl = document.getElementById('session-user-role');

            if (userNameEl) userNameEl.innerText = user.name;
            if (userRoleEl) userRoleEl.innerText = `(${user.role})`;
        });
    }
};

// ==============================================================================
// AUTO-EXECUTE: Jalankan Guard setiap kali script ini dimuat oleh HTML
// ==============================================================================
AuthEngine.guardRoute();