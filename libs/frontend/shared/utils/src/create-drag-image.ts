let dragImage: HTMLElement | undefined

export const createDragImage = (name: string) => {
  if (dragImage) {
    dragImage.innerText = name

    return dragImage
  }

  dragImage = document.createElement('div')
  dragImage.style.width = 'auto'
  dragImage.style.height = '40px'
  dragImage.style.position = 'fixed'
  dragImage.style.top = '-400px'
  dragImage.style.borderRadius = '5px'
  dragImage.style.backgroundColor = 'white'
  dragImage.style.textAlign = 'center'
  dragImage.style.display = 'flex'
  dragImage.style.justifyContent = 'center'
  dragImage.style.alignItems = 'center'
  dragImage.style.fontSize = '14px'
  dragImage.style.padding = '5px'
  dragImage.innerText = name
  document.body.appendChild(dragImage)

  return dragImage
}

let transparentDragImage: HTMLElement | undefined

export const createTransparentDragImage = () => {
  if (transparentDragImage) {
    return transparentDragImage
  }

  transparentDragImage = document.createElement('div')
  transparentDragImage.style.width = '1px'
  transparentDragImage.style.height = '1px'
  transparentDragImage.style.opacity = '0'
  document.body.appendChild(transparentDragImage)

  return transparentDragImage
}
