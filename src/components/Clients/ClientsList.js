import React, { Component, Fragment } from 'react'
import Card from '../Layout/Card'
import styled from 'styled-components'
import { formatCurrency } from '../../helpers/currency'

const Select = styled.select`
  appearance: none;
  display: block;
  margin: 0 auto 1em auto;
  padding: .5em;
  padding-right: 1.5em;
  width: auto;
  min-width: 200px;
  outline: none;
  font-family: sans-serif;
  font-size: 12pt;
  font-weight: 400;
  text-indent: 0.01px;
  text-overflow: '';
  border-radius: 2px;
  color: rgba(0,0,0,.7);
  background-color: rgba(255,255,255,.5);
  background-repeat: no-repeat;
  background-position: calc(100% - .5em) 50%;
  background-size: 12px;
  transition: all .2s ease-in-out;
  box-shadow: rgba(0,0,0,.15) 0 1px 0;
  color: rgba(0,0,0,.7);
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+DQo8cG9seWdvbiBvcGFjaXR5PSIwLjciIHBvaW50cz0iMCw0IDE2LDQgOCwxMiIvPg0KPC9zdmc+DQo=');
`

class ClientsList extends Component {
  state = {
    clients: [],
    sorting: 'default'
  }

  componentWillReceiveProps( props ){
    props.clients.length > 0 && this.setState( {
      clients: props.clients
    } )
  }

  handleSort( event ) {
    const value = event.target ? event.target.value : event
    const { clients } = this.state
    this.setState( { sorting: value } )
    
    if ( value === 'mostExpensive' ) {
      const sortedArray = clients.sort( (a, b) => {
        if ( a.totalGasto < b.totalGasto ) {
          return 1;
        }
        if ( a.totalGasto > b.totalGasto ) {
          return -1;
        }
        return 0;
      })

      this.setState( {
        clients: sortedArray
      } )
    } else if ( value === 'loyalty' ) {
      // Fidelidade do cliente baseada na quantidade de compras de cada um
      const sortedArray = clients.sort( (a, b) => {
        if ( a.compras && b.compras ) {
          if ( a.compras.length < b.compras.length ) {
            return 1;
          }
          if ( a.compras.length > b.compras.length ) {
            return -1;
          }
        }
        return 0;
      })

      this.setState( {
        clients: sortedArray
      } )
    }
  }

  render() {
    const { sorting } = this.state
    const { clients } = this.props
    return (
      <div className="ClientsList">
        {
          clients.length > 0 &&
          <Fragment>
            <Select onChange={this.handleSort.bind(this)} value={sorting}>
              <option value="default">Selecione um filtro...</option>
              <option value="loyalty">Mais fiéis</option>
              <option value="mostExpensive">Valor total em compras</option>
            </Select>
            <div className="clientsContainer">
              {
                clients && clients.map( ( client ) => (
                  <Card
                    cpf={ client.cpf.replace( '-', '.' ) }
                    key={ client.cpf }
                    id={ client.id }
                    purchases={ client.compras && client.compras.length }
                    name={ client.nome }
                    totalValue={ client.totalGasto && formatCurrency( client.totalGasto ) }
                    recommendation={ client.recomendacao && client.recomendacao }
                    sorting={ sorting }
                  />
                ) )
              }
            </div>
          </Fragment>
        }
      </div>
    );
  }
}

export default ClientsList;
