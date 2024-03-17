import { MODEL_ACTION } from './model-action.factory'

describe('Model Crud', () => {
  it('can create label and key for models', () => {
    const createActionKey = MODEL_ACTION.CreateAction.key
    const createActionTitle = MODEL_ACTION.CreateAction.title

    expect(createActionKey).toBe('create-action')
    expect(createActionTitle).toBe('Create Action')

    const updateActionKey = MODEL_ACTION.UpdateAction.key
    const updateActionTitle = MODEL_ACTION.UpdateAction.title

    expect(updateActionKey).toBe('update-action')
    expect(updateActionTitle).toBe('Update Action')

    const deleteActionKey = MODEL_ACTION.DeleteAction.key
    const deleteActionTitle = MODEL_ACTION.DeleteAction.title

    expect(deleteActionKey).toBe('delete-action')
    expect(deleteActionTitle).toBe('Delete Action')
  })
})
