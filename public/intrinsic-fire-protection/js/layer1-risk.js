const Layer1Risk = {
  demoRunning: false,
  _phase2Timeout: null,
  pendingConflictResult: null,
  conflictResultRendered: false,

  startDemo() {
    if (this.demoRunning) return
    this.demoRunning = true
    const btn = document.getElementById('startLayer1Btn')
    btn.disabled = true
    btn.innerHTML = '<svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>扫描中...'

    const statusEl = document.getElementById('layer1Status')
    statusEl.textContent = '扫描中...'
    statusEl.className = 'px-2 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded text-yellow-500 text-xs'

    // Switch to risk detection image after 2 seconds
    setTimeout(() => {
      if (!this.demoRunning) return
      this._switchToImage()
    }, 2000)

    // Scan animation runs via CSS scan-overlay, wait then show result
    this._phase2Timeout = setTimeout(() => {
      if (!this.demoRunning) return
      this.showConflictResult()
    }, 3000)
  },

  showConflictResult() {
    const statusEl = document.getElementById('layer1Status')
    statusEl.textContent = '严重冲突'
    statusEl.className = 'px-2 py-1 bg-red-500/20 border border-red-500/50 rounded text-red-400 text-xs animate-pulse'

    const btn = document.getElementById('startLayer1Btn')
    btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>扫描完成'

    // Light up red indicator
    document.getElementById('feedbackRed').classList.add('flashing')

    this.pendingConflictResult = `
      <div class="conflict-result-card">
        <div class="conflict-indicator level-red mb-3">
          <span class="conflict-light red"></span>
          <div>
            <div class="font-medium">严重冲突：动火审批已锁定</div>
            <div class="text-xs opacity-70 mt-0.5">动火作业区与可燃材料堆放区严重重叠</div>
          </div>
        </div>
        <div class="conflict-detail-grid">
          <div class="conflict-detail-block red">
            <div class="font-semibold text-red-800 mb-1">冲突原因分析</div>
            <ul>
              <li>实际间距仅 2.3m，低于安全要求 5m</li>
              <li>人员通行区与动火缓冲区存在空间交叉</li>
              <li>疏散通道一侧堆放可燃物</li>
            </ul>
          </div>
          <div class="conflict-detail-block amber">
            <div class="font-semibold text-amber-800 mb-1">系统处置措施</div>
            <ul>
              <li>自动锁定该区域动火审批</li>
              <li>通知现场管理人员到场处置</li>
              <li>要求调整布局并拍照确认</li>
            </ul>
          </div>
        </div>
      </div>
    `

    document.getElementById('conflictResults').innerHTML = '<p class="text-sm text-slate-400 text-center py-3">请关闭弹窗后查看冲突检测详情</p>'

    // Show conflict popup modal
    this.showConflictModal()
  },

  renderConflictResult() {
    const conflictResults = document.getElementById('conflictResults')
    if (this.pendingConflictResult) {
      conflictResults.innerHTML = this.pendingConflictResult
      this.conflictResultRendered = true
    }
  },

  showConflictModal() {
    document.getElementById('conflictModal').classList.add('active')
  },

  closeConflictModal() {
    document.getElementById('conflictModal').classList.remove('active')
    if (!this.conflictResultRendered) {
      this.renderConflictResult()
    }
    // After modal closes: red flashes, yellow/orange fade out
    document.getElementById('feedbackRed').classList.add('flashing')
    document.getElementById('feedbackYellow').style.opacity = '0.3'
    document.getElementById('feedbackOrange').style.opacity = '0.3'

    // Remove scan line effect
    document.querySelector('#tab-layer1 .monitor-container').classList.remove('scan-overlay')
  },

  reset() {
    this.demoRunning = false
    clearTimeout(this._phase2Timeout)

    const btn = document.getElementById('startLayer1Btn')
    btn.disabled = false
    btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>开始演示扫描'

    const statusEl = document.getElementById('layer1Status')
    statusEl.textContent = '就绪'
    statusEl.className = 'px-2 py-1 bg-green-500/20 border border-green-500/50 rounded text-green-400 text-xs'

    this.pendingConflictResult = null
    this.conflictResultRendered = false
    document.getElementById('conflictResults').innerHTML = '<p class="text-sm text-slate-400 text-center py-3">点击"开始演示扫描"启动检测</p>'

    // Reset conflict indicators to normal state
    document.getElementById('feedbackRed').classList.remove('flashing')
    document.getElementById('feedbackYellow').style.opacity = '1'
    document.getElementById('feedbackOrange').style.opacity = '1'

    // Restore scan overlay effect
    document.querySelector('#tab-layer1 .monitor-container').classList.add('scan-overlay')

    // Restore video
    this._switchToVideo()

    this.closeConflictModal()
  },

  _switchToImage() {
    const container = document.querySelector('#tab-layer1 .monitor-container')
    const video = container.querySelector('video')
    if (!video) return

    const img = document.createElement('img')
    img.id = 'layer1Image'
    img.src = 'images/layer1-risk.png'
    img.alt = '风险识别监控画面'
    img.style.minHeight = '400px'

    container.replaceChild(img, video)
  },

  _switchToVideo() {
    const container = document.querySelector('#tab-layer1 .monitor-container')
    const img = container.querySelector('img')
    if (!img) return

    const video = document.createElement('video')
    video.id = 'layer1Video'
    video.src = 'layer1-risk-video.mp4'
    video.autoplay = true
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.style.minHeight = '400px'

    container.replaceChild(video, img)
  }
}
