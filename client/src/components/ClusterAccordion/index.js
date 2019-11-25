import React, { useState } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const AccordionItem = (activeIndex, setActive) => (cluster, i) => (
  <>
    <Accordion.Title
      active={activeIndex === i}
      index={i}
      onClick={() => setActive (activeIndex === i ? -1 : i)}
    >
      <Icon name='dropdown' />
      {`Cluster  ${(i + 1)}  (${cluster.length})`}
    </Accordion.Title>
    <Accordion.Content active={activeIndex === i}>
      {cluster.map (({ title }, i) => <p key={i}>{title}</p>)}
    </Accordion.Content>
  </>
)

const ClusterAccordion = ({ clusters }) => {
  const [activeIdx, setActive] = useState (0)

  return (
    <Accordion styled>
      {clusters.map (AccordionItem (activeIdx, setActive))}
    </Accordion>
  )
}

ClusterAccordion.propTypes = {
  clusters: PropTypes.arrayOf (PropTypes.arrayOf (PropTypes.object))
}

ClusterAccordion.displayName = 'ClusterAccordion'

export default ClusterAccordion
