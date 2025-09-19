import React, { useState } from 'react';
import { MapPin, Star, Calendar, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Destination } from '../types';

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
  },
  {
    id: '3',
    name: 'AlUla Heritage Site',
    nameAr: 'موقع العلا التراثي',
    description: 'Ancient Nabatean city with incredible rock formations',
    descriptionAr: 'مدينة نبطية قديمة بتشكيلات صخرية لا تصدق',
    image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 449,
    rating: 4.7,
    category: 'historical'
  },
  {
    id: '4',
    name: 'Makkah Holy Mosque',
    nameAr: 'الحرم المكي الشريف',
    description: 'The holiest site in Islam',
    descriptionAr: 'أقدس موقع في الإسلام',
    image: 'https://images.pexels.com/photos/2233374/pexels-photo-2233374.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 199,
    rating: 5.0,
    category: 'religious'
  },
  {
    id: '5',
    name: 'Madinah Prophet\'s Mosque',
    nameAr: 'المسجد النبوي الشريف',
    description: 'The second holiest mosque in Islam',
    descriptionAr: 'ثاني أقدس مسجد في الإسلام',
    image: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 199,
    rating: 5.0,
    category: 'religious'
  },
  {
    id: '6',
    name: 'Red Sea Coast',
    nameAr: 'ساحل البحر الأحمر',
    description: 'Pristine beaches and world-class diving',
    descriptionAr: 'شواطئ نقية وغوص عالمي المستوى',
    image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 399,
    rating: 4.6,
    category: 'nature'
  }
];

interface DestinationsPageProps {
  onViewChange: (view: string) => void;
}

const DestinationsPage: React.FC<DestinationsPageProps> = ({ onViewChange }) => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { key: 'all', label: language === 'ar' ? 'الكل' : 'All' },
    { key: 'historical', label: language === 'ar' ? 'تاريخي' : 'Historical' },
    { key: 'modern', label: language === 'ar' ? 'عصري' : 'Modern' },
    { key: 'religious', label: language === 'ar' ? 'ديني' : 'Religious' },
    { key: 'nature', label: language === 'ar' ? 'طبيعي' : 'Nature' }
  ];

  const filteredDestinations = mockDestinations.filter(destination => {
    const matchesCategory = selectedCategory === 'all' || destination.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.nameAr.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('destinations.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'اكتشف أجمل الوجهات السياحية في المملكة العربية السعودية'
              : 'Discover the most beautiful tourist destinations in Saudi Arabia'
            }
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="w-full lg:w-96">
              <input
                type="text"
                placeholder={language === 'ar' ? 'البحث عن وجهة...' : 'Search destinations...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                    selectedCategory === category.key
                      ? 'bg-amber-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={language === 'ar' ? destination.nameAr : destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold">{destination.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {categories.find(c => c.key === destination.category)?.label}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {language === 'ar' ? destination.nameAr : destination.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {language === 'ar' ? destination.descriptionAr : destination.description}
                    </p>
                  </div>
                  <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-amber-600">
                    ${destination.price}
                    <span className="text-sm font-normal text-gray-500">/{language === 'ar' ? 'شخص' : 'person'}</span>
                  </div>
                  <button 
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                    onClick={() => onViewChange('booking')}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t('destinations.bookNow')}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              {language === 'ar' ? 'لم يتم العثور على وجهات' : 'No destinations found'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationsPage;