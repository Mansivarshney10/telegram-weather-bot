import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Weather } from './weather.model';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get(':city')
  async getWeather(@Param('city') city: string): Promise<Weather> {
    return this.weatherService.getDailyWeather(city);
  }
}