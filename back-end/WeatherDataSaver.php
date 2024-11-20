<?php 

class WeatherDataSaver {
    private $apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m";
    private $outputFile = "weather_data.json";

    public function fetchAndSaveData() {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->apiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $response = curl_exec($ch);
        curl_close($ch);

        if ($response === false) {
            echo "Erro ao obter dados da API.";
            return;
        }

        $this->saveDataToFile($response);
    }

    private function saveDataToFile($data) {
        $decodedData = json_decode($data, true);

        if (json_last_error() === JSON_ERROR_NONE) {
            $currentWeather = $decodedData['current'] ?? [];
            $hourlyData = $decodedData['hourly'] ?? [];
            
            $formattedData = [
                "datetime" => $currentWeather['time'] ?? null,
                "condition" => $this->getCondition($currentWeather, $hourlyData),
                "temperature" => $currentWeather['temperature_2m'] ?? null,
                "wind" => $currentWeather['wind_speed_10m'] ?? null,
                "humidity" => $hourlyData['relative_humidity_2m'][0] ?? null,
                "info" => null,
                "hasAlert" => null
            ];

            file_put_contents($this->outputFile, json_encode($formattedData, JSON_PRETTY_PRINT));
        } else {
            echo "Erro ao decodificar os dados da API.";
        }
    }

    private function getCondition($currentWeather, $hourlyData) {
        $temperature = $currentWeather['temperature_2m'] ?? null;
        $windSpeed = $currentWeather['wind_speed_10m'] ?? null;
        $humidity = $hourlyData['relative_humidity_2m'][0] ?? null;

        if ($temperature > 30 && $humidity < 50) {
            return "ensolarado";
        } elseif ($windSpeed > 70) {
            return "tempestade";
        } elseif ($windSpeed > 30) {
            return "ventania";
        } elseif ($humidity >= 70) {
            return "chuvoso";
        } else {
            return "nublado";
        }
    }
}
