import React from 'react'
import ReactInputMask from 'react-input-mask'
import cep from 'cep-promise'

type messageType =
  | 'Todos os serviços de CEP retornaram erro.'
  | 'CEP deve conter exatamente 8 caracteres.'

interface IErrors {
  message: string
  service: string
}

interface ICepError {
  name: 'CepPromiseError'
  message: messageType
  type: 'service_error' | 'validation_error'
  errors: IErrors
}

interface ICep {
  cep: string
  state: string
  city: string
  street: string
  neighborhood: string
}

interface IProps {
  shouldFetch?: boolean
  fetching: boolean
  setFetching: (value: boolean) => any
  shouldDisableOnFetch?: boolean
  onResult: (data: ICep | null, error?: ICepError) => any | void
}

const ReactCepPromise: React.FC<IProps> = ({
  shouldFetch = true,
  fetching,
  setFetching,
  shouldDisableOnFetch = true,
  onResult
}) => {
  const [value, setValue] = React.useState<string>('')

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const noMask = event.target.value.replace(/[_-]/g, '')
    setValue(noMask)

    if (noMask.length === 8 && !fetching && shouldFetch) handleSearch(noMask)
  }

  async function handleSearch(formattedValue: string) {
    setFetching(true)

    try {
      const result = await cep(formattedValue)
      onResult(result)
    } catch (error) {
      onResult(null, error)
    }

    setFetching(false)
  }

  return (
    <ReactInputMask
      alwaysShowMask={false}
      disabled={shouldDisableOnFetch && fetching}
      mask='99999-999'
      onChange={onChange}
      value={value}
    />
  )
}

export default ReactCepPromise
export { ICep, ICepError }
