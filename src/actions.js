const name = `@@location`

export const types = {
  LOCATE:         `${name}/LOCATE`,
  LOCATE_REQUEST: `${name}/LOCATE_REQUEST`,
  LOCATE_SUCCESS: `${name}/LOCATE_SUCCESS`,
  LOCATE_FAILURE: `${name}/LOCATE_FAILURE`,

  INSERT:         `${name}/INSERT`,
  REMOVE:         `${name}/REMOVE`,
  UPDATE:         `${name}/UPDATE`,
}

const action = (type) => (payload) => ({ type, payload })

export const actions = {
  locate:         action(types.LOCATE),
  insert:         action(types.INSERT),
  remove:         action(types.REMOVE),
  update:         action(types.UPDATE),
}
