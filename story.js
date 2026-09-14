(() => {
  const story = document.getElementById('story');
  document.getElementById('storyButton').addEventListener('click', () => {
    window.dispatchEvent(new Event('blur'));
    story.showModal();
    story.scrollTop = 0;
  });
  for (const id of ['storyClose', 'storyDone']) {
    document.getElementById(id).addEventListener('click', () => story.close());
  }
  story.addEventListener('click', event => {
    if (event.target !== story) return;
    const rect = story.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) story.close();
  });
})();

(() => {
 const dialog = document.getElementById('usageDeclaration');
 document.getElementById('usageDeclarationButton').addEventListener('click', () => {
  window.dispatchEvent(new Event('blur'));
  dialog.showModal();
  dialog.scrollTop = 0;
 });
 for (const id of ['usageDeclarationClose', 'usageDeclarationDone']) {
  document.getElementById(id).addEventListener('click', () => dialog.close());
 }
 dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
 });
})();
