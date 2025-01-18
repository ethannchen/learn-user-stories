export type AccountType = {
  id: number;
  balance: number;
};

export interface BankType {
  createAccount(
    username: string,
    age: number,
    accountNumber: number
  ): AccountType;
  deposit(accountId: number, amount: number): AccountType;
  withdraw(accountId: number, amount: number): AccountType;
  getBalance(accountId: number): number;
}
