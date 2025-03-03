import { role, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";

// Temporary data for payroll
const payrollData = [
  ...teachersData.map(teacher => ({
    id: teacher.id,
    staffId: teacher.teacherId,
    name: teacher.name,
    role: "Teacher",
    department: teacher.subjects[0],
    monthlySalary: 5000,
    paidAmount: Math.random() > 0.5 ? 5000 : 0
  })),
  // Adding some sample staff members
  {
    id: 11,
    staffId: "CLEAN001",
    name: "Sarah Johnson",
    role: "Cleaner",
    department: "Maintenance",
    monthlySalary: 2500,
    paidAmount: 2500
  },
  {
    id: 12,
    staffId: "COOK001",
    name: "Michael Chen",
    role: "Cook",
    department: "Kitchen",
    monthlySalary: 3000,
    paidAmount: 0
  },
  {
    id: 13,
    staffId: "SEC001",
    name: "Emily Davis",
    role: "Secretary",
    department: "Administration",
    monthlySalary: 3500,
    paidAmount: 3500
  }
];

type Payroll = {
  id: number;
  staffId: string;
  name: string;
  role: string;
  department: string;
  monthlySalary: number;
  paidAmount: number;
};

const columns = [
  {
    header: "Staff Info",
    accessor: "info",
  },
  {
    header: "Role",
    accessor: "role",
    className: "hidden md:table-cell",
  },
  {
    header: "Department",
    accessor: "department",
    className: "hidden md:table-cell",
  },
  {
    header: "Monthly Salary",
    accessor: "monthlySalary",
    className: "hidden md:table-cell",
  },
  {
    header: "Paid Amount",
    accessor: "paidAmount",
    className: "hidden md:table-cell",
  },
  {
    header: "Status",
    accessor: "status",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const PayrollPage = () => {
  const renderRow = (item: Payroll) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">ID: {item.staffId}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.role}</td>
      <td className="hidden md:table-cell">{item.department}</td>
      <td className="hidden md:table-cell">${item.monthlySalary}</td>
      <td className="hidden md:table-cell">${item.paidAmount}</td>
      <td>
        <span className={`px-2 py-1 rounded-full text-xs ${
          item.paidAmount > 0
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {item.paidAmount > 0 ? "Paid" : "Not Paid"}
        </span>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/finance/payroll/payslip/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/printer.png" alt="" width={16} height={16} />
            </button>
          </Link>
          <Link href={`/list/finance/payroll/pay/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaBlue">
              <Image src="/more.png" alt="" width={16} height={16} />
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
        <h1 className="text-2xl font-semibold">Payroll Management</h1>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-lamaRed rounded-md text-sm font-medium">
            Generate Report
          </button>
          <Link href="/list/finance/payroll/create">
            <button className="px-4 py-2 bg-lamaBlue text-white rounded-md text-sm font-medium">
              Create Salary
            </button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600 mb-2">Total Salaries</h3>
          <p className="text-2xl font-semibold">$45,678</p>
          <p className="text-sm text-blue-600 mt-1">This Month</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-green-600 mb-2">Paid Salaries</h3>
          <p className="text-2xl font-semibold">$32,456</p>
          <p className="text-sm text-green-600 mt-1">This Month</p>
        </div>
        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-red-600 mb-2">Pending Payments</h3>
          <p className="text-2xl font-semibold">$13,222</p>
          <p className="text-sm text-red-600 mt-1">This Month</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link href="/list/finance/payroll/payslips" className="group">
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-lamaPurple transition-all duration-200 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Image src="/printer.png" alt="" width={24} height={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-1">Pay Slips</h2>
                <p className="text-gray-600 text-sm">Generate and print pay slips for all staff</p>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 ml-auto transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </Link>
        <Link href="/list/finance/payroll/bulk-pay" className="group">
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-lamaPurple transition-all duration-200 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Image src="/save-money.png" alt="" width={24} height={24} className="text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-1">Bulk Payment</h2>
                <p className="text-gray-600 text-sm">Process multiple salary payments at once</p>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 ml-auto transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* Table */}
      <div className="flex items-center justify-between mb-4">
        <TableSearch />
      </div>
      <Table columns={columns} renderRow={renderRow} data={payrollData} />
      <Pagination />
    </div>
  );
};

export default PayrollPage;
