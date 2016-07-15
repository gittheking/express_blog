'use strict';

(() => {
  const burgerButton = document.getElementsByClassName('burger-button')[0];
  const menu         = document.getElementsByClassName('menu')[0];
  menu.style.display = 'none'

  burgerButton.addEventListener('click', event => {
    if( menu.style.display === 'none' ) {
      menu.style.display = 'block';
      burgerButton.style.textShadow = '-1px 1px #EFEFEF';
    } else {
      menu.style.display = 'none'
      burgerButton.style.textShadow = '';
    }
  });
})();