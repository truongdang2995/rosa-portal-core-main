
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ArrowDown, ArrowUp, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  // Mock data for transaction statistics
  const transactionData = {
    total: 15782,
    successful: 14235,
    failed: 1547,
    successRate: 90.2,
    comparedToYesterday: 5.3,
  };

  // Mock data for error codes
  const errorCodesData = [
    { name: 'ERR-1001', count: 423, change: 12 },
    { name: 'ERR-2045', count: 318, change: 35 },
    { name: 'ERR-3012', count: 275, change: -5 },
    { name: 'ERR-4230', count: 198, change: 8 },
    { name: 'ERR-5002', count: 135, change: -2 },
  ];

  // Mock data for hourly transactions
  const hourlyData = [
    { hour: '00:00', transactions: 342, success: 320, failed: 22 },
    { hour: '01:00', transactions: 285, success: 265, failed: 20 },
    { hour: '02:00', transactions: 231, success: 210, failed: 21 },
    { hour: '03:00', transactions: 198, success: 180, failed: 18 },
    { hour: '04:00', transactions: 165, success: 150, failed: 15 },
    { hour: '05:00', transactions: 226, success: 204, failed: 22 },
    { hour: '06:00', transactions: 387, success: 360, failed: 27 },
    { hour: '07:00', transactions: 698, success: 648, failed: 50 },
    { hour: '08:00', transactions: 1245, success: 1145, failed: 100 },
    { hour: '09:00', transactions: 1532, success: 1432, failed: 100 },
    { hour: '10:00', transactions: 1621, success: 1502, failed: 119 },
    { hour: '11:00', transactions: 1487, success: 1387, failed: 100 },
    { hour: '12:00', transactions: 1354, success: 1254, failed: 100 },
    { hour: '13:00', transactions: 1432, success: 1323, failed: 109 },
    { hour: '14:00', transactions: 1532, success: 1402, failed: 130 },
    { hour: '15:00', transactions: 1498, success: 1368, failed: 130 },
    { hour: '16:00', transactions: 1387, success: 1267, failed: 120 },
    { hour: '17:00', transactions: 1298, success: 1188, failed: 110 },
    { hour: '18:00', transactions: 1124, success: 1024, failed: 100 },
    { hour: '19:00', transactions: 987, success: 907, failed: 80 },
    { hour: '20:00', transactions: 876, success: 816, failed: 60 },
    { hour: '21:00', transactions: 765, success: 705, failed: 60 },
    { hour: '22:00', transactions: 654, success: 604, failed: 50 },
    { hour: '23:00', transactions: 498, success: 458, failed: 40 },
  ];
  
  // Mock data for error type distribution
  const errorTypeData = [
    { name: 'Network', value: 45 },
    { name: 'Authentication', value: 25 },
    { name: 'Timeout', value: 15 },
    { name: 'Permission', value: 10 },
    { name: 'Other', value: 5 },
  ];
  
  // Colors for the pie chart
  const COLORS = ['#ec4899', '#f472b6', '#f9a8d4', '#fbcfe8', '#fce7f3'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-pink-700 dark:text-pink-400">Dashboard</h1>
      
      {/* Transaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-pink-100 dark:border-pink-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium text-muted-foreground">Tổng số giao dịch</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-pink-700 dark:text-pink-400">{transactionData.total.toLocaleString()}</div>
              <div className="flex items-center text-sm">
                {transactionData.comparedToYesterday > 0 ? (
                  <>
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">{transactionData.comparedToYesterday}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-red-500">{Math.abs(transactionData.comparedToYesterday)}%</span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-pink-100 dark:border-pink-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium text-muted-foreground">Số giao dịch thành công</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-green-600">{transactionData.successful.toLocaleString()}</div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-1" />
                <span>{transactionData.successRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-pink-100 dark:border-pink-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium text-muted-foreground">Số giao dịch thất bại</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-red-500">{transactionData.failed.toLocaleString()}</div>
              <div className="flex items-center text-red-500">
                <XCircle className="h-5 w-5 mr-1" />
                <span>{(100 - transactionData.successRate).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Transaction Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-pink-100 dark:border-pink-800/30">
          <CardHeader>
            <CardTitle>Giao dịch theo giờ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f9a8d4" opacity={0.2} />
                  <XAxis dataKey="hour" stroke="#f472b6" />
                  <YAxis stroke="#f472b6" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      borderColor: '#f472b6',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="success" 
                    name="Thành công" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="failed" 
                    name="Thất bại" 
                    stroke="#ef4444" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-pink-100 dark:border-pink-800/30">
          <CardHeader>
            <CardTitle>Phân bổ lỗi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={errorTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {errorTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Tỷ lệ']}
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      borderColor: '#f472b6',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Error Codes */}
      <Card className="border-pink-100 dark:border-pink-800/30">
        <CardHeader>
          <CardTitle>Mã lỗi phổ biến</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={errorCodesData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f9a8d4" opacity={0.2} />
                <XAxis dataKey="name" stroke="#f472b6" />
                <YAxis stroke="#f472b6" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderColor: '#f472b6',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="count" 
                  name="Số lượng" 
                  fill="#ec4899" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 text-pink-700 dark:text-pink-400">Mã lỗi tăng đột biến</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {errorCodesData
                .filter(code => code.change > 20)
                .map(code => (
                  <Card key={code.name} className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/30">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{code.name}</div>
                        <div className="text-sm text-muted-foreground">{code.count} lỗi</div>
                      </div>
                      <div className="flex items-center text-red-500">
                        <AlertTriangle className="h-5 w-5 mr-1" />
                        <span>+{code.change}%</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
