import React, { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import Form from './components/SettingsForm/'
import ClusterAccordion from './components/ClusterAccordion'
import { getHierarchical, getKMean } from './api'
import { fork } from 'fluture'
import Type from 'union-type'
import { Dimmer, Loader } from 'semantic-ui-react'
import { pipe } from 'ramda'
import { FormData } from './types/FormData'

const State = Type ({
  Hierarchical: [Object],
  Kmean: [Array],
  Error: [String],
  Loading: [],
  Nothing: []
})

const getCurrentView = State.case ({
  Hierarchical: cluster => JSON.stringify (cluster, null, 2),
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

  const forkNextState = stateName => fork (setNextState (State.Error)) (setNextState (stateName))

  /** requestClusters :: FormData -> State () */
  const requestClusters = pipe (
    x => console.log (x) || x,
    startLoading,
    FormData.case ({
      Hierarchical: () => forkNextState (State.Hierarchical) (getHierarchical ()),
      KMean: query => forkNextState (State.Kmean) (getKMean (query))
    })

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
