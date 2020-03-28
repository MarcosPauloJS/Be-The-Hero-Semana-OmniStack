import React, {useEffect, useState} from 'react';
import { useNavigation} from '@react-navigation/native';

import api from '../../services/api';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { Feather} from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import styles from './styles';

function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    
    const navigation = useNavigation();
    
    function navigateToDetail(incident){
      navigation.navigate('Detail', { incident });
    }

    async function loadIncidents(){
        if(loading){
            return;
        }
        if(total > 0 && incidents.length === total){
            return;
        }

        setLoading(true);
        const response = await (api.get('incidents',{
            params: {page}
        }));

        setIncidents([... incidents, ...response.data.incidents]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(()=>{
        loadIncidents();
    }, []);

    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total}</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem Vindo!</Text>

            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                data={incidents}
                style={styles.IncidentsList}
                keyExtractor = {incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: incident})=>(
                    <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>Caso:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>Valor:</Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR',{
                            style: 'currency', 
                            currency: 'BRL'
                        }).format(incident.value)}
                    </Text>

                    <TouchableOpacity 
                        style={styles.detailsButton} 
                        onPress={()=> navigateToDetail(incident)}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041"/>
                    </TouchableOpacity>
                </View>
                )}
            />
        
    </View> 
        
    );
}

export default Incidents;
