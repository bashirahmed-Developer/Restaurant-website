import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { 
  ClipboardList, 
  LogOut, 
  Crown, 
  RefreshCw, 
  Clock, 
  CheckCircle, 
  ChefHat, 
  Phone, 
  MapPin, 
  Search,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export default function AdminDashboard({ onLogout, onGoToWebsite }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Fetch orders from Supabase
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update status in Supabase (Pending -> Preparing -> Delivered)
  const handleStatusChange = async (orderId, newStatus) => {
    setStatusUpdatingId(orderId);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) {
        console.error('Failed to update status:', error);
        alert('Could not update status: ' + error.message);
        return;
      }

      setOrders((prev) =>
        prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
      );

      setToastMessage(`Order #${orderId} marked as ${newStatus}!`);
      setTimeout(() => setToastMessage(''), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    const matchesSearch = 
      (order.customer_name && order.customer_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (order.customer_phone && order.customer_phone.includes(searchQuery)) ||
      (order.id && order.id.toString().includes(searchQuery));
    return matchesStatus && matchesSearch;
  });

  const pendingCount = orders.filter((o) => (o.status || 'Pending') === 'Pending').length;
  const preparingCount = orders.filter((o) => o.status === 'Preparing').length;
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Preparing':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/40';
      case 'Delivered':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40';
      default:
        return 'bg-red-500/10 text-red-400 border-red-500/40';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-bounce">
          <CheckCircle className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================
          LEFT SIDEBAR (Orders, Logout) - Requirement
          ========================================= */}
      <aside className="w-full md:w-64 bg-neutral-950 border-r border-neutral-900 p-6 flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Brand */}
          <div className="flex items-center gap-3 pb-8 border-b border-neutral-900">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-700 to-rose-600 flex items-center justify-center shadow-lg shadow-red-700/40">
              <Crown className="w-5 h-5 text-white font-bold" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-white">Saltanat</h2>
              <p className="text-[10px] text-red-400 font-medium uppercase tracking-wider">Admin Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-2">
            <button
              onClick={() => setFilterStatus('All')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-red-950/60 border border-red-600/40 text-red-400 font-bold text-sm shadow-sm transition"
            >
              <div className="flex items-center gap-3">
                <ClipboardList className="w-4 h-4 text-red-500" />
                <span>Orders</span>
              </div>
              <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-black">
                {orders.length}
              </span>
            </button>

            <button
              onClick={onGoToWebsite}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 font-medium text-sm transition cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Go to Website</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer: Logout */}
        <div className="pt-6 border-t border-neutral-900">
          <div className="mb-4 px-2 text-xs text-neutral-400">
            <p className="text-neutral-500">Logged in as:</p>
            <p className="font-mono text-neutral-300 truncate">admin@restaurant.com</p>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-sm border border-rose-500/20 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =========================================
          RIGHT CONTENT: Orders, Total, Status Change
          ========================================= */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Saltanat Orders Management</h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Real-time orders synced directly with Supabase database.
            </p>
          </div>

          <button
            onClick={fetchOrders}
            disabled={loading}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-900/40 text-neutral-300 hover:text-white text-xs font-semibold transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-red-500' : ''}`} />
            <span>Refresh Orders</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
            <span className="text-xs text-neutral-400 block font-medium">Total Orders</span>
            <span className="text-2xl font-black text-white mt-1 block">{orders.length}</span>
          </div>

          <div className="bg-neutral-900 border border-red-500/30 p-5 rounded-2xl">
            <span className="text-xs text-red-400 block font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-500" /> Pending
            </span>
            <span className="text-2xl font-black text-red-400 mt-1 block">{pendingCount}</span>
          </div>

          <div className="bg-neutral-900 border border-blue-500/30 p-5 rounded-2xl">
            <span className="text-xs text-blue-400 block font-medium flex items-center gap-1.5">
              <ChefHat className="w-3.5 h-3.5 text-blue-500" /> Preparing
            </span>
            <span className="text-2xl font-black text-blue-400 mt-1 block">{preparingCount}</span>
          </div>

          <div className="bg-neutral-900 border border-emerald-500/30 p-5 rounded-2xl">
            <span className="text-xs text-emerald-400 block font-medium flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Delivered
            </span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">{deliveredCount}</span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {['All', 'Pending', 'Preparing', 'Delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  filterStatus === status
                    ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold shadow-md shadow-red-700/30'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, phone, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Orders Table / Cards */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin text-red-500 mx-auto" />
            <p className="text-sm text-neutral-400">Loading orders from Supabase...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900/50 rounded-3xl border border-neutral-800">
            <ClipboardList className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-neutral-300">No orders found</h3>
            <p className="text-xs text-neutral-500 mt-1">
              {orders.length === 0 
                ? 'No orders have been submitted yet. Go to the website and place a test order!' 
                : 'No orders match your filter criteria.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const currentStatus = order.status || 'Pending';
              const createdDate = order.created_at ? new Date(order.created_at).toLocaleString('en-PK', {
                dateStyle: 'medium',
                timeStyle: 'short',
              }) : 'Just now';

              let itemsList = [];
              if (Array.isArray(order.items)) {
                itemsList = order.items;
              } else if (typeof order.items === 'string') {
                try {
                  itemsList = JSON.parse(order.items);
                } catch {
                  itemsList = [{ name: order.items, quantity: 1, price: order.total_price }];
                }
              }

              return (
                <div
                  key={order.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 hover:border-red-950/60 transition shadow-lg"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                    
                    {/* Order ID & Time */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold bg-red-950/60 text-red-400 px-3 py-1 rounded-lg border border-red-800/40">
                        #{order.id}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <Clock className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{createdDate}</span>
                      </div>
                    </div>

                    {/* Status Dropdown - Core Requirement 6: Pending -> Preparing -> Delivered */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-neutral-400 font-medium">Order Status:</span>
                      
                      <div className="relative">
                        <select
                          value={currentStatus}
                          disabled={statusUpdatingId === order.id}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`appearance-none pl-3 pr-8 py-1.5 rounded-xl text-xs font-bold border cursor-pointer focus:outline-none transition ${getStatusBadgeStyle(
                            currentStatus
                          )}`}
                        >
                          <option value="Pending" className="bg-neutral-950 text-red-400 font-semibold">
                            Pending
                          </option>
                          <option value="Preparing" className="bg-neutral-950 text-blue-400 font-semibold">
                            Preparing
                          </option>
                          <option value="Delivered" className="bg-neutral-950 text-emerald-400 font-semibold">
                            Delivered
                          </option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400" />
                      </div>

                      {statusUpdatingId === order.id && (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-red-500" />
                      )}
                    </div>
                  </div>

                  {/* Order Details Body */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
                    
                    {/* Customer Info */}
                    <div className="md:col-span-4 space-y-2 text-xs">
                      <h4 className="font-bold text-white text-sm">{order.customer_name}</h4>
                      <p className="flex items-center gap-2 text-neutral-300">
                        <Phone className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                        <span>{order.customer_phone}</span>
                      </p>
                      <p className="flex items-start gap-2 text-neutral-400">
                        <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{order.customer_address}</span>
                      </p>
                    </div>

                    {/* Dishes Ordered */}
                    <div className="md:col-span-5 bg-black/60 p-3.5 rounded-xl border border-neutral-800/80">
                      <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                        Dishes Ordered
                      </span>
                      <div className="space-y-1.5 text-xs">
                        {itemsList.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-neutral-300">
                            <span>
                              {item.name} <strong className="text-red-400">x{item.quantity}</strong>
                            </span>
                            <span className="text-neutral-400">
                              Rs. {item.subtotal || (item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Total Amount */}
                    <div className="md:col-span-3 flex flex-col justify-center items-start md:items-end">
                      <span className="text-xs text-neutral-400 font-medium">Total Amount</span>
                      <span className="text-xl font-black text-red-500 mt-0.5">
                        Rs. {order.total_price}
                      </span>
                      <span className="text-[11px] text-emerald-400/90 mt-1">Cash on Delivery</span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>
    </div>
  );
}
