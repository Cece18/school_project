import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const FinancePage = () => {
  const financeSections = [
    {
      title: "Fees Management",
      description: "Manage student fees, payments, and financial records",
      icon: "/finance.png",
      href: "/list/finance/fees",
      color: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Payroll",
      description: "Handle staff salaries, deductions, and payment schedules",
      icon: "/finance.png",
      href: "/list/finance/payroll",
      color: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Accounting",
      description: "Track expenses, revenue, and financial reports",
      icon: "/finance.png",
      href: "/list/finance/accounting",
      color: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Finance Dashboard</h1>
        {(role === "admin" || role === "financeadmin") && (
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-lamaBlue rounded-md text-sm font-medium">
              Generate Report
            </button>
            <button className="px-4 py-2 bg-lamaYellow text-white rounded-md text-sm font-medium">
              Add Transaction
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {financeSections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="group block p-6 rounded-lg border border-gray-200 hover:border-lamaPurple transition-all duration-200 hover:shadow-md"
          >
            <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center mb-4`}>
              <Image
                src={section.icon}
                alt={section.title}
                width={24}
                height={24}
                className={section.textColor}
              />
            </div>
            <h2 className="text-lg font-semibold mb-2">{section.title}</h2>
            <p className="text-gray-600 text-sm">{section.description}</p>
            <div className="mt-4 flex items-center text-sm font-medium text-lamaPurple">
              View Details
              <svg
                className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
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
          </Link>
        ))}
      </div>

      {/* Quick Stats Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600 mb-2">Total Revenue</h3>
          <p className="text-2xl font-semibold">$45,678</p>
          <p className="text-sm text-green-600 mt-1">+12% from last month</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-green-600 mb-2">Total Expenses</h3>
          <p className="text-2xl font-semibold">$32,456</p>
          <p className="text-sm text-red-600 mt-1">-5% from last month</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-purple-600 mb-2">Net Balance</h3>
          <p className="text-2xl font-semibold">$13,222</p>
          <p className="text-sm text-green-600 mt-1">+8% from last month</p>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;