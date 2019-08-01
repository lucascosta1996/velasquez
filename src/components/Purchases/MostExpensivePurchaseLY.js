import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { formatCurrency } from '../../helpers/currency'

const Container = styled.section`
  padding: 60px;
  text-align: left;

  h2 {
    font-size: 16px;
    font-weight: 300;
  }

  .cpf,
  .value {
    margin: 4px 0;
  }
`

class MostExpensivePurchaseLY extends Component {
  state = {
    mostExpensiveValue: 0,
    mostExpensiveClient: '',
    sorting: ''
  }

  componentWillReceiveProps( props ) {
    if ( props.purchaseHistory.length > 0 ) {
      const lastYearHistory = props.purchaseHistory.filter( ( purchase ) => (
        purchase.data.includes( '2016' )
      ) )

      const mostExpensivePurchase = lastYearHistory.sort( ( a, b ) => {
        if ( a.valorTotal < b.valorTotal ) {
          return 1;
        }
        if ( a.valorTotal > b.valorTotal ) {
          return -1;
        }
        return 0;
      } )
      
      const clientName = props.clients.filter( function( client ) {
        return client.cpf.replace( '-', '.' ) === this
      }, mostExpensivePurchase[0].cliente.replace( '0000', '000' ) )

      this.setState( {
        mostExpensiveValue: formatCurrency( mostExpensivePurchase[0].valorTotal ),
        mostExpensiveClient: clientName[0].nome
      } )
    }
  }

  render() {
    return (
      <Container>
        {
          this.props.clients.length > 0 &&
          <Fragment>
            <h2>Cliente com maior compra única no último ano (2016):</h2>
            <p className="cpf">{ this.state.mostExpensiveClient && this.state.mostExpensiveClient }</p>
            <p className="value">{ this.state.mostExpensiveValue && this.state.mostExpensiveValue }</p>
          </Fragment>
        }
      </Container>
    );
  }
}

export default MostExpensivePurchaseLY;
