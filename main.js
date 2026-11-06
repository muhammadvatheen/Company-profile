/* ===== DATA ===== */
// Semua foto ada di folder images/. Ganti nama file di sini kalau nama fotomu berbeda.
const PROPERTI = [
  {id:1, nama:"AYANA Villas Bali",          tipe:"Villa",     kota:"Bali",       area:"Ubud",        harga:38955801, nilai:9.7, ulasan:57, foto:"image/image bali.jpg", batal:true,  sarapan:true},
  {id:2, nama:"Hotel Indonesia Kempinski Jakarta",     tipe:"Hotel",     kota:"Jakarta",    area:"Sudirman",    harga:96025600,  nilai:9.2, ulasan:858,foto:"image/image jakarta.jpg", batal:true,  sarapan:true},
  {id:3, nama:"Hotel Indigo Bandung Dago Pakar by IHG",         tipe:"Hotel",       kota:"Bandung",    area:"Dago",        harga:6908883,  nilai:8.7, ulasan:141,  foto:"image/image bandung.jpg", batal:false, sarapan:false},
  {id:4, nama:"The Grand Mansion Menteng",        tipe:"Apartemen", kota:"Jakarta",    area:"Kuningan",    harga:8130500, nilai:9.7, ulasan:65, foto:"image/image jkt.jpg", batal:true,  sarapan:false},
  {id:5, nama:"Seven Secrets Resort Lombok",     tipe:"Resor",     kota:"Lombok",     area:"Senggigi",    harga: 22861300, nilai:9.7, ulasan:194, foto:"image/image lombok.jpg", batal:true,  sarapan:true},
  {id:6, nama:"Meliá Purosani Yogyakarta",        tipe:"Villa",     kota:"Yogyakarta", area:"Sleman",      harga:4680000, nilai:8.8, ulasan:1.903, foto:"image/image jogja.jpg", batal:true,  sarapan:true},
  {id:7, nama:"Bohemian Jogja Villas with Private Pool",  tipe:"Kos",       kota:"Yogyakarta", area:"Malioboro",   harga:3375610,  nilai:9.1, ulasan:141, foto:"image/image jgj.jpg", batal:false, sarapan:false},
  {id:8, nama:"LaMaIn Villa Dago Pakar",         tipe:"Hotel",     kota:"Bandung",    area:"Lembang",     harga:14300440, nilai:10, ulasan:1, foto:"image/image bdng.jpg", batal:true,  sarapan:true},
  {id:9, nama:"Seminyak Pool Villa",      tipe:"Villa",     kota:"Bali",       area:"Seminyak",    harga:3200000, nilai:9.4, ulasan:221, foto:"image/image bbaallii.jpg", batal:true,  sarapan:true},
  {id:10,nama:"Rinjani View Resort",      tipe:"Resor",     kota:"Lombok",     area:"Sembalun",    harga:1600000, nilai:8.6, ulasan:97,  foto:"image/image lommbok.jpg",batal:false, sarapan:true},
  {id:11,nama:"Kemang Suites",            tipe:"Apartemen", kota:"Jakarta",    area:"Kemang",      harga:890000,  nilai:8.2, ulasan:310, foto:"image/image jjakarta.jpg",batal:true,  sarapan:false},
  {id:12,nama:"Kos Nyaman Jatinangor",    tipe:"Kos",       kota:"Bandung",    area:"Jatinangor",  harga:300000,  nilai:7.9, ulasan:64,  foto:"image/image bbandung.jpg",batal:false, sarapan:false}
];
const JENIS = [
  {n:"Hotel",     foto:"image/image dubai.jpg"},
  {n:"Apartemen", foto:"image/image apartemen.jpg"},
  {n:"Resor",     foto:"image/image resor.jpg"},
  {n:"Villa",     foto:"image/image villa.jpg"},
  {n:"Kos",       foto:"image/image kosan.jpg"}
];
const DESTINASI = [
  {n:"Bali",       foto:"image/image balii.jpg"},
  {n:"Jakarta",    foto:"image/image jakartaa.jpg"},
  {n:"Bandung",    foto:"image/image bandungg.jpg"},
  {n:"Yogyakarta", foto:"image/image jogjaa.jpg"},
  {n:"Lombok",     foto:"image/image lombokk.jpg"}
];

/* ===== HELPER ===== */
const $ = s => document.querySelector(s);
const rp = n => "Rp" + n.toLocaleString("id-ID");
const iso = d => d.toISOString().slice(0, 10);
// Kalau foto belum ada di folder images/, tampilkan kotak abu-abu (bukan ikon rusak)
const KOSONG = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#e3e8ee"/><path d="M120 200l50-60 40 45 30-30 40 45z" fill="#c3ccd8"/><circle cx="160" cy="110" r="16" fill="#c3ccd8"/></svg>');
const gambar = (src, alt) => `<img src="${src}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src='${KOSONG}'">`;
const label = r => r >= 9 ? "Luar biasa" : r >= 8.5 ? "Sangat bagus" : r >= 8 ? "Bagus" : "Baik";

const state = {tipe:"", malam:0, fav:new Set()};
let toastT;
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("on");clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove("on"),2500)}

/* ===== RENDER BAGIAN STATIS ===== */
$("#types").innerHTML = JENIS.map(j => {
  const jml = PROPERTI.filter(p => p.tipe === j.n).length;
  return `<button data-tipe="${j.n}"><div class="im">${gambar(j.foto, j.n)}</div><b>${j.n}</b><small>${jml} properti</small></button>`;
}).join("");

$("#types").innerHTML += $("#types").innerHTML;

$("#dests").innerHTML = DESTINASI.map(d => {
  const jml = PROPERTI.filter(p => p.kota === d.n).length;
  return `<button class="dest" data-kota="${d.n}">${gambar(d.foto, d.n)}<span>${d.n}<small>${jml} properti</small></span></button>`;
}).join("");

/* ===== DAFTAR PROPERTI ===== */
function render(){
  const kota = $("#q").value.trim().toLowerCase();
  let r = PROPERTI.filter(p =>
    (!state.tipe || p.tipe === state.tipe) &&
    (!kota || p.kota.toLowerCase().includes(kota) || p.area.toLowerCase().includes(kota) || p.nama.toLowerCase().includes(kota))
  );
  const s = $("#sort").value;
  if (s === "low") r.sort((a,b) => a.harga - b.harga);
  else if (s === "high") r.sort((a,b) => b.harga - a.harga);
  else if (s === "rate") r.sort((a,b) => b.nilai - a.nilai);

  $("#judul").textContent = (state.tipe || kota) ? `${r.length} penginapan ditemukan` : "Penginapan pilihan untuk Anda";
  $("#info").textContent = state.malam ? `Harga untuk ${state.malam} malam, termasuk pajak.` : "Pilih tanggal untuk melihat total harga.";

  $("#grid").innerHTML = r.length ? r.map(p => {
    const total = state.malam ? p.harga * state.malam : p.harga;
    const ket = state.malam ? `${state.malam} malam, termasuk pajak` : "per malam, termasuk pajak";
    return `<article class="card">
      <div class="im">${gambar(p.foto, p.nama)}
        <span class="badge">${p.tipe}</span>
        <button class="heart ${state.fav.has(p.id) ? "on" : ""}" data-fav="${p.id}" aria-label="Simpan ${p.nama}" aria-pressed="${state.fav.has(p.id)}">${state.fav.has(p.id) ? "♥" : "♡"}</button>
      </div>
      <div class="tx">
        <h3>${p.nama}</h3>
        <span class="loc">${p.area}, ${p.kota}</span>
        <div class="rate"><b>${p.nilai}</b><span><strong>${label(p.nilai)}</strong> · ${p.ulasan} ulasan</span></div>
        ${p.batal ? '<span class="free">✓ Batal gratis</span>' : ""}
        ${p.sarapan ? '<span class="free">✓ Termasuk sarapan</span>' : ""}
        <div class="price">${rp(total)}<small>${ket}</small></div>
      </div>
      <button class="book" data-book="${p.id}">Pesan sekarang</button>
    </article>`;
  }).join("") : `<div class="empty"><b>Tidak ada penginapan yang cocok.</b><br>Coba ganti tujuan atau pilih jenis akomodasi lain.</div>`;
}

/* ===== TAB / FILTER JENIS ===== */
function setTipe(t){
  state.tipe = t;
  document.querySelectorAll("#tabs button").forEach(b => b.classList.toggle("on", b.dataset.type === t));
  render();
}
$("#tabs").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  setTipe(b.dataset.type);
  $("#hasil").scrollIntoView({behavior:"smooth"});
});
$("#types").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  setTipe(b.dataset.tipe);
  $("#hasil").scrollIntoView({behavior:"smooth"});
});
$("#dests").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  $("#q").value = b.dataset.kota;
  render();
  $("#hasil").scrollIntoView({behavior:"smooth"});
});

/* ===== PENCARIAN & TANGGAL ===== */
$("#in").min = iso(new Date());
$("#in").addEventListener("change", () => {
  const d = new Date($("#in").value); d.setDate(d.getDate() + 1);
  $("#out").min = iso(d);
  if ($("#out").value && $("#out").value <= $("#in").value) $("#out").value = iso(d);
});
$("#form").addEventListener("submit", e => {
  e.preventDefault();
  const a = $("#in").value, b = $("#out").value, er = $("#err");
  er.textContent = "";
  if (a || b) {
    if (!a || !b) { er.textContent = "Isi tanggal check-in dan check-out."; return; }
    if (b <= a)   { er.textContent = "Check-out harus setelah check-in."; return; }
    state.malam = Math.round((new Date(b) - new Date(a)) / 864e5);
  } else state.malam = 0;
  render();
  $("#hasil").scrollIntoView({behavior:"smooth"});
});
$("#sort").addEventListener("change", render);

/* ===== FAVORIT & PESAN ===== */
$("#grid").addEventListener("click", e => {
  const h = e.target.closest("[data-fav]");
  if (h) {
    const id = +h.dataset.fav;
    state.fav.has(id) ? state.fav.delete(id) : state.fav.add(id);
    render();
    toast(state.fav.has(id) ? "Disimpan ke favorit" : "Dihapus dari favorit");
    return;
  }
  const b = e.target.closest("[data-book]");
  if (b) bukaPesan(+b.dataset.book);
});

function bukaModal(html){ $("#box").innerHTML = html; $("#modal").classList.add("on"); }
function tutup(){ $("#modal").classList.remove("on"); }
$("#modal").addEventListener("click", e => { if (e.target.id === "modal") tutup(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") tutup(); });

function bukaPesan(id){
  const p = PROPERTI.find(x => x.id === id);
  const n = state.malam || 1, sub = p.harga * n, layanan = Math.round(sub * .05);
  const a = $("#in").value, b = $("#out").value;
  bukaModal(`<h3>Pesan ${p.nama}</h3>
    <p style="color:var(--mute);margin-bottom:10px">${p.area}, ${p.kota}</p>
    <div class="row"><span>Check-in</span><b>${a || "Belum dipilih"}</b></div>
    <div class="row"><span>Check-out</span><b>${b || "Belum dipilih"}</b></div>
    <div class="row"><span>${rp(p.harga)} × ${n} malam</span><span>${rp(sub)}</span></div>
    <div class="row"><span>Biaya layanan (5%)</span><span>${rp(layanan)}</span></div>
    <div class="row tot"><span>Total</span><span>${rp(sub + layanan)}</span></div>
    ${a && b ? "" : '<p class="err">Pilih tanggal di kolom pencarian agar total harga akurat.</p>'}
    <form id="fp">
      <label class="fld">Nama lengkap<input id="nm" required></label>
      <label class="fld">Email<input id="em" type="email" required></label>
      <label class="fld">No. WhatsApp<input id="hp" type="tel" pattern="[0-9+\\- ]{8,}" required></label>
      <div class="acts"><button type="button" class="cx" id="cx">Batal</button><button class="ok">Konfirmasi pesanan</button></div>
    </form>`);
  $("#nm").focus();
  $("#cx").onclick = tutup;
  $("#fp").onsubmit = ev => {
    ev.preventDefault();
    const kode = "STY" + Math.random().toString(36).slice(2, 8).toUpperCase();
    bukaModal(`<div style="text-align:center"><div style="font-size:3rem;color:var(--green)">✓</div>
      <h3>Pesanan diterima</h3>
      <p style="margin:8px 0 16px">Terima kasih, ${$("#nm").value}. Kode pesanan Anda <b>${kode}</b>. Detail dikirim ke ${$("#em").value}.</p>
      <div class="acts"><button class="ok" id="cl">Tutup</button></div></div>`);
    $("#cl").onclick = tutup;
  };
}

/* ===== MODAL DAFTAR / MASUK / NEWSLETTER ===== */
function formAkun(judul, tombol){
  bukaModal(`<h3>${judul}</h3>
    <form id="fa">
      <label class="fld">Email<input type="email" id="ae" required></label>
      <label class="fld">Kata sandi<input type="password" id="ap" minlength="6" required></label>
      <div class="acts"><button type="button" class="cx" id="cx">Batal</button><button class="ok">${tombol}</button></div>
    </form>`);
  $("#ae").focus();
  $("#cx").onclick = tutup;
  $("#fa").onsubmit = ev => { ev.preventDefault(); tutup(); toast("Contoh saja: belum terhubung ke server"); };
}
$("#btnLogin").onclick = () => formAkun("Masuk ke akun Anda", "Masuk");
$("#btnReg").onclick   = () => formAkun("Buat akun baru", "Daftar");
$("#btnPromo").onclick = () => formAkun("Buat akun baru", "Daftar");
$("#btnList").onclick  = () => toast("Halaman mitra belum dibuat");
$("#nl").addEventListener("submit", e => { e.preventDefault(); toast("Terima kasih, Anda sudah berlangganan"); $("#nlmail").value = ""; });

render();