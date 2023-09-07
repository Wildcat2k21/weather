//вешаем слушатель события onclick на кнопку button
let $el = document.querySelector('#forecast-btn');
$el.onclick = getWeather;

//DOM элементы выбранный город и текст для пресказания погоды
const $forecastText = document.querySelector('#forecast-text');
const $forecastIcon = document.querySelector('#f-icon');
const selection = document.querySelector('#city');

//функция для получения погоды
function getWeather(){
document.querySelector('body').style.height = "340px" //меняет размер страницы расширения
const selectedIndex = selection.selectedIndex;
const selectedCity = selection[selectedIndex].getAttribute('value'); //выбираем выбранный город в выпадающем списке

//формируем запрос для api с выбранным городом
const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${selectedCity}&days=3`;
const options = {
  method: 'GET',
  headers: {  //ключ для доступа к функциям api прогноза погоды
    'X-RapidAPI-Key': '5868a8c332msha0d53c4adbb4858p11112ajsna33c96352082',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};

//обработка полученных данных
function weatherInfo(data){
  const forecast = data.forecast.forecastday[1].day;
  const {avgtemp_c, maxtemp_c, maxwind_kph, daily_will_it_rain, daily_will_it_snow, mintemp_c} = forecast;
  $forecastIcon.src = `https:${forecast.condition.icon}`;

  //выводим прогноз погоды в элемент span id = forecast-text
  $forecastText.textContent = `Средняя температура: ${avgtemp_c}°| максимальная температура: ${maxtemp_c}°|     
  минимальная температура: ${mintemp_c}°|    ожидается дождь: ${daily_will_it_rain === 1 ? 'да' : 'нет'}|   
  ожидается снег: ${daily_will_it_snow === 1 ? 'да' : 'нет'}|    максимальный ветер: ${maxwind_kph}км/ч|    небо: ${forecast.condition.text}|`
}

//отправляем запрос на сервис
async function getWeatherForcast(){
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    weatherInfo(result);
  } catch (error) {
    console.error(error);
  }
}

//вызываем функцию для обработаки полученных данных
getWeatherForcast();
}