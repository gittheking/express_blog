'use strict';

(() => {
  const modal       = document.getElementsByClassName('my-modal')[0];
  const button      = document.getElementsByClassName('edit-profile')[0];
  const closeButton = document.getElementById('close-modal');

  button.addEventListener('click', event => {
    modal.style.display = 'block';
  });

  closeButton.addEventListener('click', event => {
    modal.style.display = 'none';
  });

})();