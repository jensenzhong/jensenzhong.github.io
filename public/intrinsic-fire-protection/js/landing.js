const revealTargets = [
  ...document.querySelectorAll('.section-heading, .evidence-panel, .mode-card, .layer-card, .roadmap-showcase, .tech-grid article, .material-card, .cta-inner'),
]

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.18 }
  )

  revealTargets.forEach(target => {
    target.classList.add('reveal')
    observer.observe(target)
  })
} else {
  revealTargets.forEach(target => target.classList.add('is-visible'))
}

document.querySelectorAll('video').forEach(video => {
  video.addEventListener('error', () => {
    video.style.display = 'none'
  })
})

const lightbox = document.querySelector('.lightbox')
const lightboxContent = document.querySelector('.lightbox-content')
const lightboxClose = document.querySelector('.lightbox-close')

function closeLightbox() {
  if (!lightbox || !lightboxContent) return

  lightbox.classList.remove('is-open')
  lightbox.setAttribute('aria-hidden', 'true')
  lightboxContent.innerHTML = ''
  document.body.style.overflow = ''
}

document.querySelectorAll('.material-preview').forEach(preview => {
  const openPreview = () => {
    if (!lightbox || !lightboxContent) return

    const src = preview.getAttribute('data-lightbox-src')
    const type = preview.getAttribute('data-lightbox-type')
    if (!src || !type) return

    lightboxContent.innerHTML = ''

    if (type === 'pdf') {
      const frame = document.createElement('iframe')
      frame.src = `${src}#toolbar=1&navpanes=0`
      frame.title = '汇报海报放大预览'
      lightboxContent.appendChild(frame)
    } else {
      const image = document.createElement('img')
      image.src = src
      image.alt = '放大预览'
      lightboxContent.appendChild(image)
    }

    lightbox.classList.add('is-open')
    lightbox.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
  }

  preview.addEventListener('click', openPreview)

  preview.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openPreview()
    }
  })
})

lightboxClose?.addEventListener('click', closeLightbox)

lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) {
    closeLightbox()
  }
})

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeLightbox()
  }
})
