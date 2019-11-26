import { encaseP, map } from 'fluture'
import axios from 'axios'
const API_BASE_URL = 'http://localhost:3001'

const fGet = encaseP (axios.get)

/** get :: String -> Future Error a */
const get = path => map (result => result.data) (fGet (`${API_BASE_URL}${path}`))

/** getHierarchical :: () -> Future Cluster */
export const getHierarchical = () => get ('/hierarchical')

/** getKMean :: Query -> Future Error [Centroid] */
export const getKMean = ({ clusters, iterations }) => console.log ('get K-mean') ||
  get (`/k-mean?clusters=${clusters}&iterations=${iterations}`)
