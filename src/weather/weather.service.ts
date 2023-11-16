import { Injectable} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class WeatherService {
  private readonly apiKey = 'eb478130efa0ae559e86e1f29ce86dd5';

  constructor(private httpService: HttpService) {}

  async getDailyWeather(city: string): Promise<any> {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;
    const response = await this.httpService.get(url).toPromise();
    const data = response.data;

    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
    }
  }
}
