import React, { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import Form from './components/SettingsForm/'
import ClusterAccordion from './components/ClusterAccordion'
import { getClusters } from './api'
import { fork } from 'fluture'
import Type from 'union-type'

const ClusterState = Type ({
  Kmean: [Array],
  Nothing: []
})

function App () {
  const [state, setState] = useState (ClusterState.Nothing)
  const requestClusters = formData =>
    fork (console.error) (x => setState (ClusterState.Kmean (x))) (getClusters (formData))

  console.log (state)
  return (
    <div className='App'>
      <Form onSubmit={requestClusters} />
      {
        state.case ({
          Kmean: cs => <ClusterAccordion clusters={cs} />,
          _: () => ''
        })
      }
    </div>
  )
}

export default App
