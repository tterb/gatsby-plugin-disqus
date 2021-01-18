import React from 'react';


export function insertScript(src, id, parent) {
    const script = window.document.createElement('script');
    script.async = true;
    script.src = src;
    script.id = id;
    parent.appendChild(script);
    return script;
}

export function removeScript(id, parent) {
    const script = window.document.getElementById(id);
    if(script) {
        parent.removeChild(script);
    }
}

export function debounce(func, wait, runOnFirstCall) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const deferredExecution = function () {
            timeout = null;
            if(!runOnFirstCall) {
                func.apply(context, args);
            }
        }
        const callNow = runOnFirstCall && !timeout;
        window.clearTimeout(timeout);
        timeout = setTimeout(deferredExecution, wait);
        if(callNow) {
            func.apply(context, args);
        }
    }
}

export function isReactElement(element) {
    if (React.isValidElement(element)) {
        return true;
    } else if (Array.isArray(element)) {
        return element.some((value) => React.isValidElement(value));
    }
    return false;
}

export function shallowComparison(currentProps, nextProps) {
    // Perform a comparison of all props, excluding React Elements, to prevent
    // unnecessary updates
    const propNames = new Set(Object.keys(currentProps).concat(Object.keys(nextProps)));
    const changes = [].concat(...propNames).filter((name) => {
        if (typeof currentProps[name] === 'object') {
            if (shallowComparison(currentProps[name], nextProps[name])) {
                return true;
            }
        } else if (currentProps[name] !== nextProps[name] && !isReactElement(currentProps[name])) {
            return true;
        }
    })
    return changes.length !== 0;
}
