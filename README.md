<h1 align="center">React CEP Promise</h1>


<p align="center">
  <a href="https://www.npmjs.com/package/react-cep-promise">
    <img src="https://img.shields.io/npm/v/react-cep-promise.svg">
  </a>
  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg">
  </a>
</p>


<p align="center">
  Componente React que lida com a busca de endereços a partir de um CEP digitado. Por baixo dos panos, utiliza a famosa biblioteca <a href="https://github.com/filipedeschamps/cep-promise">cep-promise</a>
</p>

<p align="center">
  <img src="https://media.giphy.com/media/lrb6A49cOdO0Z7uCLb/giphy.gif" />
</p>

## Instalação

```bash
npm install --save react-cep-promise
```

```bash
yarn add react-cep-promise
```

## Exemplo

```tsx
import React from 'react'

import ReactCepPromise, {IOnResult} from 'react-cep-promise'

const App = () => {
  const [fetching, setFetching] = React.useState<boolean>(false);
  const [cep, setCep] = React.useState<string>('');

  function onResult(result: IOnResult): void {
    const {data, error} = result

    if (data) {
      // do whatever you want with the data below:
      // data.cep
      // data.city
      // data.neighborhood
      // data.state
      // data.street
    }

    if (error) console.log(error)
  }

  return (
    <ReactCepPromise
      fetching={fetching}
      setFetching={setFetching}
      onChange={(e) => setCep(e.target.value)}
      onResult={onResult}
      value={cep}
    />
  )
}

export default App

```
<a href="https://codesandbox.io/s/quirky-darwin-7hunz?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit 7hunz" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

## Propriedades
| Nome                 | Tipo     | Obrigatório | Padrão    | Descrição                                                                                                  |
|----------------------|----------|-------------|-----------|------------------------------------------------------------------------------------------------------------|
| fetching             | boolean  | Sim         |           | Um estado que informa informações do cep estão sendo procuradas. Automaticamente alterado pelo componente. |
| setFetching          | function | Sim         |           | Função que seta fetching. Recebe um booleano como parâmetro.                                               |
| mask                 | string   | Não         | 99999-999 | Máscara do input.                                                                                          |
| value                | string   | Sim         |           | Valor do input.                                                                                            |
| onChange             | function | Sim         |           | Função a ser executada quando o input alterar.                                                             |
| onResult             | function | Sim         |           | Função a ser executada quando a busca pelo cep ser finalizada.                                             |
| shouldDisableOnFetch | boolean  | Não         | true      | Se o input deve ficar desabilitado enquanto o cep está sendo buscado.                                      |
| shouldFetch          | boolean  | Não         | true      | Se o componente deve buscar o cep que foi digitado.                                                        |

## License

MIT © [matheuskuster](https://github.com/matheuskuster)
