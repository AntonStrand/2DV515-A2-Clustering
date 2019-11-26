import React, { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import Form from './components/SettingsForm/'
import ClusterAccordion from './components/ClusterAccordion'
import LoadingScreen from './components/LoadingScreen'
import Tree from './components/Tree'
import { getHierarchical, getKMean } from './api'
import { fork } from 'fluture'
import Type from 'union-type'
import { pipe } from 'ramda'
import { FormData } from './types/FormData'

const State = Type ({
  Hierarchical: [Object],
  Kmean: [Array],
  Error: [String],
  Loading: [],
  Nothing: []
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
        { state.case ({
          Hierarchical: cluster => <Tree cluster={cluster} />,
          Kmean: cs => <ClusterAccordion clusters={cs} />,
          Error: () => <h3>Something went wrong...</h3>,
          Loading: () => <LoadingScreen />,
          Nothing: () => ''
        }) }
        <p style={{ margin: '1em 0 2em' }}>Created by <a href='https://github.com/antonstrand'>Anton Strand</a></p>
      </div>
    </>
  )
}

export default App
