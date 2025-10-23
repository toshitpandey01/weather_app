from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)  # ✅ Correct: double underscores

# Replace with your actual OpenWeather API key
API_KEY = "27df5b29bee067875f61544bf73b9911"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/weather', methods=['POST'])
def weather():
    city = request.json.get('city')
    if not city:
        return jsonify({'error': 'City is required'}), 400

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()

    if data.get('cod') != 200:
        return jsonify({'error': 'City not found'}), 404

    weather_info = {
        'city': data['name'],
        'temperature': data['main']['temp'],
        'description': data['weather'][0]['description'].title(),
    }
    return jsonify(weather_info)

if __name__ == '__main__':  # ✅ Correct: double underscores
    app.run(debug=True)
