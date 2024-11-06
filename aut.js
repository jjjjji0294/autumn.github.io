// 요소 선택
const playButton = document.querySelector('.play-btn');
const progressBar = document.querySelector('#progress');
const currentTimeDisplay = document.querySelector('#current-time');
const totalTimeDisplay = document.querySelector('#total-time');
const audio = document.querySelector('#audio');

// 음악 재생 상태
let isPlaying = false;

// 재생/일시정지 버튼 클릭 이벤트
playButton.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playButton.textContent = '▶'; // 재생 버튼 모양
  } else {
    audio.play();
    playButton.textContent = '❚❚'; // 일시정지 버튼 모양
    updateUI(); // UI 업데이트
  }
  isPlaying = !isPlaying;
});

// 음악 진행 상태 업데이트
audio.addEventListener('timeupdate', () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;

  // 진행 바 업데이트
  progressBar.value = (currentTime / duration) * 100;

  // 시간 표시 업데이트
  currentTimeDisplay.textContent = formatTime(currentTime);
  totalTimeDisplay.textContent = formatTime(duration);
});

// 진행 바 클릭 시 음악 위치 변경
progressBar.addEventListener('input', (e) => {
  const value = e.target.value;
  const duration = audio.duration;
  audio.currentTime = (value / 100) * duration;
});

// 시간 포맷팅 함수 (00:00 형식으로 변환)
function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(Math.floor(seconds % 60)).padStart(2, '0');
  return `${mins}:${secs}`;
}

// 음악 초기화 (음악 시작 시 시간 설정)
audio.addEventListener('loadeddata', () => {
  totalTimeDisplay.textContent = formatTime(audio.duration);
  updateUI(); // 처음 상태 업데이트
});

// 초기 UI 설정
function updateUI() {
  progressBar.value = (audio.currentTime / audio.duration) * 100;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
  totalTimeDisplay.textContent = formatTime(audio.duration);
}
