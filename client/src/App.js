import React from 'react'
import 'semantic-ui-css/semantic.min.css'
// import './App.css';
import Form from './components/SettingsForm/'

function App () {
  return (
    <div className='App'>
      <Form onSubmit={x => console.log('Submit', x)} />
    </div>
  )
}

export default App
