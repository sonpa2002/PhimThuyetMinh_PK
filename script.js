// Khởi tạo Plyr
const playerElement = document.getElementById('player');
const titleDisplay = document.getElementById('isLoad');
const buttons = document.querySelectorAll('button[data-src]');

const player = new Plyr(playerElement, {
  controls: [
    'play-large', // Nút phát lớn giữa màn hình
    'rewind',     // ⏪ Tua lùi
    'play',       // ▶️ Phát / Tạm dừng
    'fast-forward', // ⏩ Tua tới
    'progress',   // Thanh tiến trình
    'current-time', 
    'duration',
    'mute',
    'volume',
    'settings',
    'fullscreen'
  ]
});

// Hàm phát video HLS
function playVideo(src, title) {
  // Kiểm tra trình duyệt có hỗ trợ HLS hay không
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(src);
    hls.attachMedia(playerElement);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      player.play();
    });
  } else if (playerElement.canPlayType('application/vnd.apple.mpegurl')) {
    // Trường hợp Safari hỗ trợ trực tiếp
    playerElement.src = src;
    playerElement.addEventListener('loadedmetadata', () => {
      player.play();
    });
  } else {
    alert("Trình duyệt của bạn không hỗ trợ video HLS.");
    return;
  }

  // Hiển thị tiêu đề đang phát
  titleDisplay.textContent = `Đang phát: Phim ${title}`;

  // Làm nổi bật nút đang chọn
  // buttons.forEach(btn => btn.classList.remove('FlashActive'));
  // const activeBtn = Array.from(buttons).find(btn => btn.getAttribute('data-title') === title);
  // if (activeBtn) activeBtn.classList.add('FlashActive');
}

// Gán sự kiện click cho từng nút
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const src = button.getAttribute('data-src');
    const title = button.getAttribute('data-title');
    
    if (src) {
      buttons.forEach(btn => btn.classList.remove('FlashActive'));
      button.classList.add('FlashActive');
      playVideo(src, title);
    } else {
      alert('Video chưa được cập nhật!\nVui lòng liên hệ Tiktok: @odaycothuyetminh để được hỗ trợ');
      button.classList.remove('FlashActive');
    }
  });
});
