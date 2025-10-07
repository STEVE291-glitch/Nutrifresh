document.getElementById('paiement-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const methode = document.getElementById('methode').value;
  const numero = document.getElementById('numero').value;

  const confirmation = document.getElementById('confirmation');
  confirmation.innerHTML = `✅ Paiement via ${methode === 'OM' ? 'Orange Money' : 'MTN Money'} en cours pour le numéro ${numero}.`;
  confirmation.style.display = 'block';

  this.reset();
});