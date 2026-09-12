document.querySelectorAll('[data-print]').forEach(button => {
  button.hidden = false;
  button.addEventListener('click', () => window.print());
});

const copyButton = document.querySelector('[data-copy-phone]');
if (copyButton) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText('+79166938811');
      status.textContent = 'Номер скопирован. Вставьте его в поиск MAX.';
    } catch {
      status.textContent = 'Не удалось скопировать автоматически. Выделите и скопируйте номер выше.';
    }
  });
}
