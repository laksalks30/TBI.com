'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Product {
  id: number;
  name: string;
}

interface StockIn {
  id: number;
  productId: number;
  quantity: number;
  supplier: string;
  date: string;
  product: {
    name: string;
  };
}

export default function StockInPage() {
  const [stockIns, setStockIns] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const fetchStockIns = async () => {
    const res = await fetch(`/api/stockin?page=${page}&limit=${limit}`);
    const json = await res.json();
    setStockIns(json.data);
    setTotal(json.total);
  };

  useEffect(() => {
    fetchStockIns();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Stock In (Page {page} of {totalPages})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Produk</TableHead>
                <TableHead>Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockIns.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product?.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
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
