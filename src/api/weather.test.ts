import { getWeatherByCity, clearWeatherCache, AmbiguousCityError, CityNotFoundError, NetworkError } from "./weather";

global.fetch = jest.fn();

describe("getWeatherByCity", () => {

  beforeEach(() => {
    jest.clearAllMocks();
    clearWeatherCache();
  });

  it("returns weather data for a valid city", async () => {
    (fetch as jest.Mock)
      // getCoordinates
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            {
              name: "Madrid",
              country: "Spain",
              latitude: 40,
              longitude: -3,
            },
          ],
        }),
      })
      // getWeather
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          current_weather: {
            temperature: 20,
            windspeed: 5,
          },
          daily: {
            time: [],
            temperature_2m_max: [],
            temperature_2m_min: [],
            weathercode: [],
          },
        }),
      });

    const result = await getWeatherByCity("Madrid");

    expect(result).toEqual({
      temperature: 20,
      windspeed: 5,
      city: "Madrid",
      country: "Spain",
      forecast: [],
    });
  });

  it("throws AmbiguousCityError if multiple locations match", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            name: "Tokyo",
            country: "Japan",
            latitude: 35.6,
            longitude: 139.7,
          },
          {
            name: "Tokyo",
            country: "United States",
            latitude: 38.0,
            longitude: -122.0,
          },
        ],
      }),
    });

    await expect(getWeatherByCity("Tokyo")).rejects.toBeInstanceOf(AmbiguousCityError);
  });

  it("throws CityNotFoundError if city does not exist", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    });

    await expect(getWeatherByCity("asdf")).rejects.toThrow(CityNotFoundError);
  });

  it("throws NetworkError if geocoding request fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(getWeatherByCity("Madrid")).rejects.toThrow(NetworkError);
  });

  it("throws NetworkError if weather request fails", async () => {
    (fetch as jest.Mock)
      // getCoordinates
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            {
              name: "Madrid",
              country: "Spain",
              latitude: 40,
              longitude: -3,
            },
          ],
        }),
      })
      // getWeather fails
      .mockResolvedValueOnce({
        ok: false,
      });

    await expect(getWeatherByCity("Madrid")).rejects.toThrow(NetworkError);
  });

  it("throws error if weather API response is malformed", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            {
              name: "Madrid",
              country: "Spain",
              latitude: 40,
              longitude: -3,
            },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({}), // missing current_weather
      });

    await expect(getWeatherByCity("Madrid")).rejects.toThrow();
  });

});