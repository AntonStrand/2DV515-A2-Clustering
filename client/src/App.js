import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import Form from './components/SettingsForm/'
import { getClusters } from './api'
import { fork } from 'fluture'

function App () {
  const requestClusters = formData => console.log ('request') ||
  fork (console.error) (console.log) (getClusters (formData))

  return (
    <div className='App'>
      <Form onSubmit={requestClusters} />
    </div>
  )
}

export default App
