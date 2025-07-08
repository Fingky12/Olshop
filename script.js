let produk = [];
let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    produk = [...data, ...produkTambahan];
    tampilkanProduk(produk);
    renderKeranjang();
  });

function tampilkanProduk(data) {
  const container = document.getElementById("produkList");
  container.innerHTML = "";
  data.forEach((item) => {
    const div = document.createElement("div");
    div.className = "produk-item";
    div.innerHTML = `
      <img src="${item.gambar}" width="100%" />
      <h3>${item.nama}</h3>
      <p>Harga: Rp${item.harga}</p>
      <button onclick="tambahKeKeranjang(${item.id})">Beli</button>
    `;
    container.appendChild(div);
  });
}

function tambahKeKeranjang(id) {
  const item = produk.find(p => p.id === id);
  keranjang.push(item);
  simpanKeranjang();
  renderKeranjang();
}

function simpanKeranjang() {
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
}

function renderKeranjang() {
  const list = document.getElementById("keranjangList");
  const totalEl = document.getElementById("totalHarga");
  list.innerHTML = "";
  let total = 0;
  keranjang.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nama} - Rp${item.harga}`;
    list.appendChild(li);
    total += item.harga;
  });
  totalEl.textContent = `Rp${total}`;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function filterKategori() {
  const kategori = document.getElementById("filterKategori").value;
  const hasil = kategori ? produk.filter(p => p.kategori === kategori) : produk;
  tampilkanProduk(hasil);
}

function checkoutWhatsApp() {
  let pesan = "Saya ingin membeli:\n";
  keranjang.forEach((item) => {
    pesan += `- ${item.nama} (Rp${item.harga})\n`;
  });
  const total = keranjang.reduce((a, b) => a + b.harga, 0);
  pesan += `\nTotal: Rp${total}`;
  window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(pesan)}`, "_blank");
}

let produkTambahan = JSON.parse(localStorage.getItem("produkTambahan")) || [];

function simpanProdukTambahan() {
  localStorage.setItem("produkTambahan", JSON.stringify(produkTambahan));
}

function tambahProdukBaru() {
  const nama = document.getElementById("namaProduk").value;
  const harga = parseInt(document.getElementById("hargaProduk").value);
  const kategori = document.getElementById("kategoriProduk").value;
  const gambar = document.getElementById("gambarProduk").value;

  if (!nama || !harga || !kategori || !gambar) {
    alert("Semua field wajib diisi!");
    return;
  }

  const idBaru = Date.now(); // ID unik
  const produkBaru = { id: idBaru, nama, harga, kategori, gambar };

  produkTambahan.push(produkBaru);
  simpanProdukTambahan();

  produk.push(produkBaru);
  tampilkanProduk(produk);
  
  // Reset form
  document.getElementById("namaProduk").value = "";
  document.getElementById("hargaProduk").value = "";
  document.getElementById("kategoriProduk").value = "";
  document.getElementById("gambarProduk").value = "";
}
