import { MODEL_CRUD } from './model-crud.constant'

describe('Model Crud', () => {
  it('can create label and key for models', () => {
    const createActionKey = MODEL_CRUD.models.Action.Create.key
    const createActionTitle = MODEL_CRUD.models.Action.Create.title

    expect(createActionKey).toBe('create-action')
    expect(createActionTitle).toBe('Create Action')

    const updateActionKey = MODEL_CRUD.models.Action.Update.key
    const updateActionTitle = MODEL_CRUD.models.Action.Update.title

    expect(updateActionKey).toBe('update-action')
    expect(updateActionTitle).toBe('Update Action')

    const deleteActionKey = MODEL_CRUD.models.Action.Delete.key
    const deleteActionTitle = MODEL_CRUD.models.Action.Delete.title

    expect(deleteActionKey).toBe('delete-action')
    expect(deleteActionTitle).toBe('Delete Action')
  })
})
