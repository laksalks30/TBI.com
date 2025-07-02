'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface Category {
  id: number;
  name: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const fetchCategories = async () => {
    const res = await fetch('/api/category');
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { name };

    if (editId !== null) {
      await fetch(`/api/category/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setEditId(null);
    } else {
      await fetch('/api/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    setName('');
    fetchCategories();
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/category/${id}`, { method: 'DELETE' });
    fetchCategories();
  };

  const handleEdit = (category: Category) => {
    setName(category.name);
    setEditId(category.id);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Manajemen Kategori</h1>

      <Card>
        <CardHeader>
          <CardTitle>{editId !== null ? 'Edit Kategori' : 'Tambah Kategori'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nama Kategori</Label>
              <Input
                id="name"
                placeholder="Nama kategori"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <Button type="submit">
              {editId !== null ? 'Update' : 'Tambah'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {categories.map((category) => (
          <Card key={category.id} className="flex justify-between items-center p-4">
            <div>
              <p className="font-medium">{category.name}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => handleEdit(category)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(category.id)}>
                Hapus
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
