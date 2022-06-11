
let results;

let counter = 0;

document.addEventListener('DOMContentLoaded', () => {

	// Establecer operación por defecto en localStorage
	localStorage.setItem('operation', 'nether');

	// Inicializar validador de campos
	addInputListeners();

	// Comprobar si ya hay coordendas almacenadas en el localStorage
	if (localStorage.getItem('coordinates_record') == null) results = [];

	if (localStorage.getItem('coordinates_record') != null) {

		results = JSON.parse(localStorage.getItem('coordinates_record'));

		showRecords();

	}

	// Inicializar el comportamiento de las pestañas (formularios)
	initTabs();

	// EventListeners

	$('calculate').addEventListener('click', () => {

		validateForm();

	});

});

// Atajo al document.getElementById()
const $ = (id) => {
	return document.getElementById(id);
}

// Añadir evento(s) de validación a los campos
function addInputListeners() {

	setInputFilter($('coord_x'), (value) => {
		return /^-?\d*[.,]?\d*$/.test(value);
	});

	setInputFilter($('coord_z'), (value) => {
		return /^-?\d*[.,]?\d*$/.test(value);
	});

}

// Validar los formularios, y postiormente calcular 
// las nuevas coordenadas
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

// Recibe las coordenadas de los inputs, y hace el calculo
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

	// Almacenar el arreglo de coordenadas en el localstorage
	localStorage.setItem('coordinates_record', JSON.stringify(results));

	// Generar los componentes para representar las coordenadas
	// anteriormente calculadas
	showRecords();

	// Cerrar el modal de resultado después de 4seg
	setTimeout(() => {

		closeModal();

	}, 4000);

}

// Obtiene un template, obtiene el arreglo de objetos
// que contiene la coordenada(s), y los inserta en un
// contenedor e inicializar aspectos y funcionalidad.
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

// Limpiar el localStorage, y la variable que almacena los objetos
// al mismo tiempo animar los objetos de la UI para posteriormente
// eliminarlos (almacenamiento, UI)
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

// Permite eliminar de la UI y del localStorage
// el elemento dado por los argumentos index, y
// target.
function closeRecord(index, target) {

	target = target.parentNode;

	target.classList.add('record-closing');

	target.addEventListener('animationend', () => {

		$('history-wrapper').removeChild(target);

	});

	index = results.findIndex(results => results.id === index + 1);

	results.splice(index, 1);

	// Actualizar localstorage

	localStorage.setItem('coordinates_record', JSON.stringify(results));

	// Actualizar UI una vez la animación de cierra ha terminado

}

// Permite insertar el template dado (error | result )
// y lo inserta dentro del contenedor dado.
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

}

// Elimina el template dado del contenedor
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

// Obtiene los formularios para el calculo
// de las coordenadas (nether, overworld)
// e inicializa validadores de campos de 
// texto.
function GetForm(form) {

	let request;

	request = new XMLHttpRequest();

	request.addEventListener('loadend', () => {

		let wrapper = $('form-wrapper');

		wrapper.classList.add('show');

		wrapper.innerHTML = request.responseText;

		setInputFilter($('coord_x'), (value) => {
			return /^-?\d*[.,]?\d*$/.test(value);
		});

		setInputFilter($('coord_z'), (value) => {
			return /^-?\d*[.,]?\d*$/.test(value);
		});

	});

	request.open('GET', `../templates/${form}.html`, true);

	request.send();

}

// Cambia el indicador de estado además de
// cargar el template solicitado. 
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

// Inicializa el comportamiento de las pestañas
// aquí se invoca la funcion changeTab.
function initTabs() {

	let tabs;

	tabs = document.getElementsByClassName('Tab');

	for (let i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener('click', (event) => {
			changeTab(event);
		});
	}

}
