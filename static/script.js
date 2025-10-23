async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const resultDiv = document.getElementById('result');

    if (!city) {
        resultDiv.innerHTML = "<p style='color:red;'>Please enter a city name.</p>";
        return;
    }

    resultDiv.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch('/weather', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ city })
        });

        const data = await response.json();

        if (!response.ok) {
            resultDiv.innerHTML = `<p style='color:red;'>${data.error}</p>`;
        } else {
            resultDiv.innerHTML = `
                <h3>${data.city}</h3>
                <p>🌡️ Temperature: ${data.temperature}°C</p>
                <p>☁️ ${data.description}</p>
            `;
        }
    } catch (error) {
        resultDiv.innerHTML = "<p style='color:red;'>Error fetching data. Please try again.</p>";
        console.error(error);
    }
}
