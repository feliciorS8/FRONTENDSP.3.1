const openFormPopupBtn = document.getElementById('openFormPopup');
const formPopup = document.getElementById('formPopup');
const closeBtn = document.querySelector('.close');
const itemForm = document.getElementById('itemForm');

openFormPopupBtn.addEventListener('click', () => {
  formPopup.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  formPopup.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === formPopup) {
    formPopup.style.display = 'none';
  }
});

itemForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const itemName = document.getElementById('itemName').value;
  const itemPrice = document.getElementById('itemPrice').value;
  const itemCategory = document.getElementById('itemCategory').value;
  
  console.log('Data Barang:');
  console.log('Nama:', itemName);
  console.log('Harga:', itemPrice);
  console.log('Kategori:', itemCategory);
  
  alert('Data berhasil disimpan!');
  
  itemForm.reset();
  formPopup.style.display = 'none';
});