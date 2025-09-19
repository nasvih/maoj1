import React from 'react';
import { MapPin, Star, Users, Shield, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomePageProps {
  onViewChange: (view: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onViewChange }) => {
  const { t, language } = useLanguage();

  const featuredDestinations = [
    {
      id: '1',
      name: 'Riyadh',
      nameAr: 'الرياض',
      image: 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      price: 299
    },
    {
      id: '2',
      name: 'Jeddah',
      nameAr: 'جدة',
      image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      price: 349
    },
    {
      id: '3',
      name: 'AlUla',
      nameAr: 'العلا',
      image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      price: 449
    }
  ];

  const stats = [
    { number: '50+', label: t('home.stats.destinations') },
    { number: '10K+', label: t('home.stats.customers') },
    { number: '15+', label: t('home.stats.years') }
  ];

  const features = [
    {
      icon: Users,
      title: t('home.features.expert'),
      description: t('home.features.expertDesc')
    },
    {
      icon: Shield,
      title: t('home.features.comfort'),
      description: t('home.features.comfortDesc')
    },
    {
      icon: Clock,
      title: t('home.features.support'),
      description: t('home.features.supportDesc')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-blue-800 to-amber-600">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1630039/pexels-photo-1630039.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-0 animate-fade-in-up animation-delay-300">
            {t('home.hero.subtitle')}
          </p>
          <button
            onClick={() => onViewChange('destinations')}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 opacity-0 animate-fade-in-up animation-delay-600"
          >
            {t('home.hero.cta')}
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl font-bold text-amber-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.features.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-600 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-amber-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t('destinations.title')}
            </h2>
            <button
              onClick={() => onViewChange('destinations')}
              className="text-amber-600 hover:text-amber-700 font-semibold"
            >
              {t('destinations.viewAll')} →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                onClick={() => onViewChange('destinations')}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={language === 'ar' ? destination.nameAr : destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">{destination.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {language === 'ar' ? destination.nameAr : destination.name}
                    </h3>
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-amber-600">
                      ${destination.price}
                      <span className="text-sm font-normal text-gray-500">/{t('common.person')}</span>
                    </div>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
                      {t('destinations.bookNow')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-amber-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to explore Saudi Arabia?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of travelers who have discovered the magic of the Kingdom
          </p>
          <button
            onClick={() => onViewChange('destinations')}
            className="bg-white text-blue-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300"
          >
            Start Planning Your Trip
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;