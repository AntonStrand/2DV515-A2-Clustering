import React from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

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

export default AccordionItem
