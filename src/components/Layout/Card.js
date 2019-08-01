import React from 'react'
import styled from 'styled-components'

const CardWrapper = styled.li`
  background-color: #787878;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding: 20px;

  .left {
    align-items: flex-start;
    display: flex;
    flex-direction: column;

    h2 {
      margin: 5px 0;
    }

    .nome {
      font-size: 18px
    }

    .cpf {
      font-size: 14px;
      padding-bottom: 4px;
    }

    .compras {
      border-top: 0.5px solid #fff;
      padding-top: 2px;
    }

    .compras,
    .totalGasto {
      display: block;
      font-size: 14px;
      text-align: left;
      width: 160px;
    }

    .compras {
      transition: all ease 0.2s;
      ${ props => props.sorting === 'loyalty' && 'font-weight: bold;' }
    }

    .totalGasto {
      transition: all ease 0.2s;
      ${ props => props.sorting === 'mostExpensive' && 'font-weight: bold;' }
    }
  }

  .right {
    text-align: right;
    
    p,
    h3 {
      font-size: 16px;
      margin: 4px 0;
    }

    h3 {
      font-weight: 300;
      font-style: italic;
    }
  }

  @media ( max-width: 520px ) {
    margin: 10px auto;
    max-width: 80%;
  }
`

function Card( props ) {
  return (
    <CardWrapper
      sorting={ props.sorting }
    >
      <div className="left">
        <h2>
          { props.id } 
        </h2>
        <span className="nome">
          { props.name }
        </span>
        <span className="cpf">
          CPF: { props.cpf }
        </span>
        <span className="compras">
          Total de compras: { props.purchases }
        </span>
        <span className="totalGasto">
          Total gasto: { props.totalValue }
        </span>
      </div>
      <div className="right">
        <p> Recomendação: </p>
        <h3>
          { props.recommendation && props.recommendation.produto }
        </h3>
      </div>
    </CardWrapper>
  )
}

export default Card