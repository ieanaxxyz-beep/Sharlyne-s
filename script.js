function filterSelection(category) {
  const items = document.querySelectorAll('.menu-item');
  const buttons = document.querySelectorAll('.btn');
  
  // Update active button state
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

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
  // Use the ID "modal" to match the HTML above
  const modal = document.getElementById('modal');
  const nameField = document.getElementById('modalName');
  const descField = document.getElementById('modalDesc');
  const container = document.getElementById('modalOptions');

  // If these IDs don't exist, stop the function so it doesn't crash
  if (!modal || !container) return; 

  nameField.innerText = name;
  descField.innerText = desc;
  container.innerHTML = ''; 

  if (Array.isArray(options)) {
    // For your new Popia style [ {n: '', p: ''} ]
    options.forEach(opt => {
      container.innerHTML += `
        <div class="price-row">
          <span>${opt.n}</span>
          <span class="price">RM ${opt.p}</span>
        </div>`;
    });
  } else {
    // For your old style ('Label', 'Price')
    const allArgs = Array.from(arguments);
    const priceData = allArgs.slice(2); 

    for (let i = 0; i < priceData.length; i += 2) {
      if (priceData[i]) {
        container.innerHTML += `
          <div class="price-row">
            <span>${priceData[i]}</span>
            <span class="price">${priceData[i+1] || ''}</span>
          </div>`;
      }
    }
  }

  modal.style.display = 'flex';
}
function closeModal() {
  // We check for both IDs to be safe
  const modal = document.getElementById('modal');
  const foodModal = document.getElementById('foodModal');
  
  if (modal) modal.style.display = 'none';
  if (foodModal) foodModal.style.display = 'none';
}

// Extra safety: Close the window if they click the dark area outside the box
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  const foodModal = document.getElementById('foodModal');
  
  if (event.target == modal) modal.style.display = 'none';
  if (event.target == foodModal) foodModal.style.display = 'none';
}
// Toggle the Settings Modal
function toggleSettings() {
  const modal = document.getElementById('settings-modal');
  modal.style.display = (modal.style.display === "block") ? "none" : "block";
}

// Dark Mode Logic
const darkModeCheckbox = document.getElementById('dark-mode-checkbox');

darkModeCheckbox.addEventListener('change', () => {
  if (darkModeCheckbox.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
});

// Close modal if clicking outside the box
window.onclick = function(event) {
  const settingsModal = document.getElementById('settings-modal');
  if (event.target == settingsModal) {
    settingsModal.style.display = "none";
  }
}