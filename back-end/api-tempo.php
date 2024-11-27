<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
require_once 'WeatherDataSaver.php';


$conditionMessages = [
    "ensolarado" => "Em dias ensolarados, a temperatura é alta e o céu claro. Use protetor solar, beba água e evite exposição direta ao sol por longos períodos.",
    "chuvoso" => "Clima chuvoso detectado. Use guarda-chuva, proteja-se e evite áreas com risco de alagamento.",
    "tempestade" => "Alerta de tempestade: ventos fortes e chuvas intensas podem ocorrer. Evite áreas abertas e mantenha-se atualizado sobre os avisos meteorológicos.",
    "ventania" => "Alerta de ventania: ventos fortes podem ser perigosos. Proteja-se de objetos soltos e evite ficar próximo a árvores ou estruturas frágeis.",
    "indefinido" => "Condição climática estável no momento. Aproveite o dia, mas esteja atento a mudanças repentinas."
];


$weatherDataSaver = new WeatherDataSaver();
$weatherDataSaver->fetchAndSaveData();


$dataFromFile = file_get_contents('weather_data.json');
$decodedData = json_decode($dataFromFile, true);


if (isset($decodedData['wind']) && $decodedData['wind'] > 70) {
    $decodedData['hasAlert'] = true;
    $decodedData['info'] = "Alerta de tempestade: Ventos extremamente fortes detectados! Evite áreas abertas.";
} elseif (isset($decodedData['temperature'], $decodedData['humidity']) 
          && $decodedData['temperature'] > 30 
          && $decodedData['humidity'] > 80) {
    $decodedData['hasAlert'] = true;
    $decodedData['info'] = "Alerta de tempestade: Condições de calor e umidade extrema. Possibilidade de tempestades.";
} else {
    $decodedData['hasAlert'] = false;
    $decodedData['info'] = "Sem alertas no momento.";
}

$decodedData['info'] = $conditionMessages[$decodedData['condition']] ?? "Condição não reconhecida. Consulte fontes confiáveis para mais informações.";

echo json_encode($decodedData);
?>
