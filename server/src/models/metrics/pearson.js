'use strict'

/** pearson :: Number -> Blog -> Blog -> Number */
const pearson = numOfWords => blogA => blogB => {
  let sumA, sumB, sumAsq, sumBsq, pSum, cntA, cntB
  sumA = sumB = sumAsq = sumBsq = pSum = 0

  // sum up the word counts for each blog
  for (let i = 0; i < numOfWords; i++) {
    cntA = blogA.wordCount[i]
    cntB = blogB.wordCount[i]
    sumA += cntA
    sumB += cntB
    sumAsq += cntA ** 2
    sumBsq += cntB ** 2
    pSum += cntA * cntB
  }

  const num = pSum - (sumA * sumB) / numOfWords
  const den = Math.sqrt (
    (sumAsq - sumA ** 2 / numOfWords) * (sumBsq - sumB ** 2 / numOfWords)
  )

  // Invert the pearson score
  return 1 - num / den
}

module.exports = pearson
