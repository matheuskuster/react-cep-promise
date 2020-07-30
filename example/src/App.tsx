import React from 'react'

import ReactCepPromise, {IOnResult} from 'react-cep-promise'
import './index.css'

const Example = () => {
  const [fetching, setFetching] = React.useState<boolean>(false);
  const [cep, setCep] = React.useState<string>('');
  const [city, setCity] = React.useState<string>('');
  const [state, setState] = React.useState<string>('');
  const [neighborhood, setNeighborhood] = React.useState<string>('');
  const [street, setStreet] = React.useState<string>('');

  function onResult(result: IOnResult): void {
    const {data, error} = result

    if (data) {
      setCity(data.city)
      setState(data.state)
      setNeighborhood(data.neighborhood)
      setStreet(data.street)
    }

    if (error) console.log(error)
  }

  return (
    <div className="address">
      <h1>React Cep Promise</h1>

      <form>
        <label htmlFor="cep">CEP</label>
        <ReactCepPromise
          id="cep"
          fetching={fetching}
          onChange={(e) => setCep(e.target.value)}
          onResult={onResult}
          setFetching={setFetching}
          value={cep}
        />

        <label htmlFor="city">Cidade</label>
        <input type="text" value={city} id="city" disabled={fetching} />

        <label htmlFor="state">Estado</label>
        <input type="text" value={state} id="state" disabled={fetching}/>

        <label htmlFor="neighborhood">Bairro</label>
        <input type="text" value={neighborhood} id="neighborhood" disabled={fetching}/>

        <label htmlFor="street">Rua</label>
        <input type="text" value={street} id="street" disabled={fetching}/>
      </form>
    </div>
  )
}

export default Example
