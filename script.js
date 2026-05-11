function filterSelection(category) {
  const items = document.querySelectorAll('.menu-item');
  const buttons = document.querySelectorAll('.btn');
  document.getElementById('click-sound').play();
  
  // Update active button state
  buttons.forEach(btn => btn.classList.remove('active'));
  
  // Check if event exists to prevent errors
  if (event && event.target) {
    event.target.classList.add('active');
  }

  items.forEach(item => {
    if (category === 'all') {
      item.classList.remove('hidden');
    } else {
      if (item.classList.contains(category)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    }
  });
}

function openDetails(name, desc, options) {
  const modal = document.getElementById('modal');
  const detailsBox = document.getElementById('detailsBox');
  const photoBox = document.getElementById('photoBox');
  const photoImg = document.getElementById('currentOptionImage');
  const container = document.getElementById('modalOptions');

  document.getElementById('select-sound').play();

  // 1. Reset Content
  document.getElementById('modalName').innerText = name;
  document.getElementById('modalDesc').innerText = desc;
  container.innerHTML = ""; 
  
  detailsBox.classList.remove('slide-left');
  photoBox.classList.add('hidden');
  photoBox.classList.remove('fade-in-pop');

  // 2. Build the options
  if (Array.isArray(options) && options.length > 0) {
    options.forEach(opt => {
      const btn = document.createElement("div");
      btn.className = "option-pill";
      btn.innerHTML = `
        <span class="opt-name">${opt.n}</span>
        <span class="opt-price">RM ${opt.p}</span>
      `;
      
      btn.onclick = function() {
        document.querySelectorAll('.option-pill').forEach(p => p.classList.remove('selected'));
        btn.classList.add('selected');
        document.getElementById('select-sound').play();

        if (opt.img) {
          photoImg.src = opt.img;
          photoBox.classList.remove('hidden');
          
          detailsBox.classList.remove('slide-left');
          photoBox.classList.remove('fade-in-pop');
          void detailsBox.offsetWidth; 
          
          detailsBox.classList.add('slide-left');
          photoBox.classList.add('fade-in-pop');
          
          // Trigger the pop animation on the image
          photoImg.classList.remove('active');
          void photoImg.offsetWidth;
          photoImg.classList.add('active');
        }
      };
      
      container.appendChild(btn);
    });

    // 3. AUTO-CLICK the first pill AFTER the loop is finished
    const firstPill = container.querySelector('.option-pill');
    if (firstPill) {
      firstPill.click();
    }
  }
  
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('modal');
  const detailsBox = document.getElementById('detailsBox');
  const photoBox = document.getElementById('photoBox');
  

  modal.style.display = 'none';
  
  // Clean up classes so it doesn't look "stuck" next time you open it
  detailsBox.classList.remove('slide-left');
  photoBox.classList.add('hidden');
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.style.display = 'none';
  document.getElementById('select-sound').play();
}

function toggleSettings() {
  const modal = document.getElementById('settings-modal');
  if (modal) {
    modal.style.display = (modal.style.display === "block") ? "none" : "block";
  }
  document.getElementById('setting-sound').play();
}

function toggleGuide() {
  const guide = document.getElementById('orderGuide');
  if (guide) guide.classList.toggle('hidden');
  document.getElementById('order-sound').play();
}

// Dark Mode Logic
const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
if (darkModeCheckbox) {
  darkModeCheckbox.addEventListener('change', () => {
    const sound = document.getElementById('LDtoggle-sound');
    if (sound) sound.play();
    if (darkModeCheckbox.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  });
}

// 1. Grab elements
const bgm = document.getElementById('bgm');
const bgmToggle = document.getElementById('bgm-toggle');

// 2. Set the volume (0.2 is the perfect 'cozy' level)
if (bgm) bgm.volume = 0.2;

// 3. The Autoplay "Trigger" Function
function attemptAutoplay() {
  const savedStatus = localStorage.getItem('bgmEnabled');
  
  // Only play if they haven't explicitly turned it off before
  if (savedStatus !== 'false' && bgm && bgm.paused) {
    bgm.play()
      .then(() => {
        if (bgmToggle) bgmToggle.checked = true;
        localStorage.setItem('bgmEnabled', 'true');
      })
      .catch(() => {
        // This catch is normal; it waits for the next click
      });
  }
}

// 4. Listen for ANY first interaction on the page
// Using 'mousedown' makes it feel more immediate than 'click'
document.addEventListener('mousedown', attemptAutoplay, { once: true });
document.addEventListener('touchstart', attemptAutoplay, { once: true });
document.addEventListener('keydown', attemptAutoplay, { once: true });

// 5. The Toggle Function (for your Settings Modal)
function toggleBGM() {
  if (!bgm || !bgmToggle) return;

  if (bgmToggle.checked) {
    bgm.play();
    localStorage.setItem('bgmEnabled', 'true');
  } else {
    bgm.pause();
    localStorage.setItem('bgmEnabled', 'false');
  }
}

// 6. Sync the toggle UI when the page refreshes
window.addEventListener('load', () => {
  if (bgmToggle) {
    bgmToggle.checked = (localStorage.getItem('bgmEnabled') !== 'false');
  }
});

// Global click handler to close modals
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  const settingsModal = document.getElementById('settings-modal');
  if (event.target == modal) modal.style.display = 'none';
  if (event.target == settingsModal) settingsModal.style.display = 'none';
}