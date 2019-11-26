import Type from 'union-type'

const KMeanData = Type ({
  of: {
    clusters: Number,
    iterations: Number
  }
})

const FormData = Type ({
  Hierarchical: [],
  KMean: [KMeanData]
})

export {
  KMeanData,
  FormData
}
