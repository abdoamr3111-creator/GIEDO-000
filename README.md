# 🛍️ Giedo Digital Mall - دليل التطبيق الكامل

[![Flutter](https://img.shields.io/badge/Flutter-3.16+-blue.svg)](https://flutter.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Latest-orange.svg)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📖 نظرة عامة

**Giedo Digital Mall** هو تطبيق متجر إلكتروني متكامل مبني بـ Flutter مع قاعدة بيانات Firebase حقيقية. التطبيق جاهز للنشر على Google Play مع جميع الميزات الأساسية والمتقدمة.

### ✨ الميزات الرئيسية

- 🔐 **نظام مصادقة كامل** - تسجيل دخول وإنشاء حساب مع Firebase Auth
- 🛒 **سلة تسوق متقدمة** - إدارة المنتجات مع كوبونات خصم
- 📦 **نظام طلبات** - إنشاء وتتبع الطلبات بالكامل
- 👤 **حساب المستخدم** - إدارة البيانات الشخصية
- 🔍 **بحث وفلترة** - بحث متقدم في المنتجات
- ⭐ **تقييمات** - نظام تقييم للمنتجات
- 👨‍💼 **لوحة إدارة** - لوحة تحكم كاملة للأدمن
- 🎨 **Material Design 3** - تصميم عصري وجميل
- 🌐 **Real-time Database** - Firestore مع تحديثات فورية
- 📊 **إحصائيات** - متابعة المبيعات والطلبات

## 🚀 البدء السريع

### المتطلبات الأساسية

```bash
# Flutter SDK
flutter --version  # يجب أن يكون 3.16.0 أو أحدث

# Firebase CLI
npm install -g firebase-tools
dart pub global activate flutterfire_cli
```

### التثبيت

1. **استنساخ المشروع**
```bash
git clone https://github.com/giedo-digital-mall/flutter-app.git
cd flutter-app
```

2. **تثبيت التبعيات**
```bash
flutter pub get
```

3. **إعداد Firebase**
```bash
# تسجيل الدخول إلى Firebase
firebase login

# إعداد المشروع
flutterfire configure
```

4. **تشغيل التطبيق**
```bash
flutter run
```

## 📁 هيكل المشروع

```
giedo_digital_mall/
├── lib/
│   ├── main.dart                  # نقطة البدء
│   ├── firebase_options.dart      # إعدادات Firebase
│   ├── constants/
│   │   └── app_theme.dart         # الألوان والثيمات
│   ├── models/
│   │   ├── product_model.dart     # نموذج المنتج
│   │   ├── user_model.dart        # نموذج المستخدم
│   │   ├── order_model.dart       # نموذج الطلب
│   │   └── category_model.dart    # نموذج الفئة
│   ├── services/
│   │   ├── auth_service.dart      # خدمة المصادقة
│   │   ├── product_service.dart   # خدمة المنتجات
│   │   ├── order_service.dart     # خدمة الطلبات
│   │   └── user_service.dart      # خدمة المستخدمين
│   ├── providers/
│   │   ├── auth_provider.dart     # إدارة حالة المصادقة
│   │   ├── cart_provider.dart     # إدارة السلة
│   │   └── products_provider.dart # إدارة المنتجات
│   └── screens/
│       ├── splash_screen.dart
│       ├── auth/
│       │   ├── login_screen.dart
│       │   └── register_screen.dart
│       ├── home/home_screen.dart
│       ├── products/
│       │   ├── products_screen.dart
│       │   └── product_details_screen.dart
│       ├── cart/cart_screen.dart
│       ├── checkout/checkout_screen.dart
│       ├── orders/orders_screen.dart
│       ├── account/account_screen.dart
│       └── admin/admin_screen.dart
├── android/
├── ios/
└── pubspec.yaml
```

## 🔥 إعداد Firebase

### 1. إنشاء مشروع Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com)
2. أنشئ مشروعاً جديداً: **giedo-digital-mall**
3. أضف تطبيق Android:
   - Package name: `com.giedo.digitalmall`
4. حمّل `google-services.json` وضعه في `android/app/`

### 2. تفعيل الخدمات

في Firebase Console، فعّل:

- ✅ **Authentication** → Email/Password
- ✅ **Firestore Database** → Start in test mode
- ✅ **Storage** (اختياري)

### 3. قواعد Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true);
      allow create: if request.auth != null;
    }
  }
}
```

## 🗄️ هيكل قاعدة البيانات

### Collection: `products`
```javascript
{
  "id": "auto-generated",
  "title": "Product Name",
  "titleAr": "اسم المنتج",
  "description": "Description...",
  "descriptionAr": "الوصف...",
  "price": 99.99,
  "discountPrice": 79.99,
  "categoryId": "electronics",
  "categoryName": "إلكترونيات",
  "images": ["url1", "url2"],
  "rating": 4.5,
  "reviewCount": 128,
  "stock": 50,
  "isActive": true,
  "isFeatured": true,
  "attributes": {},
  "createdAt": Timestamp
}
```

### Collection: `users`
```javascript
{
  "uid": "firebase-uid",
  "name": "User Name",
  "email": "user@example.com",
  "phone": "+967777123456",
  "address": "Address...",
  "city": "City",
  "country": "Yemen",
  "photoUrl": "",
  "isAdmin": false,
  "wishlist": [],
  "createdAt": Timestamp
}
```

### Collection: `orders`
```javascript
{
  "id": "auto-generated",
  "userId": "user-id",
  "userName": "User Name",
  "userPhone": "+967777123456",
  "deliveryAddress": "Address...",
  "city": "City",
  "items": [
    {
      "productId": "product-id",
      "productTitle": "Product",
      "productImage": "url",
      "price": 99.99,
      "quantity": 2
    }
  ],
  "totalAmount": 199.98,
  "deliveryFee": 5.00,
  "status": "pending",
  "paymentMethod": "cash",
  "notes": "",
  "createdAt": Timestamp,
  "updatedAt": Timestamp
}
```

## 🔨 بناء التطبيق

### بناء APK للتجربة
```bash
flutter build apk --release
```
📍 الملف الناتج: `build/app/outputs/flutter-apk/app-release.apk`

### بناء App Bundle للنشر
```bash
flutter build appbundle --release
```
📍 الملف الناتج: `build/app/outputs/bundle/release/app-release.aab`

## 🔐 إعداد التوقيع (Signing)

### 1. إنشاء Keystore

```bash
keytool -genkey -v -keystore ~/giedo-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias giedo-key
```

⚠️ **مهم جداً**: احفظ كلمة المرور في مكان آمن!

### 2. إنشاء `android/key.properties`

```properties
storePassword=YOUR_STORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=giedo-key
storeFile=/path/to/giedo-key.jks
```

### 3. تحديث `android/app/build.gradle`

```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

## 🚀 النشر على Google Play

### الخطوات

1. **إنشاء حساب مطور**
   - اذهب إلى [Google Play Console](https://play.google.com/console)
   - ادفع $25 (رسوم مرة واحدة)

2. **إنشاء التطبيق**
   - اضغط "Create app"
   - الاسم: **Giedo Digital Mall**
   - اللغة الافتراضية: العربية

3. **رفع الحزمة**
   - انتقل إلى Production → Create new release
   - ارفع ملف `app-release.aab`

4. **تعبئة Store Listing**
   - اسم التطبيق
   - الوصف القصير والكامل
   - الأيقونة (512x512 px)
   - Feature Graphic (1024x500 px)
   - Screenshots (الحد الأدنى 2)

5. **Content Rating**
   - أكمل استبيان التقييم

6. **Privacy Policy**
   - أضف رابط سياسة الخصوصية

7. **المراجعة والنشر**
   - اضغط "Submit for review"
   - تستغرق المراجعة 1-3 أيام

## 📊 إحصائيات المشروع

| المقياس | القيمة |
|---------|--------|
| عدد الملفات | 25+ ملف |
| سطور الكود | 5000+ سطر |
| الميزات | 15+ ميزة |
| الشاشات | 12 شاشة |
| Collections | 4 مجموعات |

## 🛠️ تقنيات مستخدمة

- **Flutter 3.16+** - إطار العمل
- **Firebase Auth** - المصادقة
- **Firestore** - قاعدة البيانات
- **Provider** - إدارة الحالة
- **Google Fonts** - الخطوط
- **Cached Network Image** - تحميل الصور
- **Carousel Slider** - البنرات
- **Shimmer** - التحميل
- **Flutter Rating Bar** - التقييمات

## 📝 نصائح ما بعد النشر

### مراقبة التطبيق
- 📊 Firebase Analytics للإحصائيات
- 🐛 Firebase Crashlytics لتتبع الأخطاء
- 🔔 Firebase Cloud Messaging للإشعارات

### التحسين
- ⚡ تحسين الأداء
- 🎨 A/B Testing للتصميم
- 🔍 تحسين ASO (App Store Optimization)

### التفاعل مع المستخدمين
- ⭐ الرد على التقييمات
- 📧 إرسال نشرات إخبارية
- 🎁 عروض وكوبونات خصم

## 🤝 المساهمة

نرحب بالمساهمات! لإضافة ميزة جديدة:

1. Fork المشروع
2. أنشئ branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. افتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص بموجب MIT License - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 📧 التواصل

- **Email**: info@giedo.com
- **WhatsApp**: +967 777 123 456
- **Telegram**: @giedo_support
- **Website**: [https://giedo-mall.web.app](https://giedo-mall.web.app)

## 🙏 شكر وتقدير

- فريق Flutter لتوفير إطار عمل رائع
- Firebase لخدمات البنية التحتية
- المجتمع البرمجي العربي

---

<div align="center">
  
**صُنع بـ ❤️ في اليمن**

[![Flutter](https://img.shields.io/badge/Made%20with-Flutter-02569B?style=for-the-badge&logo=flutter)](https://flutter.dev)
[![Firebase](https://img.shields.io/badge/Backend-Firebase-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com)

</div>