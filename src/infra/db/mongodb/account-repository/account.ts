import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const accountId = result.insertedId
    const account = await accountCollection.findOne(accountId)
    const { _id, ...accountWithoutId } = account
    return {
      id: _id.toString(),
      name: accountWithoutId.name,
      email: accountWithoutId.email,
      password: accountWithoutId.password
    }
  }
}
