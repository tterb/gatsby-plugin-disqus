export function insertScript(src, id, parent) {
    const script = window.document.createElement('script')
    script.async = true
    script.src = src
    script.id = id
    parent.appendChild(script)
    return script
}

export function removeScript(id, parent) {
    const script = window.document.getElementById(id)
    if(script) {
      parent.removeChild(script)
    }
}

export function debounce(func, wait, runOnFirstCall) {
  let timeout
  return function () {
    const context = this
    const args = arguments
    const deferredExecution = function () {
      timeout = null
      if(!runOnFirstCall) {
        func.apply(context, args)
      }
    }
    const callNow = runOnFirstCall && !timeout
    window.clearTimeout(timeout)
    timeout = setTimeout(deferredExecution, wait)
    if(callNow) {
      func.apply(context, args)
    }
  }
}
