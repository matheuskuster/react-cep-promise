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

interface IOnResult {
  data?: ICep
  error?: ICepError
}

interface IProps {
  fetching: boolean
  mask?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onResult: ({ data, error }: IOnResult) => any | void
  setFetching: React.Dispatch<React.SetStateAction<boolean>>
  shouldDisableOnFetch?: boolean
  shouldFetch?: boolean
  value: string
}

const ReactCepPromise: React.FC<IProps> = ({
  fetching,
  mask = '99999-999',
  onChange,
  onResult,
  setFetching,
  shouldDisableOnFetch = true,
  shouldFetch = true,
  value,
  ...props
}) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event)

    const noMask = event.target.value.replace(/[_-]/g, '')
    if (noMask.length === 8 && !fetching && shouldFetch) handleSearch(noMask)
  }

  async function handleSearch(formattedValue: string) {
    setFetching(true)

    try {
      const result = await cep(formattedValue)
      onResult({ data: result })
    } catch (error) {
      onResult({ error })
    }

    setFetching(false)
  }

  return (
    <ReactInputMask
      alwaysShowMask={false}
      disabled={shouldDisableOnFetch && fetching}
      mask={mask}
      onChange={handleChange}
      value={value}
      {...props}
    />
  )
}

export default ReactCepPromise
export { ICep, ICepError, IOnResult }
