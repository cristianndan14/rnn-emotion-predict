document.getElementById('predictForm').addEventListener('submit', async (e) => {
	e.preventDefault();

	const valor1 = parseFloat(document.getElementById('valor1').value);
	const valor2 = parseFloat(document.getElementById('valor2').value);

	const response = await fetch('/predict', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ valor1, valor2 })
	});

	const data = await response.json();
	const resultadoDiv = document.getElementById('resultado');

	if (data.resultado) {
		resultadoDiv.textContent = `Predicción: ${data.resultado}`;
		resultadoDiv.classList.remove('d-none', 'alert-danger');
		resultadoDiv.classList.add('alert-info');
	} else {
		resultadoDiv.textContent = `Error: ${data.error}`;
		resultadoDiv.classList.remove('d-none', 'alert-info');
		resultadoDiv.classList.add('alert-danger');
	}
});