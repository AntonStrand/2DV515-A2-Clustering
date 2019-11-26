import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Structure = ({ cluster }) => {
  const [isActive, setActive] = useState (false)
  const toggleActive = () => setActive (!isActive)

  return cluster.children
    ? <ul>
      <li><span onClick={toggleActive} className={isActive ? 'caret caret-down' : 'caret'}>Cluster</span>
        <ul className={isActive ? 'nested active caret-down' : 'nested'}>
          {cluster.children.map ((c, i) => <Structure key={i} cluster={c} />)}
        </ul>
      </li>
    </ul>
    : <li className={'blog-title'}>{cluster.title}</li>
}

Structure.propTypes = {
  cluster: PropTypes.object
}

const Tree = ({ cluster }) => <div><Structure cluster={cluster}/></div>

Tree.propTypes = {
  cluster: PropTypes.object
}

export default Tree
