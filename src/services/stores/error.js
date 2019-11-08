// Price and title are important properties, if we can't get them, we throw an error
export default function verifyProductData ({price, title}) {
  if (price === 0 || !price || !title) {
    throw new Error('No se pudo obtener la información del producto')
  }
}
