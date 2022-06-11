
let results;

let counter = 0;

document.addEventListener('DOMContentLoaded', () => {

	// Establecer operación por defecto en localStorage

	localStorage.setItem('operation', 'nether');
	console.trace(localStorage.getItem('operation'));

	// Inicializar validador de campos
	addInputListeners();

	// Comprobar si ya hay coordendas almacenadas en el localStorage

	if (localStorage.getItem('coordinates_record') == null) results = [];

	if (localStorage.getItem('coordinates_record') != null) {

		results = JSON.parse(localStorage.getItem('coordinates_record'));

		showRecords();

	}


	initTabs();

	// EventListeners

	$('calculate').addEventListener('click', () => {

		validateForm();

	});

});

const $ = (id) => {
	return document.getElementById(id);
}

function addInputListeners() {

	setInputFilter($('coord_x'), (value) => {
		return /^-?\d*[.,]?\d*$/.test(value);
	});

	setInputFilter($('coord_z'), (value) => {
		return /^-?\d*[.,]?\d*$/.test(value);
	});

}

function validateForm() {

	let fieldCoordX;
	let fieldCoordZ;

	fieldCoordX = $('coord_x');
	fieldCoordZ = $('coord_z');

	// validaciones

	if (fieldCoordX.value == "" &&
		fieldCoordZ.value == "") {

		createModal("Campos vacios", true);
		return;

	}

	if (fieldCoordX.value == "") {

		createModal("El campo de coordenada x está vació.", true);
		fieldCoordX.focus();
		return;

	}

	if (fieldCoordZ.value == "") {

		createModal("El campo de coordenada z está vació.", true);
		fieldCoordZ.focus();
		return;

	}

	fieldCoordX = fieldCoordX.value;
	fieldCoordZ = fieldCoordZ.value;

	calculateNewCoords(fieldCoordX, fieldCoordZ);

}

function calculateNewCoords(coordinateX, coordinateZ) {

	let operation;

	operation = localStorage.getItem('operation');

	switch (operation) {

		case "nether":

			coordinateX = coordinateX / 8;
			coordinateZ = coordinateZ / 8;
			break;

		case "overworld":

			coordinateX = coordinateX * 8;
			coordinateZ = coordinateZ * 8;
			break;

	}

	createModal(`X: ${coordinateX} - Z: ${coordinateZ}`, false);

	let resultObject;

	resultObject = {
		id: ++counter,
		coordX: coordinateX,
		coordZ: coordinateZ,
		method: operation
	}

	results.push(resultObject);

	localStorage.setItem('coordinates_record', JSON.stringify(results));

	console.trace(`Data available ${JSON.stringify(results)}`);

	showRecords();

}

function showRecords() {

	let container;
	let request;
	let component;

	let close_icon;
	let coordinateX;
	let coordinateZ;
	let method;

	request = new XMLHttpRequest();

	container = $('history-wrapper');

	container.innerHTML = ``;

	// console.log(results);

	request.open('GET', '../templates/record.html');

	request.send();

	request.addEventListener('loadend', () => {

		if (results == null) return;

		for (let result of results) {

			component = document.createElement('article');

			component.classList.add('record');
			component.innerHTML = request.responseText;

			container.appendChild(component);

		}

		coordinateX = document.querySelectorAll('.record-x');
		coordinateZ = document.querySelectorAll('.record-z');
		method = document.querySelectorAll('.record-method');
		close_icon = document.querySelectorAll('.record-close');

		for (let i = 0; i < coordinateX.length; i++) {

			coordinateX[i].innerText = `${coordinateX[i].innerText} ${results[i].coordX}`;
			coordinateZ[i].innerText = `${coordinateZ[i].innerText} ${results[i].coordZ}`;
			method[i].innerText = `${method[i].innerText} ${results[i].method}`;

			// close_icon[i].id = i;

			close_icon[i].addEventListener('click', (e) => {

				closeRecord(i, e.target);

			});


		}

	});

}

function cleanStorage() {

	localStorage.removeItem('coordinates_record');

	results = [];

	let records_wrapper = $('history-wrapper');

	let recordsRef;

	recordsRef = records_wrapper.childNodes;

	console.trace(recordsRef);

	for (let i = 0; i < recordsRef.length; i++) {

		recordsRef[i].classList.add('record-closing');

		recordsRef[i].addEventListener('animationend', () =>{ 

			records_wrapper.innerHTML = ``;

		});

	}

}

function closeRecord(index, target) {

	// Añadir animación al contenedor
	console.trace(target.parentNode);

	target = target.parentNode;

	target.classList.add('record-closing');

	target.addEventListener('animationend', () => {

		$('history-wrapper').removeChild(target);

	});

	index = results.findIndex(results => results.id === index + 1);

	console.trace('finded index ' + index);

	results.splice(index, 1);

	// Actualizar localstorage

	localStorage.setItem('coordinates_record', JSON.stringify(results));

	// Actualizar UI una vez la animación de cierra ha terminado

}

function createModal(message, isError) {

	let request;

	let modalContainerRef;
	let modalType;
	let modalTemplate;
	let modalTextRef;

	modalType = isError ? "error" : "result";

	modalContainerRef = $('modal-container');

	request = new XMLHttpRequest();

	request.addEventListener('loadend', () => {

		modalTemplate = request.responseText;

		modalContainerRef.innerHTML = modalTemplate;

		modalTextRef = $('modal-text');

		modalTextRef.innerText = message;
	});



	request.open('GET', `../templates/${modalType}.html`);

	request.send();

	// modalTextRef = 


}

function closeModal(isError) {

	let modalType;

	modalType = isError ? "error" : "result";

	let modal = $(modalType);

	modal.style.animation = `close-modal 0.5s linear`;

	// Animation close modal - archivo styles.css

	modal.addEventListener('animationend', () => {

		let wrapper = $('modal-container');

		wrapper.innerHTML = '';

	});

}


function GetForm(form) {

	let request;

	request = new XMLHttpRequest();

	request.addEventListener('loadend', () => {

		let wrapper = $('form-wrapper');

		wrapper.classList.add('show');

		wrapper.innerHTML = request.responseText;

	});

	request.open('GET', `../templates/${form}.html`, true);

	request.send();

	addInputListeners();

}

function changeTab(event) {

	event.stopPropagation();

	let tabs = document.getElementsByClassName('Tab');

	for (let i = 0; i < tabs.length; i++) {

		tabs[i].setAttribute('data-active', '');
		tabs[i].id = `${i}`;

	}

	let componentRef;

	componentRef = event.target;

	componentRef.setAttribute('data-active', 'true');

	if (componentRef.id == 0) {

		localStorage.setItem('operation', 'nether');
		GetForm('nether');

	}

	if (componentRef.id == 1) {

		localStorage.setItem('operation', 'overworld');
		GetForm('overworld');

	}

}

function initTabs() {

	let tabs;

	tabs = document.getElementsByClassName('Tab');

	for (let i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener('click', (event) => {
			changeTab(event);
		});
	}

}
