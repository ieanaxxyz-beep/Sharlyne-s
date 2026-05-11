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

// 1. Elements and initial volume setup
const bgm = document.getElementById('bgm');
const bgmToggle = document.getElementById('bgm-toggle');

// Set a comfortable background volume (0.0 to 1.0)
if (bgm) bgm.volume = 0.2; 

// 2. The Toggle Function for your Settings Menu
function toggleBGM() {
  if (!bgm || !bgmToggle) return;

  if (bgmToggle.checked) {
    bgm.play().catch(e => console.log("Playback blocked until interaction."));
    localStorage.setItem('bgmEnabled', 'true');
  } else {
    bgm.pause();
    localStorage.setItem('bgmEnabled', 'false');
  }
}

// 3. Auto-sync the toggle state on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedStatus = localStorage.getItem('bgmEnabled');
  
  if (bgmToggle) {
    // If it's a new user or they had it 'true', keep it checked
    bgmToggle.checked = (savedStatus !== 'false');
  }
});

// 4. The "Autoplay" fix: Play on the very first click anywhere
document.addEventListener('click', () => {
  const savedStatus = localStorage.getItem('bgmEnabled');
  
  // Only play if the user hasn't explicitly muted it in the past
  if (savedStatus !== 'false' && bgm && bgm.paused) {
    bgm.play();
    if (bgmToggle) bgmToggle.checked = true;
    localStorage.setItem('bgmEnabled', 'true');
  }
}, { once: true }); // 'once: true' ensures this only runs on the first click

// Global click handler to close modals
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  const settingsModal = document.getElementById('settings-modal');
  if (event.target == modal) modal.style.display = 'none';
  if (event.target == settingsModal) settingsModal.style.display = 'none';
}