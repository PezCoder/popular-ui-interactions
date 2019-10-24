const emojis = {
  ele: document.querySelector('#emojis'),
  show: function() {
    this.ele.classList.remove('hidden');
  },
  hide: function() {
    this.ele.classList.add('hidden');
  }
};

const likeButton = document.querySelector('#like-button');
likeButton.addEventListener('pointerdown', function(e) {
  selectedEmojiType = null;

  emojis.show();
  const unregisterEvents = handleEmojiSelect();

  function onPointerUp(e) {
    unregisterEvents();
    console.log('final emoji selected', selectedEmojiType);
    emojis.hide();
    document.removeEventListener('pointerup', onPointerUp);
  }

  document.addEventListener('pointerup', onPointerUp);
});

let selectedEmojiType = null;
function handleEmojiSelect() {
  const emojis = document.querySelectorAll('#emojis span');
  function onEmojiEnter() {
    selectedEmojiType = this.dataset.emojiType;
  }

  function onEmojiLeave() {
    selectedEmojiType = null;
  }
  emojis.forEach(emoji => {
    emoji.addEventListener('pointerenter', onEmojiEnter);
    emoji.addEventListener('pointerleave', onEmojiLeave);
  });

  return function unregisterEvents() {
    emojis.forEach(emoji => {
      emoji.removeEventListener('pointerenter', onEmojiEnter);
      emoji.removeEventListener('pointerleave', onEmojiLeave);
    });
  };
}
