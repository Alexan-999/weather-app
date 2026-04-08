import { getWeatherByCity, CityNotFoundError, NetworkError } from "./weather";

global.fetch = jest.fn();

describe("getWeatherByCity", () => {

  beforeEach(() => {
    jest.clearAllMocks();
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
        }),
      });

    const result = await getWeatherByCity("Madrid");

    expect(result).toEqual({
      temperature: 20,
      windspeed: 5,
      city: "Madrid",
      country: "Spain",
    });
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