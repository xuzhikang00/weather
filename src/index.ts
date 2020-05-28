import commander from "commander"
import colors from "colors"
import axios, { AxiosResponse } from "axios"
commander
    .version("0.1.0")
    .option("-c, --city [name]", "Add city name")
    .parse(process.argv)
if (process.argv.slice(2).length===0) {
    commander.outputHelp(colors.red);
    process.exit();
}
interface IWeatherResponse {
    status: string;
    count: string;
    info: string;
    infocode: string;
    lives: ILive[];
}
interface ILive {
    province: string;
    city: string;
    adcode: string;
    weather: string;
    temperature: string;
    winddirection: string;
    windpower: string;
    humidity: string;
    reporttime: string;
}
const URL = "https://restapi.amap.com/v3/weather/weatherInfo";
const KEY = "f1c4fd18455bbf6dac4e40e54957cded";
const log=console.log
axios.get(`${URL}?city=${encodeURI(commander.city)}&key=${KEY}`).then((res: AxiosResponse<IWeatherResponse>) => {
    const live = res.data.lives[0];
    log(colors.yellow(live.reporttime));
    log(colors.white(`${live.province}${live.city}`));
    log(colors.green(`${live.weather}${live.temperature} ${'度'}`));
}).catch(() => {
    log(colors.red("天气服务出现异常"))
})
async function getWeather(city: string) {
    try {
        const url = `${URL}?city=${encodeURI(commander.city)}&key=${KEY}`;
        const response = await axios.get(url);
        const live = response.data.lives[0];
        log(colors.yellow(live.reporttime));
        log(colors.white(`${live.province}${live.city}`));
        log(colors.green(`${live.weather}${live.temperature} ${'度'}`));
    } catch{
        log(colors.red("天气服务出现异常"))
    }
}