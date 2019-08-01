export function formatCurrency( n ) {
  return "R$ " + n.toFixed( 2 ).replace( '.', ',' ).replace( /(\d)(?=(\d{3})+\,)/g, "$1." );
}