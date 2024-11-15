import React from 'react';
import { BarChart2, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <div className="flex gap-3">
          <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Custom range</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-blue-50 p-3 rounded-lg">
              <BarChart2 className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+12%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-4xl font-semibold text-gray-900">156</h3>
            <p className="mt-1 text-sm text-gray-500">Total Repairs</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-green-50 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+8%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-4xl font-semibold text-gray-900">$12.5k</h3>
            <p className="mt-1 text-sm text-gray-500">Revenue</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-purple-50 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+15%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-4xl font-semibold text-gray-900">89</h3>
            <p className="mt-1 text-sm text-gray-500">New Customers</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="bg-orange-50 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+5%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-4xl font-semibold text-gray-900">92%</h3>
            <p className="mt-1 text-sm text-gray-500">Satisfaction Rate</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Services</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Screen Replacement</span>
              <div className="w-2/3">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900">75%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Battery Replacement</span>
              <div className="w-2/3">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-600 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900">60%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Device Types</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Smartphones</span>
              <div className="w-2/3">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-600 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900">80%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Computers</span>
              <div className="w-2/3">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-600 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900">20%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}