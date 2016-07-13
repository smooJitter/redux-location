const configSelect = () => {
  const docsNumber = (state) => state.docs.length
  const first = (state) => state.docs[0] || {}

  return { docsNumber, first }
}

export const select = configSelect()
