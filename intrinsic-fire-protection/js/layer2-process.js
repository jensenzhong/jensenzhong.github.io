const Layer2Process = {
  currentIndex: 0,
  totalItems: 5,
  checkedItems: new Set(),

  init() {
    this.updateCarouselPositions()
    this._autoCheckDelay = null
  },

  onBtnClick() {
    const btn = document.getElementById('activateBtn')
    if (btn.classList.contains('start')) {
      this.startDetect()
    } else if (btn.classList.contains('enabled')) {
      this.activate()
    }
  },

  startDetect() {
    const btn = document.getElementById('activateBtn')
    btn.classList.remove('start')
    btn.textContent = '允许作业'
    btn.disabled = true

    document.getElementById('layer2StatusBar').textContent = '安全检查进行中...'
    document.getElementById('layer2StatusBar').className = 'status-bar checking'

    this.autoStart()
  },

  autoStart() {
    const items = document.querySelectorAll('#checklist .checklist-item')
    const checkNext = (index) => {
      if (index >= items.length) return
      const item = items[index]
      if (!item || this.checkedItems.has(index)) return
      this.toggleCheck(item)
      this._autoCheckDelay = setTimeout(() => checkNext(index + 1), 900)
    }
    this._autoCheckDelay = setTimeout(() => checkNext(0), 400)
  },

  stopAuto() {
    if (this._autoCheckDelay) {
      clearTimeout(this._autoCheckDelay)
      this._autoCheckDelay = null
    }
  },

  updateCarouselPositions() {
    const items = document.querySelectorAll('#checklist .checklist-item')
    items.forEach((item, i) => {
      const offset = i - this.currentIndex

      if (offset < 0) {
        item.style.display = 'none'
      } else if (offset === 0) {
        item.style.display = ''
        item.style.opacity = '1'
        item.style.transform = 'translateY(0) scale(1)'
        item.style.zIndex = '10'
        item.style.pointerEvents = 'auto'
      } else if (offset === 1) {
        item.style.display = ''
        item.style.opacity = '0.35'
        item.style.transform = 'translateY(5px) scale(0.97)'
        item.style.zIndex = '9'
        item.style.pointerEvents = 'none'
      } else if (offset === 2) {
        item.style.display = ''
        item.style.opacity = '0.15'
        item.style.transform = 'translateY(10px) scale(0.94)'
        item.style.zIndex = '8'
        item.style.pointerEvents = 'none'
      } else {
        item.style.display = 'none'
      }
    })
  },

  toggleCheck(el) {
    const index = parseInt(el.dataset.index)
    if (index !== this.currentIndex || this.checkedItems.has(index)) return

    this.checkedItems.add(index)

    el.classList.add('checked')

    const overlayItem = document.querySelector(`.check-overlay-item[data-check="${index}"]`)

    setTimeout(() => {
      el.style.opacity = '0'
      el.style.transform = 'translateX(110%) rotate(2deg)'

      if (overlayItem) {
        overlayItem.style.opacity = '1'
        overlayItem.style.transform = 'translateX(0)'
      }

      setTimeout(() => {
        el.style.display = 'none'
        this.currentIndex++
        this.updateCarouselPositions()
        this.updateProgress()
      }, 400)
    }, 300)
  },

  updateProgress() {
    const checked = this.checkedItems.size
    const pct = (checked / this.totalItems) * 100

    document.getElementById('progressText').textContent = `${checked}/${this.totalItems} 已完成`
    document.getElementById('progressBar').style.width = pct + '%'

    if (checked === this.totalItems) {
      const btn = document.getElementById('activateBtn')
      btn.classList.add('enabled')
      btn.disabled = false
      btn.textContent = '允许作业'

      document.getElementById('layer2StatusBar').textContent = '条件满足，可转入开工状态'
      document.getElementById('layer2StatusBar').className = 'status-bar ready'

      const carousel = document.getElementById('checklist')
      const doneMsg = document.createElement('div')
      doneMsg.className = 'checklist-all-done'
      doneMsg.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>全部检查项已完成</span>'
      carousel.appendChild(doneMsg)

      const timelineStatusBar = document.getElementById('timelineStatusBar')
      if (timelineStatusBar) timelineStatusBar.textContent = '开工前检查已完成，进入闭环待命'
    }
  },

  activate() {
    if (this.checkedItems.size < this.totalItems) return

    const btn = document.getElementById('activateBtn')
    btn.textContent = '已批准动火'
    btn.style.background = 'linear-gradient(135deg, #059669, #047857)'
    btn.style.animation = 'none'
    btn.disabled = true

    const bar = document.getElementById('layer2StatusBar')
    bar.textContent = '动火作业已批准 — 系统进入实时监控模式'
    bar.style.background = 'linear-gradient(135deg, #d1fae5, #a7f3d0)'
    bar.style.borderColor = '#34d399'

    this._switchToVideo()
  },

  _switchToVideo() {
    const container = document.querySelector('#tab-layer2 .monitor-container')
    const img = container.querySelector('img')
    if (!img) return

    const video = document.createElement('video')
    video.src = 'layer2-complete-video.mp4'
    video.autoplay = true
    video.playsInline = true
    video.style.minHeight = '420px'
    video.addEventListener('ended', () => {
      video.pause()
    })

    container.replaceChild(video, img)
  },

  _switchToImage() {
    const container = document.querySelector('#tab-layer2 .monitor-container')
    const video = container.querySelector('video')
    if (!video) return

    const img = document.createElement('img')
    img.src = 'images/layer2-complete.png'
    img.alt = '处理完毕监控画面'
    img.style.minHeight = '420px'

    container.replaceChild(img, video)
  },

  reset() {
    this.stopAuto()
    this._switchToImage()
    this.currentIndex = 0
    this.checkedItems.clear()

    const doneMsg = document.querySelector('.checklist-all-done')
    if (doneMsg) doneMsg.remove()

    document.querySelectorAll('#checklist .checklist-item').forEach(el => {
      el.classList.remove('checked')
      el.style.display = ''
      el.style.opacity = ''
      el.style.transform = ''
      el.style.zIndex = ''
      el.style.pointerEvents = ''
    })

    document.querySelectorAll('.check-overlay-item').forEach(el => {
      el.style.opacity = '0'
    })

    document.getElementById('progressBar').style.width = '0%'
    document.getElementById('progressText').textContent = '0/5 已完成'

    const btn = document.getElementById('activateBtn')
    btn.className = 'btn-activate start'
    btn.textContent = '开始检测'
    btn.disabled = false
    btn.style = ''

    document.getElementById('layer2StatusBar').textContent = '等待安全检查完成...'
    document.getElementById('layer2StatusBar').className = 'status-bar safe'
    document.getElementById('layer2StatusBar').style = ''

    this.updateCarouselPositions()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Layer2Process.init()
})
