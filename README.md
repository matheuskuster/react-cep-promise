# react-cep-promise

> A React wrapper for the cep-promise library

[![NPM](https://img.shields.io/npm/v/react-cep-promise.svg)](https://www.npmjs.com/package/react-cep-promise) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-cep-promise
```

## Usage

```tsx
import React from 'react'

import ReactCepPromise, {IOnResult} from 'react-cep-promise'

const Example = () => {
  const [fetching, setFetching] = React.useState<boolean>(false);
  const [cep, setCep] = React.useState<string>('');

  function onResult(result: IOnResult): void {
    const {data, error} = result

    if (data) {
      // now you do what you want with the returned value
    }

    if (error) console.log(error)
  }

  return (
    <ReactCepPromise
      fetching={fetching}
      onChange={(e) => setCep(e.target.value)}
      onResult={onResult}
      setFetching={setFetching}
      value={cep}
    />
  )
}

export default Example

```

## License

MIT © [matheuskuster](https://github.com/matheuskuster)
