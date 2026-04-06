import { getWeatherByCity } from "./weather";

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
});