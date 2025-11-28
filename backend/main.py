# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEO_URL = "https://geocoding-api.open-meteo.com/v1/search"
WEATHER_URL = "https://api.open-meteo.com/v1/forecast"

@app.get("/")
def read_root():
    return {"message": "API de Clima para Produtores Rurais está online!"}

@app.get("/api/weather/{city_name}")
async def get_weather(city_name: str):
    async with httpx.AsyncClient() as client:
        try:
            geo_response = await client.get(
                f"{GEO_URL}",
                params={"name": city_name, "count": 1, "language": "pt", "format": "json"}
            )
            geo_data = geo_response.json()
        except Exception as e:
            raise HTTPException(status_code=503, detail="Erro ao conectar com serviço de geolocalização")

       
        if not geo_data.get("results"):
            raise HTTPException(status_code=404, detail="Cidade não encontrada")

        cidade_info = geo_data["results"][0]
        lat = cidade_info["latitude"]
        lon = cidade_info["longitude"]
        nome_oficial = cidade_info["name"]
        estado = cidade_info.get("admin1", "")

        try:
            weather_response = await client.get(
                f"{WEATHER_URL}",
                params={
                    "latitude": lat,
                    "longitude": lon,
                    "current": "temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m"
                }
            )
            weather_data = weather_response.json()
        except Exception as e:
            raise HTTPException(status_code=503, detail="Erro ao conectar com serviço de clima")

        current = weather_data.get("current", {})
        units = weather_data.get("current_units", {})

        return {
            "city": nome_oficial,
            "region": estado,
            "data": {
                "temperature": current.get("temperature_2m"),
                "humidity": current.get("relative_humidity_2m"),
                "precipitation": current.get("precipitation"),
                "wind_speed": current.get("wind_speed_10m")
            },
            "units": {
                "temperature": units.get("temperature_2m"),
                "humidity": units.get("relative_humidity_2m"),
                "precipitation": units.get("precipitation"),
                "wind_speed": units.get("wind_speed_10m")
            }
        }