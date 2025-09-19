import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, BarChart3, Users, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Destination, Booking } from '../types';

interface AdminPageProps {
  onViewChange: (view: string) => void;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    userId: '2',
    destinationId: '1',
    checkIn: '2024-02-15',
    checkOut: '2024-02-20',
    guests: 2,
    totalPrice: 598,
    status: 'confirmed',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    userId: '2',
    destinationId: '2',
    checkIn: '2024-03-01',
    checkOut: '2024-03-05',
    guests: 4,
    totalPrice: 1396,
    status: 'pending',
    createdAt: '2024-01-20'
  }
];

const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Riyadh - Kingdom Centre',
    nameAr: 'الرياض - برج المملكة',
    description: 'Modern capital with stunning architecture and rich culture',
    descriptionAr: 'العاصمة العصرية بهندسة معمارية مذهلة وثقافة غنية',
    image: 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 299,
    rating: 4.8,
    category: 'modern'
  },
  {
    id: '2',
    name: 'Jeddah Historic District',
    nameAr: 'جدة التاريخية',
    description: 'UNESCO World Heritage site with traditional architecture',
    descriptionAr: 'موقع التراث العالمي لليونسكو بالهندسة المعمارية التقليدية',
    image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 349,
    rating: 4.9,
    category: 'historical'
  }
];

const AdminPage: React.FC<AdminPageProps> = ({ onViewChange }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'destinations' | 'bookings'>('dashboard');
  const [destinations, setDestinations] = useState<Destination[]>(mockDestinations);
  const [bookings] = useState<Booking[]>(mockBookings);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [isAddingDestination, setIsAddingDestination] = useState(false);

  const stats = [
    {
      icon: MapPin,
      label: language === 'ar' ? 'الوجهات' : 'Destinations',
      value: destinations.length,
      color: 'bg-blue-500'
    },
    {
      icon: Calendar,
      label: language === 'ar' ? 'الحجوزات' : 'Bookings',
      value: bookings.length,
      color: 'bg-green-500'
    },
    {
      icon: Users,
      label: language === 'ar' ? 'العملاء' : 'Customers',
      value: '1.2K',
      color: 'bg-purple-500'
    },
    {
      icon: BarChart3,
      label: language === 'ar' ? 'الإيرادات' : 'Revenue',
      value: '$45.2K',
      color: 'bg-amber-500'
    }
  ];

  const handleSaveDestination = (destination: Destination) => {
    if (editingDestination) {
      setDestinations(destinations.map(d => d.id === destination.id ? destination : d));
    } else {
      const newDestination = { ...destination, id: Date.now().toString() };
      setDestinations([...destinations, newDestination]);
    }
    setEditingDestination(null);
    setIsAddingDestination(false);
  };

  const handleDeleteDestination = (id: string) => {
    if (window.confirm(language === 'ar' ? 'هل تريد حذف هذه الوجهة؟' : 'Are you sure you want to delete this destination?')) {
      setDestinations(destinations.filter(d => d.id !== id));
    }
  };

  const DestinationForm: React.FC<{ 
    destination?: Destination; 
    onSave: (destination: Destination) => void; 
    onCancel: () => void; 
  }> = ({ destination, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Destination>(destination || {
      id: '',
      name: '',
      nameAr: '',
      description: '',
      descriptionAr: '',
      image: '',
      price: 0,
      rating: 4.0,
      category: 'modern'
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-6">
              {destination ? t('admin.edit') : t('admin.add')} {language === 'ar' ? 'وجهة' : 'Destination'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ar' ? 'الاسم (إنجليزي)' : 'Name (English)'}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ar' ? 'الاسم (عربي)' : 'Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={formData.nameAr}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
                </label>
                <textarea
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ar' ? 'السعر' : 'Price'} ($)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ar' ? 'التقييم' : 'Rating'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ar' ? 'الفئة' : 'Category'}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Destination['category'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  >
                    <option value="modern">{language === 'ar' ? 'عصري' : 'Modern'}</option>
                    <option value="historical">{language === 'ar' ? 'تاريخي' : 'Historical'}</option>
                    <option value="religious">{language === 'ar' ? 'ديني' : 'Religious'}</option>
                    <option value="nature">{language === 'ar' ? 'طبيعي' : 'Nature'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'رابط الصورة' : 'Image URL'}
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  <span>{t('admin.save')}</span>
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex items-center space-x-2 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                  <span>{t('admin.cancel')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('admin.dashboard')}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' ? 'إدارة المحتوى والحجوزات' : 'Manage content and bookings'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'dashboard', label: language === 'ar' ? 'لوحة المراقبة' : 'Dashboard' },
                { key: 'destinations', label: t('admin.destinations') },
                { key: 'bookings', label: t('admin.bookings') }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.key
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'ar' ? 'الحجوزات الحديثة' : 'Recent Bookings'}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        {language === 'ar' ? 'المعرف' : 'ID'}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        {language === 'ar' ? 'الوصول' : 'Check-in'}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        {language === 'ar' ? 'الضيوف' : 'Guests'}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        {language === 'ar' ? 'المبلغ' : 'Total'}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        {language === 'ar' ? 'الحالة' : 'Status'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">#{booking.id}</td>
                        <td className="py-3 px-4">{booking.checkIn}</td>
                        <td className="py-3 px-4">{booking.guests}</td>
                        <td className="py-3 px-4">${booking.totalPrice}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status === 'confirmed' 
                              ? (language === 'ar' ? 'مؤكد' : 'Confirmed')
                              : (language === 'ar' ? 'معلق' : 'Pending')
                            }
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Destinations Tab */}
        {activeTab === 'destinations' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('admin.destinations')}
              </h2>
              <button
                onClick={() => setIsAddingDestination(true)}
                className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>{t('admin.add')}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination) => (
                <div key={destination.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <img
                    src={destination.image}
                    alt={language === 'ar' ? destination.nameAr : destination.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {language === 'ar' ? destination.nameAr : destination.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {language === 'ar' ? destination.descriptionAr : destination.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-amber-600">${destination.price}</span>
                      <span className="text-sm text-gray-500">★ {destination.rating}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingDestination(destination)}
                        className="flex items-center space-x-1 bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        <Edit className="w-3 h-3" />
                        <span>{t('admin.edit')}</span>
                      </button>
                      <button
                        onClick={() => handleDeleteDestination(destination.id)}
                        className="flex items-center space-x-1 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>{t('admin.delete')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('admin.bookings')}
            </h2>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        {language === 'ar' ? 'المعرف' : 'Booking ID'}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        {language === 'ar' ? 'الوصول' : 'Check-in'}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        {language === 'ar' ? 'المغادرة' : 'Check-out'}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        {language === 'ar' ? 'الضيوف' : 'Guests'}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        {language === 'ar' ? 'المبلغ' : 'Total'}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        {language === 'ar' ? 'الحالة' : 'Status'}
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        {language === 'ar' ? 'تاريخ الحجز' : 'Created'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">#{booking.id}</td>
                        <td className="py-3 px-4">{booking.checkIn}</td>
                        <td className="py-3 px-4">{booking.checkOut}</td>
                        <td className="py-3 px-4">{booking.guests}</td>
                        <td className="py-3 px-4 font-semibold">${booking.totalPrice}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {booking.status === 'confirmed' 
                              ? (language === 'ar' ? 'مؤكد' : 'Confirmed')
                              : booking.status === 'pending'
                              ? (language === 'ar' ? 'معلق' : 'Pending')
                              : (language === 'ar' ? 'ملغي' : 'Cancelled')
                            }
                          </span>
                        </td>
                        <td className="py-3 px-4">{booking.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Destination Form Modal */}
        {(editingDestination || isAddingDestination) && (
          <DestinationForm
            destination={editingDestination || undefined}
            onSave={handleSaveDestination}
            onCancel={() => {
              setEditingDestination(null);
              setIsAddingDestination(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPage;