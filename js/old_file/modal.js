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