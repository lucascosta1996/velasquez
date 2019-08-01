import React, { Component } from 'react'
import logo from './logo.svg'
import axios from 'axios'
import './App.css'
import ClientsList from './components/Clients/ClientsList'
import MostExpensivePurchaseLY from './components/Purchases/MostExpensivePurchaseLY'

class App extends Component {
  state = {
    clients: [],
    purchaseHistory: []
  }

  componentDidMount() {
    axios.all([
      axios.get('http://www.mocky.io/v2/598b16291100004705515ec5'),
      axios.get('http://www.mocky.io/v2/598b16861100004905515ec7')
    ])
    .then( axios.spread( function (clientsResponse, historyResponse) {
      clientsResponse.data.map( function( client ) {

        // todas as compras do cliente atual do map
        const clientPurchases = historyResponse.data.filter( function ( purchase ) {
          return purchase.cliente.replace('0000', '000') === this.cpf.replace( '-', '.' )
        }, client )

        //categorias de vinho para recomendação
        function setCategory( category ) {
          const categoryArray = clientPurchases.map( function( purchase ) {
            return purchase.itens.filter( item => item.categoria.includes( this ) )
          }, category )
          
          return categoryArray.flat()
        }

        const catTinto = setCategory( 'Tinto' )
        const catRose = setCategory( 'Rosé' )
        const catBranco = setCategory( 'Branco' )
        const categories = []
        categories.push( catTinto, catRose, catBranco )
        categories.sort( ( a, b ) => {
          if ( a.length < b.length ) {
            return 1;
          }
          if ( a.length > b.length ) {
            return -1;
          }
          return 0;
        })
        //é recomendada uma opção na categoria mais comprada pelo cliente
        const recommendation = categories[0][0]
        
        // soma do valor total de todas as compras do cliente
        const sum = clientPurchases.reduce( function( prevVal, elem ) {
          return prevVal + elem.valorTotal;
        }, 0 )
        const clientIndex = clientsResponse.data.indexOf( client )
        const updatedClient = Object.assign( { 
          'compras': clientPurchases, 'totalGasto': sum, 'recomendacao': recommendation }, 
          clientsResponse.data[ clientIndex ] 
        )
        const updatedClients = clientsResponse.data
        updatedClients[clientIndex] = updatedClient

        this.setState( {
          clients: updatedClients,
          purchaseHistory: historyResponse.data
        })
      }, this )
    }.bind(this) ))
  }

  render() {
    console.log(this.state.clients)
    return (
      <div className="App">
        <header className="App-header">
          <img src='https://img.icons8.com/color/96/000000/grapes.png' className="App-logo" alt="logo" />
          <div className="main">
            <ClientsList
              clients={ this.state.clients }
            />
            <MostExpensivePurchaseLY
              clients={ this.state.clients }
              purchaseHistory={ this.state.purchaseHistory }
            />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
