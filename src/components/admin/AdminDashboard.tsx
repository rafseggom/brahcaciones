import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';
import type { Alojamiento } from '@/types/alojamiento';
import { getAlojamientos, deleteAlojamiento } from '@/lib/alojamientos';
import { AlojamientoForm } from './AlojamientoForm';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export const AdminDashboard: React.FC = () => {
  const [alojamientos, setAlojamientos] = useState<Alojamiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlojamiento, setSelectedAlojamiento] = useState<Alojamiento | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchAlojamientos = async () => {
    setLoading(true);
    const data = await getAlojamientos();
    setAlojamientos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAlojamientos();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este alojamiento?')) {
      const success = await deleteAlojamiento(id);
      if (success) {
        toast.success('Alojamiento eliminado');
        fetchAlojamientos();
      } else {
        toast.error('Error al eliminar el alojamiento');
      }
    }
  };

  const handleEdit = (alojamiento: Alojamiento) => {
    setSelectedAlojamiento(alojamiento);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedAlojamiento(undefined);
    setIsDialogOpen(true);
  };

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
    fetchAlojamientos();
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" /> Añadir Alojamiento
          </Button>
          <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>
                {selectedAlojamiento ? 'Editar Alojamiento' : 'Nuevo Alojamiento'}
              </DialogTitle>
            </DialogHeader>
            <AlojamientoForm 
              alojamiento={selectedAlojamiento} 
              onSuccess={handleFormSuccess}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableCaption>Lista de alojamientos disponibles.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Hab.</TableHead>
              <TableHead className="text-center">Características</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : alojamientos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  No hay alojamientos registrados.
                </TableCell>
              </TableRow>
            ) : (
              alojamientos.map((alojamiento) => (
                <TableRow key={alojamiento.id}>
                  <TableCell className="font-medium">
                    {alojamiento.title}
                    {alojamiento.link && (
                      <a 
                        href={alojamiento.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 inline-block text-blue-500 hover:text-blue-700"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </TableCell>
                  <TableCell>{alojamiento.price || '-'}</TableCell>
                  <TableCell>{alojamiento.rooms || 0}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-1">
                      {alojamiento.has_pool && <span title="Piscina">🏊</span>}
                      {alojamiento.has_bbq && <span title="Barbacoa">🔥</span>}
                      {alojamiento.near_beach && <span title="Playa">🏖️</span>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(alojamiento)}>
                        <Pencil size={16} />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDelete(alojamiento.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
