import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(
                'https://cors-anywhere.herokuapp.com/http://5.161.242.174/api-tempo.php'
            ); // Proxy para HTTPS
            const data = await response.json();
            setWeatherData(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Erro ao buscar os dados do tempo:", error);
            setWeatherData({
                datetime: "2024-11-20T00:30",
                condition: "chuvoso",
                temperature: 19.2,
                wind: 8.8,
                humidity: 85,
                info: "Clima chuvoso detectado. Use guarda-chuva, proteja-se e evite áreas com risco de alagamento.",
                hasAlert: null,
            }); // Fallback para dados mockados
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.loadingText}>Carregando dados do tempo...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Card Superior com Clima */}
            <View style={styles.card}>
                <ImageBackground
                    source={{ uri: 'https://via.placeholder.com/300x200' }} // Substitua por sua imagem de fundo
                    style={styles.weatherBackground}
                    imageStyle={{ borderRadius: 20 }}
                >
                    <Text style={styles.temperature}>{Math.round(weatherData.temperature)}°</Text>
                    <View style={styles.iconRow}>
                        <View style={styles.iconItem}>
                            <Text style={styles.iconText}>💨</Text>
                            <Text style={styles.label}>{weatherData.wind} km/h</Text>
                        </View>
                        <View style={styles.iconItem}>
                            <Text style={styles.iconText}>💧</Text>
                            <Text style={styles.label}>{weatherData.humidity}%</Text>
                        </View>
                        <View style={styles.iconItem}>
                            <Text style={styles.iconText}>🌧️</Text>
                            <Text style={styles.label}>{weatherData.condition}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>

            {/* Seção de Informações */}
            <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>INFO</Text>
                <Text style={styles.infoText}>{weatherData.info}</Text>
            </View>

            {/* Barra de Navegação */}
            <View style={styles.navigationBar}>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={[styles.navText, styles.activeNav]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navText}>Ultimas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Fundo preto
        padding: 20,
    },
    card: {
        flex: 1,
        marginBottom: 20,
    },
    weatherBackground: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
    },
    temperature: {
        fontSize: 50,
        color: '#fff',
        fontWeight: 'bold',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    iconItem: {
        alignItems: 'center',
    },
    iconText: {
        fontSize: 24,
        color: '#fff',
    },
    label: {
        color: '#fff',
        fontSize: 12,
    },
    infoSection: {
        flex: 0.5,
        padding: 10,
        backgroundColor: '#121212',
        borderRadius: 20,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 14,
        color: '#aaa',
    },
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#1E1E1E',
        paddingVertical: 10,
        borderRadius: 20,
    },
    navButton: {
        flex: 1,
        alignItems: 'center',
    },
    navText: {
        fontSize: 16,
        color: '#fff',
    },
    activeNav: {
        color: '#007BFF', // Cor azul para ativo
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    loadingText: {
        color: '#fff',
        marginTop: 10,
        fontSize: 16,
    },
});

export default WeatherApp;
