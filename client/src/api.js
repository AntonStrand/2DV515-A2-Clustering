import { encaseP, map } from 'fluture'
import axios from 'axios'
const API_BASE_URL = 'http://localhost:3001'

const fGet = encaseP (axios.get)

/** get :: String -> Future Error a */
const get = path => map (result => result.data) (fGet (`${API_BASE_URL}${path}`))

/** getClusters :: FormData -> Future Error [Clusters] */
export const getClusters = ({ algorithm, clusters, iterations }) =>
  get (`/${algorithm}?clusters=${clusters}&iterations=${iterations}`)
