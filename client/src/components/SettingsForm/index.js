import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'semantic-ui-react'
import {
  NumberInput,
  toNumberInput,
  isValidNumberInput,
  getNumber,
  showError
} from './NumberInput'
import Type from 'union-type'
import { FormData, KMeanData } from '../../types/FormData'

const Algorithm = Type ({
  KMean: [],
  Hierarchical: [],
  None: []
})

/** isValidState :: State -> Boolean */
const isValidState = state =>
  state.algorithm.case ({
    Hierarchical: () => true,
    KMean: () => isValidNumberInput (state.clusters) && isValidNumberInput (state.iterations),
    _: () => false
  })

/** toFormData :: State -> FormData */
const toFormData = state =>
  state.algorithm.case ({
    Hierarchical: () => FormData.Hierarchical,
    KMean: () => FormData.KMean (KMeanData.of (getNumber (state.clusters), getNumber (state.iterations))),
    _: () => 'This should not be possible'
  })

const options = [
  { key: 'k', text: 'K-mean', value: 'Algorithm.KMean' },
  { key: 'h', text: 'Hierarchical Clustering', value: 'Algorithm.Hierarchical' }
]

/** SettingsForm :: (FormData -> Any) -> JSX */
const SettingsForm = ({ onSubmit }) => {
  const [state, setState] = useState ({
    algorithm: Algorithm.None,
    clusters: NumberInput.Default,
    iterations: NumberInput.Default
  })

  // select :: FormObject -> State ()
  const select = (_, { value }) => {
    value = value === 'Algorithm.KMean' ? Algorithm.KMean : Algorithm.Hierarchical
    setState ({ ...state, algorithm: value })
  }

  // setNumberInput :: String -> FormObject -> State ()
  const setNumberInput = key => (_, { value }) =>
    setState ({ ...state, [key]: toNumberInput (value) })

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
          onChange={setNumberInput ('clusters')}
          error={showError (state.clusters)}
        />
        <Form.Input
          fluid
          label='Max number of iterations'
          placeholder='Max number of iterations'
          onChange={setNumberInput ('iterations')}
          error={showError (state.iterations)}
        />
      </Form.Group>
      <Button
        type='button'
        disabled={!isValidState (state)}
        onClick={() => {
          if (isValidState (state)) onSubmit (toFormData (state))
        }}
      >
        Submit
      </Button>
    </Form>
  )
}

SettingsForm.propTypes = {
  onSubmit: PropTypes.func
}

export default SettingsForm
