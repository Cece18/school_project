import { role, studentsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";

// Temporary data for fees
const feesData = studentsData.map(student => {
  const totalFees = 5000;
  const paidFees = Math.floor(Math.random() * 5000);
  const remainingFees = totalFees - paidFees;
  
  let status;
  if (paidFees === 0) {
    status = "Pending";
  } else if (paidFees === totalFees) {
    status = "Paid";
  } else {
    status = "Partially Paid";
  }

  return {
    id: student.id,
    studentId: student.studentId,
    name: student.name,
    class: student.class,
    totalFees,
    paidFees,
    remainingFees,
    lastPayment: "2024-03-15",
    status
  };
});

type Fee = {
  id: number;
  studentId: string;
  name: string;
  class: string;
  totalFees: number;
  paidFees: number;
  remainingFees: number;
  lastPayment: string;
  status: string;
};

const columns = [
  {
    header: "Student Info",
    accessor: "info",
  },
  {
    header: "Total Fees",
    accessor: "totalFees",
    className: "hidden md:table-cell",
  },
  {
    header: "Paid",
    accessor: "paidFees",
    className: "hidden md:table-cell",
  },
  {
    header: "Remaining",
    accessor: "remainingFees",
    className: "hidden md:table-cell",
  },
  {
    header: "Last Payment",
    accessor: "lastPayment",
    className: "hidden lg:table-cell",
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

const FeesPage = () => {
  const renderRow = (item: Fee) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">${item.totalFees}</td>
      <td className="hidden md:table-cell">${item.paidFees}</td>
      <td className="hidden md:table-cell">${item.remainingFees}</td>
      <td className="hidden lg:table-cell">{item.lastPayment}</td>
      <td>
        <span className={`px-2 py-1 rounded-full text-xs ${
          item.status === "Paid" 
            ? "bg-green-100 text-green-800" 
            : item.status === "Partially Paid"
            ? "bg-blue-100 text-blue-800"
            : "bg-yellow-100 text-yellow-800"
        }`}>
          {item.status}
        </span>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/finance/fees/slips/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/printer.png" alt="" width={16} height={16} />
            </button>
          </Link>
          <Link href={`/list/messages/new?to=${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaBlue">
              <Image src="/message.png" alt="" width={16} height={16} />
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
        <h1 className="text-2xl font-semibold">Fees Management</h1>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-lamaRed rounded-md text-sm font-medium">
            Generate Report
          </button>
          <button className="px-4 py-2 bg-lamaBlue text-white rounded-md text-sm font-medium">
            Add Payment
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600 mb-2">Total Fees Owed</h3>
          <p className="text-2xl font-semibold">$45,678</p>
          <p className="text-sm text-red-600 mt-1">+5% from last semester</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-green-600 mb-2">Total Fees Paid</h3>
          <p className="text-2xl font-semibold">$32,456</p>
          <p className="text-sm text-green-600 mt-1">+12% from last semester</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-purple-600 mb-2">Outstanding Balance</h3>
          <p className="text-2xl font-semibold">$13,222</p>
          <p className="text-sm text-red-600 mt-1">-8% from last semester</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link href="/list/finance/fees/slips" className="group">
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-lamaPurple transition-all duration-200 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Image src="/printer.png" alt="" width={24} height={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-1">Fee Slips</h2>
                <p className="text-gray-600 text-sm">Generate and print fee slips for all students</p>
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
        <Link href="/list/messages/new" className="group">
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-lamaPurple transition-all duration-200 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Image src="/message.png" alt="" width={24} height={24} className="text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-1">Send Message</h2>
                <p className="text-gray-600 text-sm">Send payment reminders to parents</p>
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
      <Table columns={columns} renderRow={renderRow} data={feesData} />
      <Pagination />
    </div>
  );
};

export default FeesPage;
