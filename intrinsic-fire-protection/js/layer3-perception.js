const Layer3Perception = {
  timelineRunning: false,
  currentStep: -1,
  sensorInterval: null,
  countdownInterval: null,
  _timelineTimeout: null,
  disasterActive: false,
  _lstmAnimInterval: null,

  init() {
    this.startSensorSimulation()
  },

  startSensorSimulation() {
    if (this.sensorInterval) clearInterval(this.sensorInterval)

    let tick = 0
    this.sensorInterval = setInterval(() => {
      tick++

      const baseTemp = 42 + Math.sin(tick * 0.1) * 2
      const temp = baseTemp.toFixed(1)
      const smoke = (0.02 + Math.sin(tick * 0.05) * 0.01).toFixed(3)

      let lstmPct = 0

      document.getElementById('sensorTempValue').textContent = `当前: ${temp}°C`
      document.getElementById('sensorVfdsValue').textContent = `多光谱分析: ${lstmPct > 50 ? '异常' : '正常'}`
      document.getElementById('sensorAsdValue').textContent = `激光散射: ${smoke}%/m`

      document.getElementById('overlayTempVal').textContent = `TEMP: ${temp}°C`
      document.getElementById('overlaySmokeVal').textContent = `SMOKE: ${smoke}%/m`
      document.getElementById('overlayThermalVal').textContent = `THERMAL: ${lstmPct > 70 ? 'ALERT' : 'Normal'}`

      const lstmBar = document.getElementById('lstmBar')
      const lstmValueEl = document.getElementById('lstmValue')
      lstmBar.style.width = lstmPct + '%'
      lstmValueEl.textContent = lstmPct + '%'

      this.updateWarningLevels(parseInt(lstmPct))
    }, 1000)
  },

  updateWarningLevels(lstmPct) {
    const statusEl = document.getElementById('layer3Status')
    const lstmBar = document.getElementById('lstmBar')

    const w1 = document.getElementById('warningLevel1')
    const w2 = document.getElementById('warningLevel2')
    const w3 = document.getElementById('warningLevel3')

    document.getElementById('warningLstm1').textContent = '--'
    document.getElementById('warningLstm2').textContent = '--'
    document.getElementById('warningLstm3').textContent = '--'
    w1.style.borderLeft = 'none'
    w2.style.borderLeft = 'none'
    w3.style.borderLeft = 'none'

    const allSensorIds = '#sensorTempStatus, #sensorVfdsStatus, #sensorAsdStatus, #overlayTempLight, #overlaySmokeLight, #overlayThermalLight'

    if (lstmPct > 30 && lstmPct <= 70) {
      document.getElementById('warningLstm1').textContent = lstmPct + '%'
      w1.style.borderLeft = '3px solid #fb923c'
      statusEl.textContent = '预警'
      statusEl.className = 'px-2 py-1 bg-orange-500/20 border border-orange-500/50 rounded text-orange-500 text-xs font-medium'

      document.querySelectorAll(allSensorIds).forEach(el => {
        el.className = 'sensor-indicator warning'
      })
      lstmBar.style.background = '#f59e0b'
      document.getElementById('lstmValue').className = 'text-sm font-bold font-mono text-yellow-400'

    } else if (lstmPct > 70 && lstmPct <= 90) {
      document.getElementById('warningLstm1').textContent = '已触发'
      document.getElementById('warningLstm2').textContent = lstmPct + '%'
      w2.style.borderLeft = '3px solid #eab308'
      statusEl.textContent = '警告'
      statusEl.className = 'px-2 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded text-yellow-500 text-xs font-medium animate-pulse'

      document.querySelectorAll(allSensorIds).forEach(el => {
        el.className = 'sensor-indicator warning'
      })
      lstmBar.style.background = '#eab308'
      document.getElementById('lstmValue').className = 'text-sm font-bold font-mono text-yellow-300'

    } else if (lstmPct > 90) {
      document.getElementById('warningLstm1').textContent = '已触发'
      document.getElementById('warningLstm2').textContent = '已触发'
      document.getElementById('warningLstm3').textContent = lstmPct + '%'
      w3.style.borderLeft = '3px solid #ef4444'
      statusEl.textContent = '紧急'
      statusEl.className = 'px-2 py-1 bg-red-500/20 border border-red-500/50 rounded text-red-400 text-xs font-medium animate-pulse'

      document.querySelectorAll(allSensorIds).forEach(el => {
        el.className = 'sensor-indicator danger'
      })
      lstmBar.style.background = '#ef4444'
      document.getElementById('lstmValue').className = 'text-sm font-bold font-mono text-red-400'

    } else {
      statusEl.textContent = '正常'
      statusEl.className = 'px-2 py-1 bg-green-500/20 border border-green-500/50 rounded text-green-600 text-xs font-medium'

      document.querySelectorAll(allSensorIds).forEach(el => {
        el.className = 'sensor-indicator normal'
      })
      lstmBar.style.background = '#10b981'
      document.getElementById('lstmValue').className = 'text-sm font-bold font-mono text-green-400'
    }
  },

  // ==================== Disaster Simulation ====================

  triggerDisaster() {
    if (this.disasterActive) return
    this.disasterActive = true

    // Show sensor overlays
    document.getElementById('sensorOverlay').style.display = 'block'
    document.getElementById('lstmOverlay').style.display = 'block'

    // Stop normal sensor simulation
    if (this.sensorInterval) clearInterval(this.sensorInterval)

    // Switch image to hazard
    document.getElementById('layer3Image').src = 'images/layer3-hazard.png'

    // Update status
    const statusEl = document.getElementById('layer3Status')
    statusEl.textContent = '检测中...'
    statusEl.className = 'px-2 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded text-yellow-500 text-xs font-medium animate-pulse'

    // Disable disaster button
    const btn = document.getElementById('startDisasterBtn')
    btn.disabled = true
    btn.innerHTML = '<svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>检测中...'

    // Animate LSTM from 0 to 86%
    let currentLstm = 0
    const targetLstm = 86
    const intervalMs = 35

    this._lstmAnimInterval = setInterval(() => {
      currentLstm += 1
      if (currentLstm >= targetLstm) {
        currentLstm = targetLstm
        clearInterval(this._lstmAnimInterval)
        this._onLstmAnimComplete()
      }

      this._updateDisasterDisplay(currentLstm)
    }, intervalMs)
  },

  _updateDisasterDisplay(pct) {
    // LSTM bar
    const lstmBar = document.getElementById('lstmBar')
    const lstmValueEl = document.getElementById('lstmValue')
    lstmBar.style.width = pct + '%'
    lstmValueEl.textContent = pct + '%'

    this.updateWarningLevels(pct)

    // Sensor values scale with LSTM
    const temp = (42 + pct * 0.5).toFixed(1)
    const smoke = (0.02 + pct * 0.015).toFixed(3)

    document.getElementById('sensorTempValue').textContent = `当前: ${temp}°C`
    document.getElementById('sensorVfdsValue').textContent = `多光谱分析: ${pct > 50 ? '异常' : '正常'}`
    document.getElementById('sensorAsdValue').textContent = `激光散射: ${smoke}%/m`

    document.getElementById('overlayTempVal').textContent = `TEMP: ${temp}°C`
    document.getElementById('overlaySmokeVal').textContent = `SMOKE: ${smoke}%/m`
    document.getElementById('overlayThermalVal').textContent = pct > 70 ? 'THERMAL: ALERT' : 'THERMAL: Normal'

    // Sensor indicators
    const allSensorIds = '#sensorTempStatus, #sensorVfdsStatus, #sensorAsdStatus, #overlayTempLight, #overlaySmokeLight, #overlayThermalLight'
    if (pct > 70) {
      document.querySelectorAll(allSensorIds).forEach(el => el.className = 'sensor-indicator danger')
    } else if (pct > 30) {
      document.querySelectorAll(allSensorIds).forEach(el => el.className = 'sensor-indicator warning')
    }
  },

  _onLstmAnimComplete() {
    // Show thermal imaging button
    document.getElementById('thermalBtn').style.display = 'flex'

    // Update disaster button
    const btn = document.getElementById('startDisasterBtn')
    btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>检测完成'
  },

  showThermalImage() {
    document.getElementById('layer3Image').src = 'images/layer3-thermal.png'
    document.getElementById('thermalBtn').style.display = 'none'
    document.getElementById('thermalCloseBtn').style.display = 'flex'
  },

  resolveDisaster() {
    document.getElementById('thermalCloseBtn').style.display = 'none'
    this._showDispatchModal()
  },

  _showDispatchModal() {
    const modal = document.getElementById('dispatchModal')
    modal.classList.add('active')

    // Reset staff cards
    document.getElementById('dispatchStaff1').style.opacity = '0.3'
    document.getElementById('dispatchStatus1').innerHTML = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>等待联系'
    document.getElementById('dispatchStatus1').className = 'flex items-center gap-1.5 text-xs text-slate-400'
    document.getElementById('dispatchStaff2').style.opacity = '0.3'
    document.getElementById('dispatchStatus2').innerHTML = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>等待联系'
    document.getElementById('dispatchStatus2').className = 'flex items-center gap-1.5 text-xs text-slate-400'
    const closeBtn = document.getElementById('dispatchCloseBtn')
    closeBtn.style.opacity = '0.3'
    closeBtn.style.pointerEvents = 'none'

    // Animate: contact 周工 after 1.5s
    setTimeout(() => {
      document.getElementById('dispatchStaff1').style.opacity = '1'
      document.getElementById('dispatchStatus1').innerHTML = '<svg class="w-3.5 h-3.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>拨打中...'
      document.getElementById('dispatchStatus1').className = 'flex items-center gap-1.5 text-xs text-blue-500'
    }, 1500)

    // 周工 connected after 3s
    setTimeout(() => {
      document.getElementById('dispatchStatus1').innerHTML = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>已联系，正在赶往'
      document.getElementById('dispatchStatus1').className = 'flex items-center gap-1.5 text-xs text-green-600 font-medium'
      document.getElementById('dispatchStaff1').style.borderColor = '#34d399'
      document.getElementById('dispatchStaff1').style.background = '#ecfdf5'
    }, 3000)

    // Contact 李工 after 3.5s
    setTimeout(() => {
      document.getElementById('dispatchStaff2').style.opacity = '1'
      document.getElementById('dispatchStatus2').innerHTML = '<svg class="w-3.5 h-3.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>拨打中...'
      document.getElementById('dispatchStatus2').className = 'flex items-center gap-1.5 text-xs text-blue-500'
    }, 3500)

    // 李工 connected after 5s, enable close button
    setTimeout(() => {
      document.getElementById('dispatchStatus2').innerHTML = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>已联系，正在赶往'
      document.getElementById('dispatchStatus2').className = 'flex items-center gap-1.5 text-xs text-green-600 font-medium'
      document.getElementById('dispatchStaff2').style.borderColor = '#34d399'
      document.getElementById('dispatchStaff2').style.background = '#ecfdf5'
      closeBtn.style.opacity = '1'
      closeBtn.style.pointerEvents = 'auto'
    }, 5000)
  },

  closeDispatchModal() {
    document.getElementById('dispatchModal').classList.remove('active')

    // Switch to resolution image
    document.getElementById('layer3Image').src = 'images/layer4-resolved.png'

    // Restore all sensor values to normal
    this._restoreNormalValues()

    // Show handled modal after delay
    setTimeout(() => {
      document.getElementById('disasterHandledModal').classList.add('active')
    }, 1000)
  },

  _restoreNormalValues() {
    // Hide sensor overlays
    document.getElementById('sensorOverlay').style.display = 'none'
    document.getElementById('lstmOverlay').style.display = 'none'

    // LSTM back to 0
    document.getElementById('lstmBar').style.width = '0%'
    document.getElementById('lstmBar').style.background = '#10b981'
    document.getElementById('lstmValue').textContent = '0%'
    document.getElementById('lstmValue').className = 'text-sm font-bold font-mono text-green-400'

    // Status back to normal
    const statusEl = document.getElementById('layer3Status')
    statusEl.textContent = '正常'
    statusEl.className = 'px-2 py-1 bg-green-500/20 border border-green-500/50 rounded text-green-600 text-xs font-medium'

    // Sensor values to normal
    document.getElementById('sensorTempValue').textContent = '当前: 42.3°C'
    document.getElementById('sensorVfdsValue').textContent = '多光谱分析: 正常'
    document.getElementById('sensorAsdValue').textContent = '激光散射: 0.02%/m'

    document.getElementById('overlayTempVal').textContent = 'TEMP: 42.3°C'
    document.getElementById('overlaySmokeVal').textContent = 'SMOKE: 0.02%/m'
    document.getElementById('overlayThermalVal').textContent = 'THERMAL: Normal'

    // Sensor indicators to normal
    document.querySelectorAll('#sensorTempStatus, #sensorVfdsStatus, #sensorAsdStatus, #overlayTempLight, #overlaySmokeLight, #overlayThermalLight').forEach(el => {
      el.className = 'sensor-indicator normal'
    })

    // Warning levels to normal
    document.getElementById('warningLstm1').textContent = '--'
    document.getElementById('warningLstm2').textContent = '--'
    document.getElementById('warningLstm3').textContent = '--'
    document.getElementById('warningLevel1').style.borderLeft = 'none'
    document.getElementById('warningLevel2').style.borderLeft = 'none'
    document.getElementById('warningLevel3').style.borderLeft = 'none'
  },

  closeDisasterHandledModal() {
    document.getElementById('disasterHandledModal').classList.remove('active')
  },

  resetDisaster() {
    this.disasterActive = false
    if (this._lstmAnimInterval) clearInterval(this._lstmAnimInterval)

    // Hide sensor overlays
    document.getElementById('sensorOverlay').style.display = 'none'
    document.getElementById('lstmOverlay').style.display = 'none'

    // Reset image
    document.getElementById('layer3Image').src = 'images/fire-zone-plan.png'

    // Reset LSTM
    document.getElementById('lstmBar').style.width = '0%'
    document.getElementById('lstmValue').textContent = '0%'
    document.getElementById('lstmValue').className = 'text-sm font-bold font-mono text-green-400'
    document.getElementById('lstmBar').style.background = '#10b981'

    // Hide overlays
    document.getElementById('thermalBtn').style.display = 'none'
    document.getElementById('thermalCloseBtn').style.display = 'none'

    // Reset status
    const statusEl = document.getElementById('layer3Status')
    statusEl.textContent = '正常'
    statusEl.className = 'px-2 py-1 bg-green-500/20 border border-green-500/50 rounded text-green-600 text-xs font-medium'

    // Reset button
    const btn = document.getElementById('startDisasterBtn')
    btn.disabled = false
    btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>灾情发生'

    // Reset warning levels
    document.getElementById('warningLstm1').textContent = '--'
    document.getElementById('warningLstm2').textContent = '--'
    document.getElementById('warningLstm3').textContent = '--'
    document.getElementById('warningLevel1').style.borderLeft = 'none'
    document.getElementById('warningLevel2').style.borderLeft = 'none'
    document.getElementById('warningLevel3').style.borderLeft = 'none'

    // Reset sensor indicators
    const allSensorIds = '#sensorTempStatus, #sensorVfdsStatus, #sensorAsdStatus, #overlayTempLight, #overlaySmokeLight, #overlayThermalLight'
    document.querySelectorAll(allSensorIds).forEach(el => el.className = 'sensor-indicator normal')

    // Close modals
    document.getElementById('disasterHandledModal').classList.remove('active')
    document.getElementById('dispatchModal').classList.remove('active')

    // Restart normal sensor simulation
    if (this.sensorInterval) clearInterval(this.sensorInterval)
    this.startSensorSimulation()
  },

  // ==================== Timeline ====================

  startTimeline() {
    if (this.timelineRunning) return
    this.timelineRunning = true
    this.currentStep = 0

    const btn = document.getElementById('startTimelineBtn')
    btn.disabled = true
    btn.textContent = '流程执行中...'

    const bar = document.getElementById('timelineStatusBar')
    if (bar) {
      bar.textContent = '闭环流程执行中...'
      bar.className = 'status-bar ready flex-1'
    }

    this.advanceTimeline()
  },

  advanceTimeline() {
    if (this.currentStep > 5) {
      this.timelineRunning = false
      document.getElementById('startTimelineBtn').textContent = '闭环完成'
      const bar = document.getElementById('timelineStatusBar')
      if (bar) {
        bar.textContent = '动火结束闭环已完成'
        bar.className = 'status-bar ready flex-1'
      }
      return
    }

    const nodes = document.querySelectorAll('.timeline-node')
    const fill = document.getElementById('timelineFill')
    const bar = document.getElementById('timelineStatusBar')
    const stepLabels = ['作业结束确认', '余火检查', '高温复检', '30min后复检', '二次巡查', '复查照片上传']

    if (this.currentStep > 0) {
      nodes[this.currentStep - 1].classList.remove('active')
      nodes[this.currentStep - 1].classList.add('completed')
    }

    nodes[this.currentStep].classList.add('active')
    fill.style.width = ((this.currentStep + 1) / 6 * 100) + '%'
    if (bar) bar.textContent = `正在执行：${stepLabels[this.currentStep]}`

    if (this.currentStep === 3) {
      this.startCountdown()
      return
    }

    this.currentStep++
    this._timelineTimeout = setTimeout(() => this.advanceTimeline(), 2000)
  },

  startCountdown() {
    const container = document.getElementById('countdownContainer')
    const textEl = document.getElementById('countdownText')
    const ringEl = document.getElementById('countdownRing')

    container.classList.remove('hidden')

    let minutesLeft = 30
    const totalMinutes = 30
    const tickInterval = 333

    const formatTime = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`

    textEl.textContent = formatTime(minutesLeft)
    ringEl.style.strokeDashoffset = '0'

    this.countdownInterval = setInterval(() => {
      minutesLeft--
      if (minutesLeft <= 0) {
        clearInterval(this.countdownInterval)
        textEl.textContent = '00:00'
        ringEl.style.strokeDashoffset = '283'
        this.currentStep++
        this._timelineTimeout = setTimeout(() => this.advanceTimeline(), 500)
        return
      }

      textEl.textContent = formatTime(minutesLeft)
      const offset = ((totalMinutes - minutesLeft) / totalMinutes) * 283
      ringEl.style.strokeDashoffset = offset
    }, tickInterval)
  },

  resetTimeline() {
    this.timelineRunning = false
    this.currentStep = -1

    if (this.countdownInterval) clearInterval(this.countdownInterval)
    if (this._timelineTimeout) clearTimeout(this._timelineTimeout)

    const nodes = document.querySelectorAll('.timeline-node')
    nodes.forEach(n => {
      n.classList.remove('active', 'completed')
    })
    document.getElementById('timelineFill').style.width = '0%'
    document.getElementById('countdownContainer').classList.add('hidden')

    const btn = document.getElementById('startTimelineBtn')
    btn.disabled = false
    btn.textContent = '启动闭环演示'

    const bar = document.getElementById('timelineStatusBar')
    if (bar) {
      bar.textContent = '等待闭环演示启动...'
      bar.className = 'status-bar safe flex-1'
    }

    if (this.sensorInterval) clearInterval(this.sensorInterval)
    this.startSensorSimulation()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Layer3Perception.init()
})
