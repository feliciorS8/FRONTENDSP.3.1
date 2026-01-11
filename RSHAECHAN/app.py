from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import mysql.connector
from mysql.connector import Error
from datetime import datetime, date
import os
from werkzeug.security import check_password_hash
from werkzeug.utils import secure_filename
from flask import session


app = Flask(__name__)
app.secret_key = "medical_care_center_2024_secret_key"

# Database Configuration
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',  # Sesuaikan dengan username MySQL Anda
    'password': 'dijahaechan',  # Sesuaikan dengan password MySQL Anda
    'database': 'medical_care_center'
}

def get_db_connection():
    """Membuat koneksi ke database"""
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None
    
#settingan upload gambar
UPLOAD_FOLDER = 'static/images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route: Admin Dashboard
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        nama_admin = request.form['nama_admin']
        password = request.form['password']

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM admin WHERE nama_admin = %s", (nama_admin,))
        admin = cursor.fetchone()

        cursor.close()
        conn.close()

        if admin and check_password_hash(admin['password'], password):
            session['admin_logged_in'] = True
            session['admin_name'] = admin['nama_admin']
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Login admin gagal', 'error')

    return render_template('admin/login.html')
#proteksi admin
def admin_required():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

#dashboard admin
@app.route('/admin/dashboard')
def admin_dashboard():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) total FROM obat")
    total_obat = cursor.fetchone()['total']

    cursor.close()
    conn.close()

    return render_template('admin/dashboard.html', total_obat=total_obat)

#tampilkan data obat
@app.route('/admin/obat')
def admin_obat():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM obat")
    obat = cursor.fetchall()

    cursor.close()
    conn.close()

    return render_template('admin/obat.html', obat=obat)

# Add new obat
@app.route('/admin/obat/tambah', methods=['POST'])
def tambah_obat():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

    nama = request.form['nama_obat']
    fungsi = request.form['fungsi']
    stok = request.form['stok']
    harga = request.form['harga']
    file = request.files['gambar']

    filename = None
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO obat (nama_obat, fungsi, stok, harga, gambar)
        VALUES (%s, %s, %s, %s, %s)
    """, (nama, fungsi, stok, harga, filename))

    conn.commit()
    cursor.close()
    conn.close()

    return redirect(url_for('admin_obat'))

#hapus obat
@app.route('/admin/obat/hapus/<int:id_obat>')
def hapus_obat(id_obat):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM obat WHERE id_obat = %s", (id_obat,))
    conn.commit()

    cursor.close()
    conn.close()

    return redirect(url_for('admin_obat'))

#logout admin
@app.route('/admin/logout')
def admin_logout():
    session.clear()
    return redirect(url_for('admin_login'))

# Route: Home
@app.route('/')
def index():
    conn = get_db_connection()
    if not conn:
        flash('Gagal terhubung ke database', 'error')
        return render_template('index.html', sliders=[], poli_list=[])
    
    cursor = conn.cursor(dictionary=True)
    
    # Get slider images
    cursor.execute("SELECT * FROM slider WHERE aktif = TRUE ORDER BY urutan")
    sliders = cursor.fetchall()
    
    # Get poli data
    cursor.execute("SELECT * FROM poli ORDER BY id_poli")
    poli_list = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return render_template('index.html', sliders=sliders, poli_list=poli_list)


# Route: Jadwal Dokter
@app.route('/jadwal-dokter')
def jadwal_dokter():
    conn = get_db_connection()
    if not conn:
        flash('Gagal terhubung ke database', 'error')
        return render_template('jadwal_dokter.html', dokter_list=[])
    
    cursor = conn.cursor(dictionary=True)
    
    # Get dokter dengan jadwal praktik
    query = """
        SELECT 
            d.id_dokter,
            d.nama_dokter,
            d.spesialisasi,
            d.foto,
            p.nama_poli,
            j.hari,
            j.jam_mulai,
            j.jam_selesai,
            j.kuota_pasien
        FROM dokter d
        LEFT JOIN poli p ON d.id_poli = p.id_poli
        LEFT JOIN jadwal_praktik j ON d.id_dokter = j.id_dokter
        ORDER BY d.id_dokter, 
                 FIELD(j.hari, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu')
    """
    
    cursor.execute(query)
    results = cursor.fetchall()
    
    # Organize data by dokter
    dokter_dict = {}
    for row in results:
        dokter_id = row['id_dokter']
        if dokter_id not in dokter_dict:
            dokter_dict[dokter_id] = {
                'id_dokter': row['id_dokter'],
                'nama_dokter': row['nama_dokter'],
                'spesialisasi': row['spesialisasi'],
                'foto': row['foto'],
                'nama_poli': row['nama_poli'],
                'jadwal': []
            }
        
        if row['hari']:
            dokter_dict[dokter_id]['jadwal'].append({
                'hari': row['hari'],
                'jam_mulai': str(row['jam_mulai']),
                'jam_selesai': str(row['jam_selesai']),
                'kuota_pasien': row['kuota_pasien']
            })
    
    dokter_list = list(dokter_dict.values())
    
    cursor.close()
    conn.close()
    
    return render_template('jadwal_dokter.html', dokter_list=dokter_list)

# Route: Ambil Nomor Antrian (Form)
@app.route('/antrian', methods=['GET', 'POST'])
def antrian():
    if request.method == 'POST':
        # Process form submission
        nama_pasien = request.form.get('nama_pasien')
        tanggal_lahir = request.form.get('tanggal_lahir')
        jenis_kelamin = request.form.get('jenis_kelamin')
        alamat = request.form.get('alamat')
        no_telepon = request.form.get('no_telepon')
        email = request.form.get('email')
        id_poli = request.form.get('id_poli')
        id_dokter = request.form.get('id_dokter')
        tanggal_kunjungan = request.form.get('tanggal_kunjungan')
        keluhan = request.form.get('keluhan')
        
        conn = get_db_connection()
        if not conn:
            flash('Gagal terhubung ke database', 'error')
            return redirect(url_for('antrian'))
        
        cursor = conn.cursor(dictionary=True)
        
        try:
            # Check if pasien exists by phone number
            cursor.execute("SELECT id_pasien FROM pasien WHERE no_telepon = %s", (no_telepon,))
            existing_pasien = cursor.fetchone()
            
            if existing_pasien:
                id_pasien = existing_pasien['id_pasien']
            else:
                # Generate nomor rekam medis
                cursor.execute("SELECT COUNT(*) as total FROM pasien")
                total_pasien = cursor.fetchone()['total']
                no_rekam_medis = f"RM2024{str(total_pasien + 1).zfill(3)}"
                
                # Insert new pasien
                insert_pasien = """
                    INSERT INTO pasien (no_rekam_medis, nama_pasien, tanggal_lahir, 
                                       jenis_kelamin, alamat, no_telepon, email)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(insert_pasien, (no_rekam_medis, nama_pasien, tanggal_lahir,
                                              jenis_kelamin, alamat, no_telepon, email))
                id_pasien = cursor.lastrowid
            
            # Generate nomor antrian untuk hari ini
            cursor.execute("""
                SELECT COUNT(*) as total FROM antrian 
                WHERE tanggal_kunjungan = %s
            """, (tanggal_kunjungan,))
            total_antrian = cursor.fetchone()['total']
            nomor_antrian = total_antrian + 1
            
            # Insert antrian
            insert_antrian = """
                INSERT INTO antrian (id_pasien, id_dokter, id_poli, tanggal_kunjungan,
                                    nomor_antrian, status, keluhan)
                VALUES (%s, %s, %s, %s, %s, 'Menunggu', %s)
            """
            cursor.execute(insert_antrian, (id_pasien, id_dokter, id_poli, 
                                           tanggal_kunjungan, nomor_antrian, keluhan))
            
            conn.commit()
            
            flash(f'Nomor antrian Anda: {nomor_antrian}. Mohon datang 15 menit sebelum jadwal.', 'success')
            return redirect(url_for('index'))
            
        except Error as e:
            conn.rollback()
            flash(f'Terjadi kesalahan: {str(e)}', 'error')
            
        finally:
            cursor.close()
            conn.close()
    
    # GET request - show form
    conn = get_db_connection()
    if not conn:
        flash('Gagal terhubung ke database', 'error')
        return render_template('antrian.html', poli_list=[], dokter_list=[])
    
    cursor = conn.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM poli ORDER BY nama_poli")
    poli_list = cursor.fetchall()
    
    cursor.execute("""
        SELECT d.*, p.nama_poli 
        FROM dokter d
        LEFT JOIN poli p ON d.id_poli = p.id_poli
        ORDER BY d.nama_dokter
    """)
    dokter_list = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return render_template('antrian.html', poli_list=poli_list, dokter_list=dokter_list)

# API: Get dokter by poli (for dynamic dropdown)
@app.route('/api/dokter-by-poli/<int:id_poli>')
def get_dokter_by_poli(id_poli):
    conn = get_db_connection()
    if not conn:
        return jsonify([])
    
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM dokter WHERE id_poli = %s ORDER BY nama_dokter", (id_poli,))
    dokter_list = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return jsonify(dokter_list)

if __name__ == '__main__':
    app.run(debug=True, port=5000)