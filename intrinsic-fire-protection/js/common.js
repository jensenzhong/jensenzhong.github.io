const CommonUtils = {
  switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'))
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'))
    const tab = document.getElementById('tab-' + tabId)
    if (tab) tab.classList.add('active')
    const btn = document.querySelector(`[data-tab="${tabId}"]`)
    if (btn) btn.classList.add('active')
  },

  showModal(imageSrc, caption) {
    const modal = document.getElementById('sensorModal')
    const img = document.getElementById('modalImage')
    const cap = document.getElementById('modalCaption')
    img.src = imageSrc
    cap.textContent = caption
    modal.classList.add('active')
  },

  closeModal(event) {
    const modal = document.getElementById('sensorModal')
    if (event.target === modal || event.target.closest('.modal-close-btn')) {
      modal.classList.remove('active')
    }
  },

  animateSequence(elements, delay, className) {
    elements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add(className || 'visible')
      }, i * delay)
    })
  },

  formatTime(date) {
    const pad = n => String(n).padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  }
}
