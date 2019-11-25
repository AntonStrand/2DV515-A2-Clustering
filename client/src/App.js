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
  Loading: [],
  Nothing: []
})

function App () {
  const [state, setState] = useState (State.Nothing)

  /** startLoading :: a -> a */
  const startLoading = x => setState (State.Loading) || x

  /** setKmeanState :: a -> State () */
  const setKmeanState = pipe (
    State.Kmean,
    setState
  )

  /** requestClusters :: FormData -> State () */
  const requestClusters = pipe (
    startLoading,
    getClusters,
    fork (console.error) (setKmeanState)
  )

  return (
    <div className='wrapper'>
      <Form onSubmit={requestClusters} />
      {
        state.case ({
          Kmean: cs => <ClusterAccordion clusters={cs} />,
          Loading: () => (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          ),
          _: () => ''
        })
      }
    </div>
  )
}

export default App
