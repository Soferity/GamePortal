function Reload() {
	window.location.reload();
}

function GoLocation(uriLocation = "/") {
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