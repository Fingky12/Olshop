const produk = [
  { nama: "Sepatu Sneakers", harga: 250000 },
  { nama: "Kaos Distro", harga: 120000 },
  { nama: "Topi Keren", harga: 80000 }
];

let keranjang = [];

function tampilkanProduk() {
  const container = document.getElementById("produkList");
  produk.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "produk-item";
    div.innerHTML = `
      <h3>${item.nama}</h3>
      <p>Harga: Rp${item.harga}</p>
      <button onclick="tambahKeKeranjang(${index})">Beli</button>
    `;
    container.appendChild(div);
  });
}

function tambahKeKeranjang(index) {
  keranjang.push(produk[index]);
  renderKeranjang();
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

tampilkanProduk();
