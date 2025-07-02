'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DashboardPage() {
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalStockIn, setTotalStockIn] = useState(0);
  const [totalStockOut, setTotalStockOut] = useState(0);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [stockIns, setStockIns] = useState<any[]>([]);
  const [stockOuts, setStockOuts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);


  const fetchDashboardData = async () => {
  const [productRes, stockInRes, stockOutRes, userRes, categoryRes] = await Promise.all([
    fetch('/api/product'),
    fetch('/api/stockin'),
    fetch('/api/stockout'),
    fetch('/api/user'),
    fetch('/api/category'),
  ]);

  const products = await productRes.json();
  const stockIns = await stockInRes.json();
  const stockOuts = await stockOutRes.json();
  const users = await userRes.json();
  const categories = await categoryRes.json();

  setProducts(products.data);
  setStockIns(stockIns.data);
  setStockOuts(stockOuts.data);
  setUsers(users.data);

  // Update untuk Chart Pie
  const categoryCount = categories.map((cat: any) => ({
    name: cat.name,
    value: products.data.filter((p: any) => p.categoryId === cat.id).length,
  }));
  setCategoryData(categoryCount);

  setTotalProduct(products.data.length);
  setTotalStockIn(stockIns.data.reduce((acc: number, item: any) => acc + item.quantity, 0));
  setTotalStockOut(stockOuts.data.reduce((acc: number, item: any) => acc + item.quantity, 0));
};

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Inventaris</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalProduct}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Barang Masuk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalStockIn}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Barang Keluar</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalStockOut}</p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Pie Chart: Distribusi Produk per Kategori */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Produk per Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart: Perbandingan In / Out */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Perbandingan Stok Masuk vs Keluar</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: 'Masuk', jumlah: totalStockIn },
                  { name: 'Keluar', jumlah: totalStockOut },
                ]}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="jumlah" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Separator />s
      <h2 className="text-2xl font-bold mt-6">Ringkasan Data</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Tabel Product */}
        <Card>
          <CardHeader>
            <CardTitle>Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Kategori</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.slice(0, 5).map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        {product.category?.name || 'Tidak Ada Kategori'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Tabel Stock In */}
        <Card>
          <CardHeader>
            <CardTitle>Barang Masuk</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produk</TableHead>
                    <TableHead>Jumlah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockIns.slice(0, 5).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Tabel Stock Out */}
        <Card>
          <CardHeader>
            <CardTitle>Barang Keluar</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produk</TableHead>
                    <TableHead>Jumlah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockOuts.slice(0, 5).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Tabel User */}
        <Card>
          <CardHeader>
            <CardTitle>User</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.slice(0, 5).map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

    </div>
    
  );
}
