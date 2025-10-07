const form = document.getElementById('commande-form');
const voirResumeBtn = document.getElementById('voir-resume');
const validerBtn = document.getElementById('valider-commande');
const resumeDiv = document.getElementById('resume');

// Bouton "Voir le résumé"
voirResumeBtn.addEventListener('click', () => {
  const jus = document.getElementById('jus').value;
  const quantite = document.getElementById('quantite').value;
  const nom = document.getElementById('nom').value;

  if (!jus || !quantite || !nom) {
    alert("Veuillez remplir tous les champs avant de voir le résumé.");
    return;
  }

  // Stocker les infos dans localStorage
  localStorage.setItem('commandeJus', jus);
  localStorage.setItem('commandeQuantite', quantite);
  localStorage.setItem('commandeNom', nom);

  // Afficher le résumé
  resumeDiv.innerHTML = `
    <h3>Résumé de votre commande :</h3>
    <p><strong>Nom :</strong> ${nom}</p>
    <p><strong>Jus choisi :</strong> ${jus}</p>
    <p><strong>Quantité :</strong> ${quantite}</p>
  `;
  resumeDiv.style.display = 'block';
  validerBtn.style.display = 'inline-block';
});