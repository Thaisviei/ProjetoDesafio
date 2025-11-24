document.getElementById('year').textContent = new Date().getFullYear();

(function revealOnScroll(){
  const revealElems = document.querySelectorAll('.section, .hero');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, {threshold: 0.18});
  revealElems.forEach(el => observer.observe(el));
})();

const menuToggle = document.getElementById('menu-toggle');
const menuList = document.getElementById('menu-list');
if(menuToggle){
  menuToggle.addEventListener('click', ()=>{
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    menuList.classList.toggle('show');
  });
}

const filter = document.getElementById('type-filter');
const search = document.getElementById('search');
const cardsGrid = document.getElementById('cards-grid');

function applyFilter(){
  const type = filter.value.toLowerCase();
  const q = (search.value || '').trim().toLowerCase();
  const cards = cardsGrid.querySelectorAll('.card');
  cards.forEach(card=>{
    const cat = card.dataset.category || '';
    const title = (card.dataset.title || card.querySelector('.card-title').textContent).toLowerCase();
    const matchesType = (type === 'all' || cat === type);
    const matchesQuery = (q === '' || title.includes(q));
    card.style.display = (matchesType && matchesQuery) ? '' : 'none';
  });
}
if(filter) filter.addEventListener('change', applyFilter);
if(search) search.addEventListener('input', applyFilter);

const modal = document.getElementById('preview');
const modalImg = document.getElementById('preview-img');
const modalTitle = document.getElementById('preview-title');
const modalDesc = document.getElementById('preview-desc');
const modalPrice = document.getElementById('preview-price');
const closePreview = document.getElementById('close-preview');
const enrollNow = document.getElementById('enroll-now');

function openPreview(card){
  const title = card.dataset.title || card.querySelector('.card-title').textContent;
  const price = card.dataset.price || card.querySelector('.price').textContent;
  const img = card.dataset.img || card.querySelector('.card-media img').src;
  const desc = card.querySelector('.card-desc') ? card.querySelector('.card-desc').textContent : '';

  modalImg.src = img;
  modalImg.alt = title + ' — imagem do curso';
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modalPrice.textContent = price;
  modal.setAttribute('aria-hidden','false');

  const focusable = modal.querySelectorAll('button, [href], input, textarea, select');
  if(focusable.length) focusable[0].focus();
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
}

cardsGrid.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', (e)=>{
    if(e.target.closest('button')) return;
    openPreview(card);
  });

  card.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      openPreview(card);
    }
  });

  const enrollBtn = card.querySelector('.enroll');
  if(enrollBtn){
    enrollBtn.addEventListener('click', (ev)=>{
      ev.stopPropagation();
      openPreview(card);
    });
  }
});

closePreview.addEventListener('click', closeModal);
document.getElementById('close-2').addEventListener('click', closeModal);

document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false'){
    closeModal();
  }
});

enrollNow.addEventListener('click',()=>{
  alert('Obrigado! Sua solicitação de inscrição foi recebida. Em breve entraremos em contato.');
  closeModal();
});

const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const name = document.getElementById('nome').value || '';
    alert(`Obrigado ${name.trim() || ''}! Recebemos sua mensagem e responderemos por e-mail.`);
    contactForm.reset();
  });
}

document.querySelectorAll('.services-grid .btn.primary').forEach(button => {
  button.addEventListener('click', () => {
    alert("agendamento enviado para ✉ E-mail:contato@Clínica de Beleza Thaís Vieira.com.br");
  });
});