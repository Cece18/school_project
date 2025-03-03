import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";

// Temporary data for expenses
const expensesData = [
  {
    id: 1,
    category: "Land Payment",
    date: "2024-03-15",
    summary: "Monthly land lease payment",
    account: "Bank",
    amount: 5000
  },
  {
    id: 2,
    category: "Taxes",
    date: "2024-03-10",
    summary: "Property tax payment",
    account: "Bank",
    amount: 2500
  },
  {
    id: 3,
    category: "Transportation",
    date: "2024-03-05",
    summary: "Bus fuel refill",
    account: "Bank",
    amount: 800
  },
  {
    id: 4,
    category: "Utilities",
    date: "2024-03-01",
    summary: "Electricity bill",
    account: "Bank",
    amount: 1200
  },
  {
    id: 5,
    category: "Maintenance",
    date: "2024-02-28",
    summary: "Building repairs",
    account: "Bank",
    amount: 3000
  }
];

type Expense = {
  id: number;
  category: string;
  date: string;
  summary: string;
  account: string;
  amount: number;
};

const columns = [
  {
    header: "Category",
    accessor: "category",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Summary",
    accessor: "summary",
    className: "hidden md:table-cell",
  },
  {
    header: "Account",
    accessor: "account",
    className: "hidden md:table-cell",
  },
  {
    header: "Amount",
    accessor: "amount",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const AccountingPage = () => {
  const renderRow = (item: Expense) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="p-4">
        <span className="font-medium">{item.category}</span>
      </td>
      <td className="hidden md:table-cell p-4">{item.date}</td>
      <td className="hidden md:table-cell p-4">{item.summary}</td>
      <td className="hidden md:table-cell p-4">{item.account}</td>
      <td className="p-4">${item.amount}</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <Link href={`/list/finance/accounting/expense/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/edit.png" alt="" width={16} height={16} />
            </button>
          </Link>
          <Link href={`/list/finance/accounting/expense/${item.id}/receipt`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaBlue">
              <Image src="/printer.png" alt="" width={16} height={16} />
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-6 rounded-md flex-1 m-4 mt-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Accounting</h1>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-lamaRed rounded-md text-sm font-medium">
            Generate Report
          </button>
          <Link href="/list/finance/accounting/expense/new">
            <button className="px-4 py-2 bg-lamaBlue text-white rounded-md text-sm font-medium">
              Add Expense
            </button>
          </Link>
        </div>
      </div>

      {/* Account Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600 mb-2">Bank Account</h3>
          <p className="text-2xl font-semibold">$25,678</p>
          <p className="text-sm text-blue-600 mt-1">Available Balance</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-green-600 mb-2">Cash Account</h3>
          <p className="text-2xl font-semibold">$5,432</p>
          <p className="text-sm text-green-600 mt-1">Available Balance</p>
        </div>
      </div>

      {/* Income Card */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Income Overview</h2>
          <Link href="/list/finance/accounting/income">
            <button className="text-lamaBlue text-sm font-medium hover:underline">
              View Income Statements
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-600 mb-1">Total Income</h3>
            <p className="text-xl font-semibold">$45,678</p>
            <p className="text-sm text-green-600">This Month</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-600 mb-1">Fees Collected</h3>
            <p className="text-xl font-semibold">$32,456</p>
            <p className="text-sm text-blue-600">This Month</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-600 mb-1">Other Income</h3>
            <p className="text-xl font-semibold">$13,222</p>
            <p className="text-sm text-purple-600">This Month</p>
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Expenses</h2>
        <TableSearch />
      </div>
      <Table columns={columns} renderRow={renderRow} data={expensesData} />
      <Pagination />
    </div>
  );
};

export default AccountingPage;
