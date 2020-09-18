import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  // Esse "getBalance()" eu tive que ver o video :(
  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (total: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            total.income += transaction.value; // eslint-disable-line
            break;
          case 'outcome':
            total.outcome += transaction.value; // eslint-disable-line
            break;
          default:
            break;
        }

        return total;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
