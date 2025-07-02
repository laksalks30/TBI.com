'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

interface Product {
  id: number;
  name: string;
}

interface StockOut {
  id: number;
  quantity: number;
  productId: number;
  product: {
    name: string;
  };
}

export default function StockOutPage() {
  const [stockOuts, setStockOuts] = useState<StockOut[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [editId, setEditId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const limit = 5;
  const totalPages = Math.ceil(total / limit);

  const fetchStockOuts = async () => {
    const res = await fetch(`/api/stockout?page=${page}&limit=${limit}&search=${search}`);
    const json = await res.json();
    setStockOuts(json.data);
    setTotal(json.total);
  };

  const fetchProducts = async () => {
    const res = await fetch('/api/product');
    const data = await res.json();
    setProducts(data.data); // ✅ Sesuai struktur API product kamu
  };

  useEffect(() => {
    fetchStockOuts();
    fetchProducts();
  }, [page, search]);

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || quantity <= 0) return;

    if (editId !== null) {
      // Update
      await fetch(`/api/stockout/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity, productId }),
      });
      setEditId(null);
    } else {
      // Create
      await fetch('/api/stockout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity, productId }),
      });
    }

    setQuantity(0);
    setProductId(null);
    fetchStockOuts();
  };

  const handleEdit = (item: StockOut) => {
    setQuantity(item.quantity);
    setProductId(item.productId);
    setEditId(item.id);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/stockout/${id}`, { method: 'DELETE' });
    fetchStockOuts();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editId ? 'Edit Barang Keluar' : 'Tambah Barang Keluar'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select
              value={productId?.toString() || ''}
              onValueChange={(value) => setProductId(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Produk" />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.id} value={p.id.toString()}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Jumlah Barang Keluar"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />

            <Button type="submit" className="w-full">
              {editId ? 'Update Stock Out' : 'Tambah Stock Out'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Data Barang Keluar (Page {page} dari {totalPages})</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Cari berdasarkan nama produk..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockOuts.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product?.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="space-x-2">
                    <Button size="sm" onClick={() => handleEdit(item)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>Hapus</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
