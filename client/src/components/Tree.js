import React from 'react'
import PropTypes from 'prop-types'

const toJSX = cluster =>
  cluster.children
    ? <ul>{cluster.children.map (toJSX)}</ul>
    : <li>{cluster.title}</li>

const Tree = ({ cluster }) => {
  return <div>{toJSX (cluster)}</div>
}

Tree.propTypes = {
  cluster: PropTypes.object
}

export default Tree
