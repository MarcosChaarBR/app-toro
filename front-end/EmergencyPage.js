import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EmergencyPage = ({ setCurrentPage }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Números de Emergência - São Paulo, SP</Text>
            <Text style={styles.number}>🚨 Polícia: 190</Text>
            <Text style={styles.number}>🚑 Ambulância: 192</Text>
            <Text style={styles.number}>🚒 Bombeiros: 193</Text>
            <Text style={styles.number}>📞 Defesa Civil: 199</Text>
            <Text style={styles.number}>💡 Enel (Energia Elétrica): 0800 72 72 196</Text>
            <Text style={styles.number}>💦 Sabesp (Água e Esgoto): 0800 055 0195</Text>
            <Text style={styles.number}>📲 SPTrans: 156</Text>
            <Text style={styles.number}>📞 CET (Trânsito): 1188</Text>
            <Text style={styles.number}>📞 Disque-Denúncia: 181</Text>

            {/* Barra de Navegação na Parte Inferior */}
            <View style={styles.navigationBar}>
                <TouchableOpacity style={styles.navButton} onPress={() => setCurrentPage('home')}>
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
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
        backgroundColor: '#888888', // Fundo cinza
        padding: 20,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    number: {
        fontSize: 22,
        color: '#fff',
        marginVertical: 10,
    },
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#666666',
        paddingVertical: 10,
        borderRadius: 20,
        position: 'absolute',
        bottom: 20,
        width: '100%',
    },
    navButton: {
        flex: 1,
        alignItems: 'center',
    },
    navText: {
        fontSize: 22,
        color: '#fff',
    },
});

export default EmergencyPage;
