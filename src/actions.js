const name = `@@location`

export const types = {
  LOCATE_DELAYED:         `${name}/LOCATE_DELAYED`,
  LOCATE_DELAYED_REQUEST: `${name}/LOCATE_DELAYED_REQUEST`,

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
  locateDelayed:  action(types.LOCATE_DELAYED),
  insert:         action(types.INSERT),
  remove:         action(types.REMOVE),
  update:         action(types.UPDATE),
}
