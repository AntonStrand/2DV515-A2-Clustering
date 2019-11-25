import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import {
  NumberInput,
  toNumberInput,
  isValidNumberInput,
  getNumber,
  showError
} from './NumberInput'

/** isValidState :: State -> Boolean */
const isValidState = state =>
  state.algorithm != null &&
  isValidNumberInput(state.clusters) &&
  isValidNumberInput(state.iterations)

/** forkState :: State -> Object */
const forkState = state => ({
  algorithm: state.algorithm,
  clusters: getNumber(state.clusters),
  iterations: getNumber(state.iterations)
})

const options = [
  { key: 'k', text: 'K-mean', value: 'k-mean' },
  { key: 'h', text: 'Hierarchical Clustering', value: 'hierarchical' }
]

/** SettingsForm :: (FormData -> Any) -> JSX */
const SettingsForm = ({ onSubmit }) => {
  const [state, setState] = useState({
    clusters: NumberInput.Default,
    iterations: NumberInput.Default
  })

  // select :: FormObject -> State ()
  const select = (_, { value }) => setState({ ...state, algorithm: value })

  // setNumberInput :: String -> FormObject -> State ()
  const setNumberInput = key => (_, { value }) =>
    setState({ ...state, [key]: toNumberInput(value) })

  return (
    <Form>
      <Form.Group widths='equal'>
        <Form.Select
          fluid
          label='Clustering algorithm'
          options={options}
          placeholder='Clustering algorithm'
          onChange={select}
        />
        <Form.Input
          fluid
          label='Number of clusters'
          placeholder='Number of clusters'
          onChange={setNumberInput('clusters')}
          error={showError(state.clusters)}
        />
        <Form.Input
          fluid
          label='Max number of iterations'
          placeholder='Max number of iterations'
          onChange={setNumberInput('iterations')}
          error={showError(state.iterations)}
        />
      </Form.Group>
      <Button
        type='submit'
        disabled={!isValidState(state)}
        onClick={() => {
          if (isValidState(state)) onSubmit(forkState(state))
        }}
      >
        Submit
      </Button>
    </Form>
  )
}

export default SettingsForm
