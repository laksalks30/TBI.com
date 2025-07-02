'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface Product {
  id: number;
  name: string;
  stock: number;
  categoryId: number;
  category: {
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const limit = 5;

  const totalPages = Math.ceil(total / limit);

  const fetchProducts = async () => {
    const res = await fetch(`/api/product?page=${page}&limit=${limit}&search=${search}`);
    const json = await res.json();
    setProducts(json.data);
    setTotal(json.total);
  };

  const fetchCategories = async () => {
    const res = await fetch('/api/category');
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [page, search]);

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) return;

    if (editId !== null) {
      // Update
      await fetch(`/api/product/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, stock, categoryId }),
      });
      setEditId(null);
    } else {
      // Create
      await fetch('/api/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, stock, categoryId }),
      });
    }

    setName('');
    setStock(0);
    setCategoryId(null);
    fetchProducts();
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/product/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setName(product.name);
    setStock(product.stock);
    setCategoryId(product.categoryId);
    setEditId(product.id);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editId ? 'Edit Product' : 'Tambah Product Baru'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Nama Produk"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              required
            />

            <Select
              value={categoryId?.toString() || ''}
              onValueChange={(value) => setCategoryId(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button type="submit" className="w-full">
              {editId ? 'Update Product' : 'Tambah Product'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Daftar Produk (Page {page} dari {totalPages})</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Cari nama produk..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.category?.name || '-'}</TableCell>
                  <TableCell className="space-x-2">
                    <Button size="sm" onClick={() => handleEdit(product)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>Hapus</Button>
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
