import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.destinations': 'Destinations',
    'nav.flights': 'Flights',
    'nav.hotels': 'Hotels',
    'nav.bookings': 'My Bookings',
    'nav.admin': 'Admin',
    'nav.login': 'Login',
    'nav.logout': 'Logout',

    // Home Page
    'home.hero.title': 'Discover Saudi Arabia',
    'home.hero.subtitle': 'Experience the Kingdom\'s rich heritage and modern marvels',
    'home.hero.cta': 'Start Your Journey',
    'home.stats.destinations': 'Destinations',
    'home.stats.customers': 'Happy Customers',
    'home.stats.years': 'Years Experience',
    'home.features.title': 'Why Choose Maoj Travel',
    'home.features.expert': 'Expert Guides',
    'home.features.expertDesc': 'Local experts with deep knowledge',
    'home.features.comfort': 'Premium Comfort',
    'home.features.comfortDesc': 'Luxury accommodations and transport',
    'home.features.support': '24/7 Support',
    'home.features.supportDesc': 'Round-the-clock customer service',

    // Destinations
    'destinations.title': 'Popular Destinations',
    'destinations.viewAll': 'View All',
    'destinations.bookNow': 'Book Now',
    'destinations.from': 'From',

    // Booking
    'booking.checkIn': 'Check In',
    'booking.checkOut': 'Check Out',
    'booking.guests': 'Guests',
    'booking.search': 'Search',
    'booking.book': 'Book Now',

    // Admin
    'admin.dashboard': 'Admin Dashboard',
    'admin.destinations': 'Manage Destinations',
    'admin.bookings': 'View Bookings',
    'admin.users': 'Manage Users',
    'admin.add': 'Add New',
    'admin.edit': 'Edit',
    'admin.delete': 'Delete',
    'admin.save': 'Save',
    'admin.cancel': 'Cancel',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success!',
    'common.confirm': 'Confirm',
    'common.rating': 'Rating',
    'common.price': 'Price',
    'common.duration': 'Duration',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.destinations': 'الوجهات',
    'nav.flights': 'الطيران',
    'nav.hotels': 'الفنادق',
    'nav.bookings': 'حجوزاتي',
    'nav.admin': 'الإدارة',
    'nav.login': 'تسجيل الدخول',
    'nav.logout': 'تسجيل الخروج',

    // Home Page
    'home.hero.title': 'اكتشف المملكة العربية السعودية',
    'home.hero.subtitle': 'اختبر التراث الغني والعجائب العصرية في المملكة',
    'home.hero.cta': 'ابدأ رحلتك',
    'home.stats.destinations': 'وجهة',
    'home.stats.customers': 'عميل سعيد',
    'home.stats.years': 'سنة خبرة',
    'home.features.title': 'لماذا تختار معاج للسفر',
    'home.features.expert': 'مرشدون خبراء',
    'home.features.expertDesc': 'خبراء محليون بمعرفة عميقة',
    'home.features.comfort': 'راحة فاخرة',
    'home.features.comfortDesc': 'إقامة ونقل فاخر',
    'home.features.support': 'دعم ٢٤/٧',
    'home.features.supportDesc': 'خدمة عملاء على مدار الساعة',

    // Destinations
    'destinations.title': 'الوجهات الشعبية',
    'destinations.viewAll': 'عرض الكل',
    'destinations.bookNow': 'احجز الآن',
    'destinations.from': 'من',

    // Booking
    'booking.checkIn': 'تاريخ الوصول',
    'booking.checkOut': 'تاريخ المغادرة',
    'booking.guests': 'الضيوف',
    'booking.search': 'بحث',
    'booking.book': 'احجز الآن',

    // Admin
    'admin.dashboard': 'لوحة الإدارة',
    'admin.destinations': 'إدارة الوجهات',
    'admin.bookings': 'عرض الحجوزات',
    'admin.users': 'إدارة المستخدمين',
    'admin.add': 'إضافة جديد',
    'admin.edit': 'تعديل',
    'admin.delete': 'حذف',
    'admin.save': 'حفظ',
    'admin.cancel': 'إلغاء',

    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'نجح!',
    'common.confirm': 'تأكيد',
    'common.rating': 'التقييم',
    'common.price': 'السعر',
    'common.duration': 'المدة',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};