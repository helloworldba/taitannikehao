(() => {
  const dialog = document.getElementById('archive');
  document.getElementById('archiveButton').addEventListener('click', () => {
    window.dispatchEvent(new Event('blur'));
    dialog.showModal();
    dialog.scrollTop = 0;
  });
  for (const id of ['archiveClose', 'archiveDone']) {
    document.getElementById(id).addEventListener('click', () => dialog.close());
  }
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
})();
