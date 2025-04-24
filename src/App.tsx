import '../globals.js';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity  } from 'react-native';
import {createLibp2p} from 'libp2p'
import { multiaddr } from '@multiformats/multiaddr'

import debug from 'debug'
import { config } from './config/libp2pconfig';

debug.enable('libp2p:*,*:trace')
export default function App() {
  const [libp2p, setLibp2p] = useState(null)
  const [peers, setPeers] = useState(null)
  const [multiaddrs, setMultiaddrs] = useState(null)


 useEffect(()=>{ 
  async function initLibp2p(){
    const lp2p = await createLibp2p(config)
    setLibp2p(lp2p)
    setInterval(() => {
      setPeers(lp2p.getPeers())
      setMultiaddrs(lp2p.getMultiaddrs())
    }, 1000)
  }
  initLibp2p()
 },[])




  useEffect(()=>{
    async function dialPeer(){
      const ma = multiaddr('/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt')
      try {
        console.log('Dialing multiaddr %s', ma.toString())
        await libp2p.dial(ma)
        console.log('Dialed multiaddr %s', ma.toString())
        return
      } catch (error) {
        console.log(`failed to dial multiaddr: %o`, error)
      }
    }
    if(libp2p){
      console.log('Dialing peer...')
      dialPeer().then(() => {
        console.log('Dialed peer successfully')
      })
   
  }}, [libp2p])


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity>
          <Text style={styles.headerButton}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          <Text>{libp2p ? libp2p.peerId.toString() : 'Loading ....'}</Text>
          <Text>Peers {peers?.join(', ')}</Text>
      <Text>Multiaddrs {multiaddrs?.join(', ')}</Text>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerButton: {
    color: '#3b82f6',
    fontSize: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 16,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  cardTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  periodText: {
    fontSize: 12,
    color: '#6b7280',
  },
});
