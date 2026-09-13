const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
  mobileNav.hidden = true;
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(willOpen));
  menuButton.setAttribute('aria-label', willOpen ? 'Закрыть меню' : 'Открыть меню');
  mobileNav.hidden = !willOpen;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) closeMenu(true); });
document.addEventListener('click', event => { if (!mobileNav.hidden && !event.target.closest('.header')) closeMenu(); });
window.matchMedia('(min-width: 821px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const cookieChoiceName = 'cookie_notice_choice';
const cookieChoice = document.cookie
  .split('; ')
  .find(item => item.startsWith(`${cookieChoiceName}=`))
  ?.split('=')[1];

if (!['accepted', 'declined'].includes(cookieChoice)) {
  const cookieNotice = document.createElement('section');
  cookieNotice.className = 'cookie-notice';
  cookieNotice.setAttribute('role', 'region');
  cookieNotice.setAttribute('aria-label', 'Настройки cookie');
  cookieNotice.innerHTML = `
    <div class="cookie-notice-copy">
      <strong>Настройки cookie</strong>
      <p>Сайт использует один технический cookie, чтобы сохранить ваш выбор. Аналитические и рекламные cookie не применяются.</p>
      <nav class="cookie-notice-links" aria-label="Документы о персональных данных">
        <a href="privacy.html">Политика конфиденциальности</a>
        <a href="consent.html">Согласие на обработку персональных данных</a>
      </nav>
    </div>
    <div class="cookie-notice-actions">
      <button class="cookie-button cookie-button-secondary" type="button" data-cookie-choice="declined">Отклонить</button>
      <button class="cookie-button cookie-button-primary" type="button" data-cookie-choice="accepted">Принять</button>
    </div>`;
  document.body.append(cookieNotice);

  cookieNotice.querySelectorAll('[data-cookie-choice]').forEach(button => {
    button.addEventListener('click', () => {
      const secure = location.protocol === 'https:' ? '; Secure' : '';
      document.cookie = `${cookieChoiceName}=${button.dataset.cookieChoice}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
      cookieNotice.remove();
    });
  });
}
