(() => {
  const quote = document.getElementById('memoryQuote');
  const lines = [...quote.children];
  quote.setAttribute('aria-label', lines.map(line => line.textContent).join(''));
  const letters = [];
  for (const line of lines) {
    const text = line.textContent;
    line.setAttribute('aria-hidden', 'true');
    line.textContent = '';
    for (const character of text) {
      const letter = document.createElement('i');
      letter.className = 'quote-letter';
      letter.style.fontStyle = 'normal';
      letter.textContent = character;
      line.appendChild(letter);
      letters.push(letter);
    }
  }
  let timer;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  function play() {
    clearTimeout(timer);
    if (quote.hidden) return;
    letters.forEach(letter => letter.classList.toggle('typed', reducedMotion.matches));
    if (reducedMotion.matches) return;
    let index = 0;
    function type() {
      if (quote.hidden) return;
      const letter = letters[index++];
      letter.classList.add('typed');
      if (index < letters.length) timer = setTimeout(type, letter.textContent === '，' ? 600 : 130);
    }
    timer = setTimeout(type, 450);
  }
  new MutationObserver(play).observe(quote, {attributes:true, attributeFilter:['hidden']});
  reducedMotion.addEventListener('change', play);
  play();
})();
