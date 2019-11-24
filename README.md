# 2DV515-A2-Clustering

My solution for assignment 2 in Web Intelligence (2DV515) at Linnaeus University

## Requirements

### Grade E

- [x] Implement K-means Clustering with Pearson similarity
- [x] Run the algorithm on the blog data dataset (see Datasets page) with 5 clusters
- [x] The iteration shall stop after a specified number of iterations
- [ ] Present the result as a list of clusters and their assignments
- [ ] Implement the system using a REST web service where:
  - [ ] client sends a request to a server
  - [x] the server responds with json data
  - [ ] the json data is decoded and presented in a client GUI

### Grade C-D

- [x] Instead of stopping after a specified number of iterations, you shall implement functionality for stopping when no new assignments are made
- [x] Each cluster must keep track of the previous assignment, and a check is made if the new cluster assignment matches the previous one

### Grade A-B

- [ ] Implement Hierarchical Clustering with Pearson similarity
- [ ] Run the algorithm on the blog data dataset
- [ ] Present the result as an interactive tree in the client GUI (it shall be possible to expand/collapse branches)

## Get started

`npm install` - Installs all dependencies and generates a new `data.json` <br />
`npm start` - Starts everything <br />
`npm run start:client` - Start only client <br />
`npm run start:server` - Start only server <br />
