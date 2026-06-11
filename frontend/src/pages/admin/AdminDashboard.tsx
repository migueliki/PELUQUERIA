import React, { useEffect, useState } from "react";
import { fetchApi } from "../../services/api";
import { Calendar, Phone, User, Clock } from "lucide-react";

interface Appointment {
  id: number;
  full_name: string;
  phone: string;
  description: string;
  appointment_time: string;
}

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      const data = await fetchApi<Appointment[]>("/api/admin/appointments");
      setAppointments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadAppointments();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleLogout = async () => {
    // Implementar logout si se desea
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-4xl font-light tracking-tighter">GESTIÓN DE CITAS</h1>
            <p className="text-zinc-500 mt-2">Control de reservas en tiempo real</p>
          </div>
          <button onClick={handleLogout} className="text-zinc-400 hover:text-white transition-colors uppercase text-sm tracking-widest">Cerrar Sesión</button>
        </div>

        <div className="grid gap-6">
          {loading ? (
            <p className="text-center text-zinc-500 italic">Cargando reservas...</p>
          ) : appointments.length === 0 ? (
            <p className="text-center text-zinc-500 italic">No hay citas pendientes.</p>
          ) : (
            appointments.map((apt) => (
              <div key={apt.id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center hover:border-zinc-600 transition-all">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <User size={18} className="text-zinc-400" />
                    <span className="font-medium text-lg uppercase">{apt.full_name}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-zinc-400 text-sm">
                    <Phone size={16} />
                    <span>{apt.phone}</span>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end space-y-2">
                  <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <Calendar size={16} className="text-white" />
                    <span className="text-white font-mono">{new Date(apt.appointment_time).toLocaleDateString()}</span>
                    <Clock size={16} className="text-white ml-2" />
                    <span className="text-white font-mono">{new Date(apt.appointment_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                  <p className="text-zinc-500 text-xs italic max-w-md text-right">{apt.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
