(() => {
  const button = document.getElementById('musicButton');
  const label = button.querySelector('span');
  const music = new Audio('./assets/background-music.mp3');
  music.loop = true;
  music.volume = 0.35;
  music.preload = 'auto';
  music.autoplay = true;
  let pending = false;
  function removeRetry() {
    document.removeEventListener('click', retryOnInteraction);
    document.removeEventListener('keydown', retryOnInteraction);
  }
  function retryOnInteraction(event) {
    if (button.contains(event.target)) return;
    if (event.type === 'keydown' && (event.repeat || ['Shift', 'Control', 'Alt', 'Meta', 'Escape'].includes(event.key))) return;
    removeRetry();
    start();
  }
  function update(playing) {
    button.setAttribute('aria-pressed', String(playing));
    label.textContent = playing ? '关闭音乐' : '播放音乐';
    button.title = playing ? '暂停背景音乐' : '播放背景音乐（循环）';
  }
  async function start() {
    if (pending) return;
    pending = true;
    button.disabled = true;
    try {
      await music.play();
      removeRetry();
      update(true);
    } catch (error) {
      update(false);
      if (error.name === 'NotAllowedError') {
        label.textContent = '音乐待播放';
        document.addEventListener('click', retryOnInteraction);
        document.addEventListener('keydown', retryOnInteraction);
      }
      button.title = error.name === 'NotAllowedError'
        ? '浏览器需要你点击后才能播放背景音乐'
        : '音乐暂时无法播放，请点击重试';
    } finally {
      pending = false;
      button.disabled = false;
    }
  }
  button.addEventListener('click', () => {
    removeRetry();
    if (music.paused) start();
    else { music.autoplay = false; music.pause(); }
  });
  music.addEventListener('playing', () => update(true));
  music.addEventListener('pause', () => update(false));
  music.addEventListener('error', () => {
    update(false);
    button.title = '音乐加载失败，请刷新网页后重试';
  });
  start();
})();
