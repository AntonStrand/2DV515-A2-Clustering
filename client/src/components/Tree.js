import React from 'react'

const toJSX = cluster =>
  cluster.children
    ? <ul>{cluster.children.map (toJSX)}</ul>
    : <li>{cluster.title}</li>

const Tree = ({ cluster }) => {
  return <div>{toJSX (cluster)}</div>
}

export default Tree
