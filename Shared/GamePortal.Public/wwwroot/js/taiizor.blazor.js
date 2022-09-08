function Reload() {
	window.location.reload();
}

function GoLocation(uriLocation = '/') {
    location.href = uriLocation;
    //window.location.href = uriLocation;
}

function ReloadElement(elementId, methodType) {
    if (methodType === true) {
        var container = document.getElementById(elementId);
        var content = container.innerHTML;
        container.innerHTML = content;
    }
    else {
        document.getElementById(elementId).innerHTML = document.getElementById(elementId).innerHTML;
    }
}

function IncludeFont(path, rel) {
    var customFont = document.createElement('link');
    customFont.setAttribute('href', path);
    customFont.setAttribute('rel', rel);
    document.head.appendChild(customFont);
}

function IncludeJs(path) {
	var customScript = document.createElement('script');
    customScript.setAttribute('src', path);
    document.body.appendChild(customScript);
}

function IncludeCss(path, rel, type) {
    var customStylesheet = document.createElement('link');
    customStylesheet.setAttribute('href', path);
    customStylesheet.setAttribute('rel', rel);
    customStylesheet.setAttribute('type', type);
    document.head.appendChild(customStylesheet);
}

function SetClass(classId, className) {
	document.getElementById(classId).className = className;
}

function AddClass(classId, className) {
	document.getElementById(classId).classList.add(className);
}

function ToggleClass(classId, className) {
	document.getElementById(classId).classList.toggle(className);
}

function RemoveClass(classId, className) {

	document.getElementById(classId).classList.remove(className);
}

function SetStyle(styleId, stylePair) {
    document.getElementById(styleId).style = stylePair;
}

function AddStyle(styleId, styleName, styleValue) {
    document.getElementById(styleId).style.setProperty(styleName, styleValue);
}

var styles = [];

function ToggleStyle(styleId) {
    var style = document.getElementById(styleId).style.cssText;

    if (style != '') {
        styles[styleId] = document.getElementById(styleId).style.cssText;
        document.getElementById(styleId).style.cssText = null;
        console.log("1");
    }
    else if (styles[styleId] != null) {
        document.getElementById(styleId).style.cssText = styles[styleId];
        styles[styleId] = null;
        console.log("1");
    }
}

function RemoveStyle(styleId, styleName) {
    document.getElementById(styleId).style.removeProperty(styleName);
}

function InvokeMethodAsync(assemblyName, methodName, arguments) {
    if (arguments != null && arguments.length > 0) {
        return DotNet.invokeMethodAsync(assemblyName, methodName, arguments);
    }
    else {

        return DotNet.invokeMethodAsync(assemblyName, methodName);
    }
}

function InvokeReferenceMethodAsync(objectReference, assemblyName, methodName, arguments) {
    if (arguments != null && arguments.length > 0) {
        objectReference.invokeMethodAsync(assemblyName, methodName, arguments);
    }
    else {

        objectReference.invokeMethodAsync(assemblyName, methodName);
    }
    
    //objectReference.dispose();
}