document.addEventListener('DOMContentLoaded', () => {
  // ✨ 텍스트 타자 효과
  const animatedEls = document.querySelectorAll('.animated-text')

  animatedEls.forEach((el) => {
    const text = el.textContent
    el.textContent = ''
    let index = 0

    function typeChar() {
      if (index <= text.length) {
        el.textContent = text.slice(0, index)
        index++
        setTimeout(typeChar, 100) // ← 타자 속도 조절
      }
    }

    typeChar()
  })

  // ✨ 모든 fade/fancy 요소 감지 → 한 번의 observer로 처리
  const animEls = document.querySelectorAll('.fade-in, .fade-in-top, .fancy-in')

  const animObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains('visible')
        ) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.2,
    }
  )

  animEls.forEach((el) => {
    animObserver.observe(el)
  })

  // ✨ 스크롤 시 배경색 전환
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      document.body.classList.add('scrolled')
    } else {
      document.body.classList.remove('scrolled')
    }
  })

  // ✨ 부드럽게 움직이는 배경 오브젝트 생성
  const bgContainer = document.createElement('div')
  bgContainer.classList.add('floating-bg')
  document.body.appendChild(bgContainer)

  for (let i = 0; i < 10; i++) {
    const circle = document.createElement('div')
    circle.classList.add('floating-circle')
    const size = Math.random() * 60 + 20
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.left = `${Math.random() * 100}%`
    circle.style.animationDuration = `${15 + Math.random() * 10}s`
    bgContainer.appendChild(circle)
  }
})
