import { BankType, AccountType } from "./types";

export class Bank implements BankType {
  private accounts: AccountType[] = [];
  private usernames: string[] = [];

  /**
   * Create a new Bank instance.
   * @param {AccountType[]} accounts The existing accounts.
   * @param {string[]} usernames The existing usernames.
   */
  public constructor(accounts: AccountType[], usernames: string[]) {
    this.accounts = accounts;
    this.usernames = usernames;
  }

  /**
   * Finds an account by ID.
   * @param {number} id The ID to search for.
   * @returns {AccountType|undefined} The account if found, otherwise undefined.
   */
  private findAccountById(id: number): AccountType | undefined {
    return this.accounts.find((account) => account.id === id);
  }

  /**
   * Determines if an account number is invalid.
   * @param {number} accountNumber The number to check.
   * @returns {boolean} True if the account number is invalid, false otherwise.
   */
  private isAccountNumberInvalid(accountNumber: number): boolean {
    return accountNumber.toString().length !== 10;
  }

  /**
   * Checks if a username is found in the list of usernames.
   * @param {string} username The username to check.
   * @returns {boolean} True if the username is found, false otherwise.
   */
  private isUsernameExisits(username: string): boolean {
    return this.usernames.includes(username);
  }

  /**
   * Creates a new account with the given username and account number.
   * @param {string} username The username.
   * @param {number} age The age of the user.
   * @param {number} accountNumber The account number.
   * @returns {AccountType} The newly created account.
   * @throws {Error} If the username or account number is invalid, the user is under 18, or the account already exists.
   */
  createAccount(
    username: string,
    age: number,
    accountNumber: number
  ): AccountType {
    if (this.isAccountNumberInvalid(accountNumber)) {
      throw new Error("Invalid account number");
    }
    if (!this.isUsernameExisits(username)) {
      throw new Error("User not found");
    }
    if (age < 18) {
      throw new Error("User is under 18");
    }
    if (this.findAccountById(accountNumber)) {
      throw new Error("Account already exists");
    }
    const account: AccountType = {
      id: accountNumber,
      balance: 0,
    };
    this.accounts.push(account);
    return account;
  }

  /**
   * Deposits a specified amount into the account with the given account ID.
   * @param {number} accountId The ID of the account to deposit into.
   * @param {number} amount The amount to deposit.
   * @returns {AccountType} The updated account after the deposit.
   * @throws {Error} If the account is not found or the deposit amount is invalid.
   */

  deposit(accountId: number, amount: number): AccountType {
    const account = this.findAccountById(accountId);
    if (!account) {
      throw new Error("Account not found");
    }
    if (amount <= 0) {
      throw new Error("Invalid deposit amount");
    }
    account.balance += amount;
    return account;
  }

  /**
   * Withdraws a specified amount from the account with the given account ID.
   * @param {number} accountId The ID of the account to withdraw from.
   * @param {number} amount The amount to withdraw.
   * @returns {AccountType} The updated account after the withdrawal.
   * @throws {Error} If the account is not found, the withdrawal amount is invalid, or there are insufficient funds.
   */
  withdraw(accountId: number, amount: number): AccountType {
    const account = this.findAccountById(accountId);
    if (!account) {
      throw new Error("Account not found");
    }
    if (amount <= 0) {
      throw new Error("Invalid withdrawal amount");
    }
    if (account.balance < amount) {
      throw new Error("Insufficient funds");
    }
    account.balance -= amount;
    return account;
  }

  /**
   * Gets the balance of the account with the given account ID.
   * @param {number} accountId The ID of the account to get the balance for.
   * @returns {number} The balance of the account.
   * @throws {Error} If the account is not found.
   */
  getBalance(accountId: number): number {
    const account = this.findAccountById(accountId);
    if (!account) {
      throw new Error("Account not found");
    }
    return account.balance;
  }
}
