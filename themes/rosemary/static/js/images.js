class ScrollAnimations {

  constructor(el) {
    this.el = el || document.body
    this.elems = [...this.el.querySelectorAll('[data-scroll]')]
    this.cache = null
    this.options = null
    this.observer = null
    
    this.init()
  }
  
  createObserver() {
    this.options = {
      root: null,
      rootMargin: '0px 0px -25% 0px',
      threshold: [0, 0]
    }
    this.observer = new IntersectionObserver(this.handler.bind(this), this.options)
  }
  
  getCache() {
    this.cache = []
    this.elems.forEach((el, index) => {
      const bounding = el.getBoundingClientRect()
      this.cache.push({
        el: el,
        animation: el.dataset.scroll,
        isIntersected: false,
        elems: null,
        split: null,
        tl: null      
      })
    })
  }
  
  setAnimation(elem) {
    elem.tl = new TimelineLite({ paused: true })

    if (elem.animation === 'mask') {
      const inner = elem.el.querySelector('.image__inner')
      
      elem.tl
        .from(elem.el, 1, {
          xPercent: -100,
          ease: Expo.easeInOut
        }, 0)
        .from(inner, 1, {
          xPercent: 100,
          ease: Expo.easeInOut
        }, 0)
    } else {
      elem.tl
        .set(elem.el, {
          autpAlpha: 1
        })
        .from(elem.el, 1, {
          alpha: 0,
          ease: Power1.easeOut
        })
    }
    
    elem.tl.progress(1).progress(0)
  }
  
  handler(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let i = this.elems.indexOf(entry.target)
        let elem = this.cache[i]
        
        elem.isIntersected = true
        elem.tl.play()
        this.stillObserving() ? this.observer.unobserve(entry.target) : this.observer.disconnect()
      } else {
        return
      }
    })
  }
  
  stillObserving() {
    return this.cache.some(e => !e.isIntersected)
  }

  destroy() {
    this.observer.disconnect()
    this.observer = null
    this.elems = null
    this.cache = null
  }
  
  run() {
    this.cache.forEach(elem => {
      this.setAnimation(elem)
      this.observer.observe(elem.el)
    })
  }
  
  init() {
    this.getCache()
    this.createObserver()
    this.run()
  }
}

new ScrollAnimations()