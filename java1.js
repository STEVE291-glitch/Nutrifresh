const gallery = document.querySelector('.gallery-track') ;
const prevBtn = document.querySelector('.prev') ;
const nextBtn = document.querySelector('.next') ;
const searchInput = document.getElementById('searchInput') ;
const products = document.querySelectorAll('.product-item') ;
const menuToggle = document.getElementById('menu-toggle') ;
const navLinks = document.getElementById('nav-links') ;
const yearSpan = document.getElementById('year') ;

let scrollSpeed = 1.2 ;
let autoScrollInterval ;
let direction = 1 ;

// --- Défilement automatique fluide avec rebond ---
function autoScroll() {
  gallery.scrollLeft += scrollSpeed * direction ;
  if (gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth) direction = -1 ;
  if (gallery.scrollLeft <= 0) direction = 1 ;
}

function startAutoScroll() {
  autoScrollInterval = setInterval(autoScroll, 20) ;
}
function stopAutoScroll() {
  clearInterval(autoScrollInterval) ;
}

// --- Boutons gauche/droite ---
prevBtn.addEventListener('click', () => {
  stopAutoScroll() ;
  gallery.scrollLeft -= 250 ;
  setTimeout(startAutoScroll, 2000) ;
}) ;
nextBtn.addEventListener('click', () => {
  stopAutoScroll() ;
  gallery.scrollLeft += 250 ;
  setTimeout(startAutoScroll, 2000) ;
}) ;

const produits = document.querySelectorAll('.product-item');

produits.forEach(item => {
    let touchTimer;

    // Clic souris ou tap court mobile
    item.addEventListener('click', () => {
        const produit = item.dataset.produit;
        if (produit) {
            window.location.href = `commande.html?produit=${produit}`;
        }
    });

    // Tap mobile (évite conflit avec scroll tactile)
    item.addEventListener('touchstart', () => {
        touchTimer = setTimeout(() => {
            const produit = item.dataset.produit;
            if (produit) {
                window.location.href = `commande.html?produit=${produit}`;
            }
        }, 200); // délai court pour distinguer scroll vs tap
    });

    item.addEventListener('touchmove', () => {
        clearTimeout(touchTimer); // annule si c’est un scroll
    });

    item.addEventListener('touchend', () => {
        clearTimeout(touchTimer);
    });
});

// --- Glisser souris ---
let isDown = false ;
let startX ;
let scrollLeft ;

gallery.addEventListener('mousedown', e => {
  isDown = true ;
  startX = e.pageX - gallery.offsetLeft ;
  scrollLeft = gallery.scrollLeft ;
  stopAutoScroll() ;
}) ;
gallery.addEventListener('mouseup', () => { isDown = false ; startAutoScroll() ; }) ;
gallery.addEventListener('mousemove', e => {
  if ( !isDown) return ;
  e.preventDefault() ;
  const x = e.pageX - gallery.offsetLeft ;
  const walk = (x - startX) * 2 ;
  gallery.scrollLeft = scrollLeft - walk ;
}) ;

// --- Tactile mobile ---
let startTouchX = 0 ;
gallery.addEventListener('touchstart', e => { stopAutoScroll() ; startTouchX = e.touches[0].clientX ; }) ;
gallery.addEventListener('touchmove', e => {
  const x = e.touches[0].clientX ;
  const walk = (startTouchX - x) * 2 ;
  gallery.scrollLeft += walk ;
  startTouchX = x ;
}) ;
gallery.addEventListener('touchend', () => { startAutoScroll() ; }) ;

// --- Barre de recherche ---
searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.toLowerCase() ;
  products.forEach(product => {
    const name = product.getAttribute('data-name').toLowerCase() ;
    product.style.display = name.includes(searchValue) ? 'block' : 'none' ;
  }) ;
}) ;


// Fade-in des images au chargement
window.addEventListener('load', () => {
  const items = document.querySelectorAll('.product-item');
  items.forEach((item, i) => {
    setTimeout(() => {
      item.classList.add('visible');
    }, i * 300); // effet en cascade
  });
});

// --- Menu déroulant mobile ---
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show') ;
}) ;

// --- Année dynamique ---
yearSpan.textContent = new Date().getFullYear() ;

// --- Lancer auto-scroll ---
startAutoScroll() ;
