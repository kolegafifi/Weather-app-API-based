const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=2804af495f0b4115172d8c3de86d7cfe'
const API_UNITS = '&units=metric'

const getWeather = () => {
	const city = input.value || 'London'
	const URL = API_LINK + city + API_KEY + API_UNITS

	axios
		.get(URL)
		.then(res => {
			const temp = res.data.main.temp
			const hum = res.data.main.humidity
			cityName.textContent = res.data.name
			temperature.textContent = Math.round(temp) + 'ºC'
			humidity.textContent = hum + '%'
			const status = res.data.weather[0].id
			weather.textContent = res.data.weather[0].main
			warning.textContent = ''
			input.value = ''
			if (status == 801 || status == 802 || status == 803 || status == 804) {
				photo.setAttribute('src', './img/cloud.png')
			} else if (
				status == 300 ||
				status == 301 ||
				status == 302 ||
				status == 310 ||
				status == 311 ||
				status == 312 ||
				status == 313 ||
				status == 314 ||
				status == 321
			) {
				photo.setAttribute('src', './img/drizzle.png')
			} else if (status == 741) {
				photo.setAttribute('src', './img/fog.png')
			} else if (
				status == 600 ||
				status == 601 ||
				status == 602 ||
				status == 611 ||
				status == 612 ||
				status == 613 ||
				status == 615 ||
				status == 616 ||
				status == 620 ||
				status == 621 ||
				status == 622
			) {
				photo.setAttribute('src', './img/ice.png')
			} else if (
				status == 500 ||
				status == 501 ||
				status == 502 ||
				status == 503 ||
				status == 504 ||
				status == 511 ||
				status == 520 ||
				status == 521 ||
				status == 522 ||
				status == 531
			) {
				photo.setAttribute('src', './img/rain.png')
			} else if (status == 800) {
				photo.setAttribute('src', './img/sun.png')
			} else if (
				status == 200 ||
				status == 201 ||
				status == 202 ||
				status == 210 ||
				status == 211 ||
				status == 212 ||
				status == 221 ||
				status == 230 ||
				status == 231 ||
				status == 232
			) {
				photo.setAttribute('src', './img/thunderstorm.png')
			} else {
				photo.setAttribute('src', './img/unknown.png')
			}
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwe miasta!'))
}
const enterKeyCheck = e => {
	if (e.key == 'Enter') {
        getWeather()
	}
}
input.addEventListener('keyup', enterKeyCheck)
button.addEventListener('click', getWeather)
