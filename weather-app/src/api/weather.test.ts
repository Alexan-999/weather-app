import { getWeatherByCity, CityNotFoundError, NetworkError } from "./weather";

global.fetch = jest.fn();

describe("getWeatherByCity", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("funciona con ciudad válida", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
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
        json: async () => ({
          current_weather: {
            temperature: 20,
            windspeed: 5,
          },
        }),
      });

    const result = await getWeatherByCity("Madrid");

    expect(result.city).toBe("Madrid");
    expect(result.temperature).toBe(20);
  });

  // City not found
  it("lanza error si la ciudad no existe", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ results: [] }),
    });

    await expect(getWeatherByCity("asdf")).rejects.toThrow(CityNotFoundError);
  });

  //  Network Error
  it("lanza error de red si fetch falla", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("fail"));

    await expect(getWeatherByCity("Madrid")).rejects.toThrow(NetworkError);
  });

  // Edge case 1: format API
  it("maneja respuesta inesperada de la API", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
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
        json: async () => ({
          // no current_weather
        }),
      });

    await expect(getWeatherByCity("Madrid")).rejects.toThrow();
  });

  //Edge case 2: API Fails
  it("maneja error en weather API", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
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
      .mockRejectedValueOnce(new Error("timeout"));

    await expect(getWeatherByCity("Madrid")).rejects.toThrow(NetworkError);
  });

});