export default function getMailContent (product, desiredPrice, currentPrice) {
  return `
    <h1>¡Buenas Noticias!</h1>
    <img
      style="width: 128px; margin: 0 auto"
      alt=${product.title}
      src=${product.image || 'https://ca.weiserlock.com/img/global/no_image.png'} />
    <p>
      El precio de <a href=${product.link} target="_blank" rel="noopener noreferrer">
      ${product.title} </a> ha caído por debajo del precio deseado.
      <br/>
      <b>Precio deseado: ${desiredPrice}</b>
      <b>Precio actual: ${currentPrice}</b>
    </p>
  `
}
