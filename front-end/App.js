import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, ImageBackground } from 'react-native';
import EmergencyPage from './EmergencyPage';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState('home');

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(
                'https://cors-anywhere.herokuapp.com/http://5.161.242.174/api-tempo.php'
            );
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

    if (currentPage === 'emergency') {
        return <EmergencyPage setCurrentPage={setCurrentPage} />;
    }

    return (
        <View style={styles.container}>
            {/* Card Superior com Clima */}
            <ImageBackground
                source={require('./assets/fundo.png')}
                style={styles.card}
                imageStyle={styles.backgroundImage}
            >
                <Text style={styles.temperature}>{Math.round(weatherData.temperature)}°</Text>
                {/* Ícone abaixo da temperatura */}
                <Image
                    source={require('./assets/nublado.png')}
                    style={styles.weatherIcon}
                />
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

            {/* Seção de Informações */}
            <View style={styles.infoSection}>
                <Text style={styles.infoText}>{weatherData.info}</Text>
            </View>

            {/* Barra de Navegação */}
            <View style={styles.navigationBar}>
                <TouchableOpacity style={styles.navButton} onPress={() => setCurrentPage('home')}>
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() => setCurrentPage('emergency')}>
                    <Text style={styles.navText}>Emergência</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navText}>Loja</Text>
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
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },
    backgroundImage: {
        borderRadius: 20,
        width: '100%',
    },
    temperature: {
        fontSize: 90,
        color: '#fff',
        fontWeight: 'bold',
    },
    weatherIcon: {
        marginTop: 2, // Espaçamento abaixo da temperatura
        width: 180,
        height: 180,
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
        fontSize: 60,
        color: '#fff',
    },
    label: {
        color: '#fff',
        fontSize: 24,
    },
    infoSection: {
        flex: 0.5,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#121212',
        borderRadius: 20,
    },
    infoText: {
        fontSize: 28,
        color: '#aaa',
    },
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#888888',
        paddingVertical: 10,
        borderRadius: 20,
    },
    navButton: {
        flex: 1,
        alignItems: 'center',
    },
    navText: {
        fontSize: 22,
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
