import {
  activationFailure,
  activationRequest,
  activationSuccess,
} from '../../store/ducks/repositories/activation/actions'
import activation, {
  DEFAULT_VALUES,
} from '../../store/ducks/repositories/activation/reducer'

describe('Activation (Reducer)', () => {
  it('activationRequest', () => {
    const state = activation(
      DEFAULT_VALUES,
      activationRequest({
        token: 'TOKEN',
      })
    )

    expect(state).toStrictEqual({ loading: true })
  })

  it('activationSuccess', () => {
    const state = activation(DEFAULT_VALUES, activationSuccess())

    expect(state).toStrictEqual({ loading: false })
  })

  it('activationFailure', () => {
    const state = activation(DEFAULT_VALUES, activationFailure())

    expect(state).toStrictEqual({ loading: false })
  })

  it('DEFAULT', () => {
    const state = activation(undefined, {})

    expect(state).toStrictEqual(DEFAULT_VALUES)
  })
})
