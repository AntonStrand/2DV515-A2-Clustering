import React, { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import Form from './components/SettingsForm/'
import ClusterAccordion from './components/ClusterAccordion'
import { getClusters } from './api'
import { fork } from 'fluture'
import Type from 'union-type'
import { Dimmer, Loader } from 'semantic-ui-react'
import { pipe } from 'ramda'

const State = Type ({
  Kmean: [Array],
  Error: [String],
  Loading: [],
  Nothing: []
})

const getCurrentView = State.case ({
  Kmean: cs => <ClusterAccordion clusters={cs} />,
  Error: () => <h3>Something went wrong...</h3>,
  Loading: () => (
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  ),
  _: () => ''
})

function App () {
  const [state, setState] = useState (State.Nothing)

  /** startLoading :: a -> a */
  const startLoading = x => setState (State.Loading) || x

  /** setKmeanState :: a -> State () */
  const setNextState = nextState => pipe (
    nextState,
    setState
  )

  /** requestClusters :: FormData -> State () */
  const requestClusters = pipe (
    startLoading,
    getClusters,
    fork (setNextState (State.Error)) (setNextState (State.Kmean))
  )

  return (
    <>
      <div className='wrapper'>
        <h1>A2 - Clustering</h1>
        <Form onSubmit={requestClusters} />
        <br />
        { getCurrentView (state) }
        <p style={{ marginTop: '1em' }}>Created by <a href='https://github.com/antonstrand'>Anton Strand</a></p>
      </div>
    </>
  )
}

export default App
