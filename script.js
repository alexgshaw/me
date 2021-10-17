async function construct_coin_info(coin_json) {
  let html = `
  <div class="result">
    <div class="result-info">
      <div class="result-rank">
        <h4>${coin_json.rank}.</h4>
      </div>
      <h4>${coin_json.name} (${coin_json.symbol})</h4>
    </div>
  `
  coin_url = `https://api.coinpaprika.com/v1/tickers/${coin_json.id}`
  let response = await fetch(coin_url)
  let json = await response.json()
  let price = json.quotes.USD.price
  html += `
      <h4>$${price.toFixed(2)}</h4>
    </div>
  `
  return html
}

window.onload = async function(event) {
  url = 'https://api.coinpaprika.com/v1/coins'
  const response = await fetch(url)
  const json = await response.json()
  console.log(json)

  let html = ''
  for (let coin_json of json.slice(0, 10)) {
    html += await construct_coin_info(coin_json)
  }
  document.getElementById('results').innerHTML = html
}
