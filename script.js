function filterSelection(category) {
  const items = document.querySelectorAll('.menu-item');
  const buttons = document.querySelectorAll('.btn');
  
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

  // 1. Reset everything to "Center Mode" when first opening
  document.getElementById('modalName').innerText = name;
  document.getElementById('modalDesc').innerText = desc;
  container.innerHTML = ""; 
  
  // Remove animation classes and hide photo box so it starts clean
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
        // Highlighting the selected pill
        document.querySelectorAll('.option-pill').forEach(p => p.classList.remove('selected'));
        btn.classList.add('selected');

        // 3. THE VISION: If the option has an image, slide and show!
        if (opt.img) {
          // Set the image source
          photoImg.src = opt.img;
          
          // Show the box and trigger animations
          photoBox.classList.remove('hidden');
          
          // Force a tiny restart on animations so they play every click
          detailsBox.classList.remove('slide-left');
          photoBox.classList.remove('fade-in-pop');
          void detailsBox.offsetWidth; // This is a "magic" line to reset CSS animations
          
          detailsBox.classList.add('slide-left');
          photoBox.classList.add('fade-in-pop');
        }
      };
      
      container.appendChild(btn);
    });
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
}

function toggleSettings() {
  const modal = document.getElementById('settings-modal');
  if (modal) {
    modal.style.display = (modal.style.display === "block") ? "none" : "block";
  }
}

function toggleGuide() {
  const guide = document.getElementById('orderGuide');
  if (guide) guide.classList.toggle('hidden');
}

// Dark Mode Logic
const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
if (darkModeCheckbox) {
  darkModeCheckbox.addEventListener('change', () => {
    if (darkModeCheckbox.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  });
}

// Global click handler to close modals
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  const settingsModal = document.getElementById('settings-modal');
  if (event.target == modal) modal.style.display = 'none';
  if (event.target == settingsModal) settingsModal.style.display = 'none';
}