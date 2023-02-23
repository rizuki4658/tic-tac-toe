class Modal {
  idModal;
  idLayer;
  timer;

  constructor({
    title,
    img,
    description,
    btn_text
  }, callback) {
    this.title = title
    this.img = img
    this.description = description
    this.btn_text = btn_text
    this.callback = callback
  }

  handleContainer = () => {
    this.idLayer = `layer_1`
    const layer = document.createElement('div')
    layer.setAttribute('class', 'layer')
  
    const oldEl = document.getElementsByClassName('layer')
    const lastOldEl = oldEl.length ? oldEl[oldEl.length - 1] : undefined

    if (lastOldEl) {
      this.idLayer = `layer_${Number((lastOldEl.id).replace('layer_')) + 1}`
    }

    layer.setAttribute('id', this.idLayer)
    return layer
  }
  handleModal = () => {
    const el = document.createElement('div')
    el.setAttribute('class', 'modal')
    return el
  }
  handleHead = (title) => {
    const el = document.createElement('div')
    el.setAttribute('class', 'modal-title')
    el.innerHTML = title
    return el
  }
  handleBody = (img, description) => {
    const el = document.createElement('div')
    el.setAttribute('class', 'modal-body')

    const picture = new Image()
    picture.width = 100
    picture.height = 100
    picture.src = `./img/${img}`

    const elDesc = document.createElement('p')
    elDesc.innerText = description
    el.appendChild(picture)
    el.appendChild(elDesc)
    return el
  }
  handleRemove = () => {
    const body = document.body
    const layer = document.getElementById(this.idLayer)
    layer.classList.add('on-hide')
    this.timer = setTimeout(() => {
      body.removeChild(layer)
      if (this.callback) this.callback()
      clearTimeout(this.timer)
    }, 300)
  }
  handleFooter = (btn_text) => {
    const type = this.img.replace('.png', '')
    const el = document.createElement('div')
    el.setAttribute('class', 'modal-footer')

    const btn = document.createElement('button')
    btn.setAttribute('class', `modal-button modal-button--${type}`)
    btn.innerText = btn_text
    btn.addEventListener('click', () => {
      this.handleRemove()
    })

    el.appendChild(btn)
    return el
  }
  handleCreate = () => {
    const main = this.handleContainer()
    const modal = this.handleModal()
    const head = this.handleHead(this.title)
    const body = this.handleBody(this.img, this.description)
    const footer = this.handleFooter(this.btn_text)
    modal.appendChild(head)
    modal.appendChild(body)
    modal.appendChild(footer)
    main.appendChild(modal)
    return main
  }
}
export function createModal({
  title,
  img,
  description,
  btn_text
}, callback) {
  const newModal = new Modal({
    title,
    img,
    description,
    btn_text
  }, callback)
  const myModal = newModal.handleCreate()
  return myModal
}