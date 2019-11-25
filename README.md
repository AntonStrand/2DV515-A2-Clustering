# 2DV515-A2-Clustering

My solution for assignment 2 in Web Intelligence (2DV515) at Linnaeus University

## Requirements

### Grade E

- [x] Implement K-means Clustering with Pearson similarity
- [x] Run the algorithm on the blog data dataset (see Datasets page) with 5 clusters
- [x] The iteration shall stop after a specified number of iterations
- [x] Present the result as a list of clusters and their assignments
- [x] Implement the system using a REST web service where:
  - [x] client sends a request to a server
  - [x] the server responds with json data
  - [x] the json data is decoded and presented in a client GUI

### Grade C-D

- [x] Instead of stopping after a specified number of iterations, you shall implement functionality for stopping when no new assignments are made
- [x] Each cluster must keep track of the previous assignment, and a check is made if the new cluster assignment matches the previous one

### Grade A-B

- [ ] Implement Hierarchical Clustering with Pearson similarity
- [ ] Run the algorithm on the blog data dataset
- [ ] Present the result as an interactive tree in the client GUI (it shall be possible to expand/collapse branches)

## Scripts

#### `npm install`
Installs all dependencies for both client and server and generates a new `data.json`.
#### `npm start`
Starts both client ([localhost:3000](http://localhost:3000)) and server ([localhost:3001](http://localhost:3001)).
#### `npm run start:client`
Start only client on [localhost:3000](http://localhost:3000).
#### `npm run start:server`
Start only server on [localhost:3001](http://localhost:3001).
