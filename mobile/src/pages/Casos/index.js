import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Image, FlatList, Text, View, TouchableOpacity } from 'react-native';

import api from '../../services/api'

import logoImg from '../../assets/logo.png';
import styles from './styles.js'

export default function Casos() {
    const [casos, setCasos] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    function navigationToDetalhe(caso){
        navigation.navigate('Detalhe', { caso })
    }

    async function loadCasos(){
        if(loading){
            return
        }

        if(total>0 && casos.length === total){
            return
        }

        setLoading(true)

        const response = await api.get('casos', {
            params: {page}
        })

        setCasos([... casos, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadCasos()
    }, [])



    return (
      <View style={styles.container}>

          <View style={styles.header}>
              <Image source={logoImg}/>
              <Text style={styles.headerText}>
                  Total de <Text style={styles.headerTextBold}> {total} casos</Text>
              </Text>
          </View>

          <Text style={styles.titulo}>Bem Vindo!</Text>
          <Text style={styles.descricao}>Escolha um dos casos abaixo e salve o dia</Text>

          <FlatList
            data={casos}
            style={styles.casoList}
            keyExtractor={caso => String(caso.id)}
            showsVerticalScrollIndicator = {false}
            onEndReached={loadCasos}
            onEndReachedThreshold={0.5}
            renderItem={( { item: caso } )=>(
                <View style={styles.caso}>
                    <Text style={styles.casoProperty}>ONG:</Text>
                    <Text style={styles.casoValue}>{caso.nome}</Text>
                    
                    <Text style={styles.casoProperty}>CASO:</Text>
                    <Text style={styles.casoValue}>{caso.titulo}</Text>
                    
                    <Text style={styles.casoProperty}>VALOR:</Text>
                    <Text style={styles.casoValue}>
                        {Intl.NumberFormat('pt-BR', {
                            style:'currency', 
                            currency: 'BRL'
                        }).format(caso.value)}
                    </Text>
                    <TouchableOpacity
                    style={styles.detalhesButton}
                    onPress={ () => navigationToDetalhe(caso) }
                    >
                        <Text style={styles.detalhesButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"/>
                    </TouchableOpacity>
                </View>                
            )}
          />
      </View>
    );
  }