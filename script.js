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
  const nameField = document.getElementById('modalName');
  const descField = document.getElementById('modalDesc');
  const container = document.getElementById('modalOptions');

  nameField.innerText = name;
  descField.innerText = desc;
  container.innerHTML = ""; 

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
      };
      container.appendChild(btn);
    });
  }
  modal.style.display = 'block';
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