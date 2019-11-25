import React, { useState } from 'react'
import { Accordion } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import AccordionItem from './AccordionItem'

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

export default ClusterAccordion
