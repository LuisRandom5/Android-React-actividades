import React, { useState } from 'react';
import { ArrowLeft, Home, User, Settings, ShoppingCart, Heart, Bell } from 'lucide-react';

// Simulación de React Navigation Stack Navigator
const NativeStackNavigator = () => {
  const [navigationStack, setNavigationStack] = useState([{ name: 'Home', params: {} }]);
  
  const navigation = {
    navigate: (screenName, params = {}) => {
      setNavigationStack(prev => [...prev, { name: screenName, params }]);
    },
    goBack: () => {
      setNavigationStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
    },
    push: (screenName, params = {}) => {
      setNavigationStack(prev => [...prev, { name: screenName, params }]);
    },
    replace: (screenName, params = {}) => {
      setNavigationStack(prev => [...prev.slice(0, -1), { name: screenName, params }]);
    },
    reset: (screenName = 'Home') => {
      setNavigationStack([{ name: screenName, params: {} }]);
    }
  };

  const route = navigationStack[navigationStack.length - 1];
  const canGoBack = navigationStack.length > 1;

  // Definición de las pantallas del stack
  const screens = {
    Home: HomeScreen,
    Profile: ProfileScreen,
    Settings: SettingsScreen,
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen
  };

  const CurrentScreen = screens[route.name] || HomeScreen;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header estilo React Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-4">
            {canGoBack && (
              <button
                onClick={navigation.goBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Volver"
              >
                <ArrowLeft size={24} className="text-blue-600" />
              </button>
            )}
            <h1 className="text-lg font-semibold text-gray-800">
              {getScreenTitle(route.name)}
            </h1>
          </div>
        </div>
      </div>

      {/* Contenido de la pantalla actual */}
      <div className="max-w-4xl mx-auto">
        <CurrentScreen navigation={navigation} route={route} />
      </div>

      {/* Debug info - Stack Navigator State */}
      <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white text-xs p-3 rounded-lg max-w-xs">
        <div className="font-semibold mb-2">Navigation Stack:</div>
        {navigationStack.map((screen, index) => (
          <div key={index} className={`${index === navigationStack.length - 1 ? 'text-yellow-300 font-semibold' : 'text-gray-300'}`}>
            {index}: {screen.name}
            {Object.keys(screen.params).length > 0 && (
              <span className="text-blue-300"> ({JSON.stringify(screen.params)})</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const getScreenTitle = (screenName) => {
  const titles = {
    Home: 'Inicio',
    Profile: 'Mi Perfil',
    Settings: 'Configuración',
    ProductDetails: 'Detalles del Producto',
    Cart: 'Carrito de Compras'
  };
  return titles[screenName] || screenName;
};

// Pantalla de Inicio
function HomeScreen({ navigation }) {
  const products = [
    { id: 1, name: 'iPhone 15 Pro', price: '$999', image: '📱' },
    { id: 2, name: 'MacBook Air', price: '$1199', image: '💻' },
    { id: 3, name: 'AirPods Pro', price: '$249', image: '🎧' }
  ];

  return (
    <div className="p-6">
      {/* Header con navegación rápida */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Bienvenido</h2>
          <p className="text-gray-600">Descubre nuestros productos</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => navigation.navigate('Cart')}
            className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
          >
            <ShoppingCart size={20} />
          </button>
          <button 
            onClick={() => navigation.navigate('Profile')}
            className="p-3 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors"
          >
            <User size={20} />
          </button>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-6xl">
              {product.image}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-2xl font-bold text-blue-600 mb-3">{product.price}</p>
              <button
                onClick={() => navigation.navigate('ProductDetails', { 
                  productId: product.id, 
                  productName: product.name,
                  productPrice: product.price 
                })}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-4">Acciones rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigation.navigate('Profile')}
            className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <User className="text-blue-600 mb-2" size={32} />
            <span className="text-sm font-medium">Mi Perfil</span>
          </button>
          
          <button
            onClick={() => navigation.navigate('Cart')}
            className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ShoppingCart className="text-green-600 mb-2" size={32} />
            <span className="text-sm font-medium">Carrito</span>
          </button>
          
          <button
            onClick={() => navigation.navigate('Settings')}
            className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Settings className="text-gray-600 mb-2" size={32} />
            <span className="text-sm font-medium">Configuración</span>
          </button>
          
          <button className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <Bell className="text-orange-600 mb-2" size={32} />
            <span className="text-sm font-medium">Notificaciones</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Pantalla de Perfil
function ProfileScreen({ navigation, route }) {
  const userStats = [
    { label: 'Pedidos realizados', value: '12' },
    { label: 'Productos favoritos', value: '5' },
    { label: 'Puntos acumulados', value: '2,340' },
    { label: 'Descuentos disponibles', value: '3' }
  ];

  return (
    <div className="p-6">
      {/* Información del usuario */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            JP
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">Juan Pérez</h2>
            <p className="text-gray-600">juan.perez@email.com</p>
            <p className="text-sm text-gray-500 mt-1">Miembro desde enero 2024</p>
            <div className="flex items-center space-x-2 mt-2">
              <div className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                ⭐ Cliente VIP
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas del usuario */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {userStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Opciones del perfil */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">Opciones de cuenta</h3>
        </div>
        <div className="divide-y">
          <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <span>Editar información personal</span>
              <span className="text-gray-400">›</span>
            </div>
          </button>
          <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <span>Historial de pedidos</span>
              <span className="text-gray-400">›</span>
            </div>
          </button>
          <button 
            onClick={() => navigation.navigate('Settings')}
            className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span>Configuración</span>
              <span className="text-gray-400">›</span>
            </div>
          </button>
          <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors text-red-600">
            <div className="flex items-center justify-between">
              <span>Cerrar sesión</span>
              <span className="text-red-400">›</span>
            </div>
          </button>
        </div>
      </div>

      {/* Botón para volver al inicio */}
      <div className="mt-6">
        <button
          onClick={() => navigation.navigate('Home')}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}

// Pantalla de Configuración
function SettingsScreen({ navigation }) {
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    autoLogin: true
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const settingsSections = [
    {
      title: 'Notificaciones',
      items: [
        { key: 'notifications', label: 'Notificaciones push', value: settings.notifications },
        { key: 'emailUpdates', label: 'Actualizaciones por email', value: settings.emailUpdates }
      ]
    },
    {
      title: 'Apariencia',
      items: [
        { key: 'darkMode', label: 'Modo oscuro', value: settings.darkMode }
      ]
    },
    {
      title: 'Seguridad',
      items: [
        { key: 'autoLogin', label: 'Inicio de sesión automático', value: settings.autoLogin }
      ]
    }
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Configuración</h2>
          <p className="text-gray-600 text-sm">Personaliza tu experiencia</p>
        </div>

        {settingsSections.map((section, index) => (
          <div key={index} className={index > 0 ? 'border-t' : ''}>
            <div className="p-4 bg-gray-50">
              <h3 className="font-semibold text-gray-700">{section.title}</h3>
            </div>
            <div className="divide-y">
              {section.items.map((item) => (
                <div key={item.key} className="p-4 flex items-center justify-between">
                  <span className="text-gray-800">{item.label}</span>
                  <button
                    onClick={() => toggleSetting(item.key)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      item.value ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      item.value ? 'translate-x-6' : 'translate-x-1'
                    } mt-0.5`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Acciones adicionales */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">Más opciones</h3>
        </div>
        <div className="divide-y">
          <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <span>Política de privacidad</span>
              <span className="text-gray-400">›</span>
            </div>
          </button>
          <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <span>Términos y condiciones</span>
              <span className="text-gray-400">›</span>
            </div>
          </button>
          <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <span>Ayuda y soporte</span>
              <span className="text-gray-400">›</span>
            </div>
          </button>
        </div>
      </div>

      {/* Navegación */}
      <div className="flex space-x-4">
        <button
          onClick={() => navigation.navigate('Profile')}
          className="flex-1 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Ver Perfil
        </button>
        <button
          onClick={() => navigation.navigate('Home')}
          className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}

// Pantalla de Detalles del Producto
function ProductDetailsScreen({ navigation, route }) {
  const { productId, productName, productPrice } = route.params;

  const productDetails = {
    1: { 
      name: 'iPhone 15 Pro', 
      price: '$999', 
      image: '📱',
      description: 'El iPhone más avanzado hasta la fecha con chip A17 Pro, cámara profesional y titanio.',
      specs: ['Chip A17 Pro', 'Cámara triple 48MP', 'Titanio de grado aeroespacial', 'USB-C']
    },
    2: { 
      name: 'MacBook Air', 
      price: '$1199', 
      image: '💻',
      description: 'Ultradelgado, ultraliviano y ultra potente con el chip M2.',
      specs: ['Chip M2', 'Pantalla Liquid Retina 13"', 'Hasta 18h de batería', '8GB RAM']
    },
    3: { 
      name: 'AirPods Pro', 
      price: '$249', 
      image: '🎧',
      description: 'Cancelación activa de ruido y audio espacial personalizado.',
      specs: ['Cancelación activa de ruido', 'Audio espacial', 'Resistente al agua', 'Hasta 6h de reproducción']
    }
  };

  const product = productDetails[productId] || { name: productName, price: productPrice, image: '📦', description: 'Producto increíble', specs: [] };

  return (
    <div className="p-6">
      {/* Imagen del producto */}
      <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-12 text-center mb-6">
        <div className="text-8xl mb-4">{product.image}</div>
      </div>

      {/* Información del producto */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
        <div className="text-3xl font-bold text-blue-600 mb-4">{product.price}</div>
        <p className="text-gray-600 mb-6">{product.description}</p>

        {/* Especificaciones */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Especificaciones:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {product.specs.map((spec, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigation.navigate('Cart', { 
              addedProduct: { id: productId, name: product.name, price: product.price } 
            })}
            className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Agregar al Carrito
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Heart size={20} />
          </button>
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Productos relacionados</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].filter(id => id !== parseInt(productId)).map((id) => (
            <button
              key={id}
              onClick={() => navigation.push('ProductDetails', { 
                productId: id, 
                productName: productDetails[id]?.name,
                productPrice: productDetails[id]?.price 
              })}
              className="p-3 border rounded-lg hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">{productDetails[id]?.image}</div>
              <div className="text-sm font-medium">{productDetails[id]?.name}</div>
              <div className="text-sm text-blue-600 font-semibold">{productDetails[id]?.price}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Pantalla de Carrito
function CartScreen({ navigation, route }) {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'iPhone 15 Pro', price: 999, quantity: 1 },
    { id: 2, name: 'AirPods Pro', price: 249, quantity: 2 }
  ]);

  // Agregar producto si viene de ProductDetails
  React.useEffect(() => {
    if (route.params?.addedProduct) {
      const { addedProduct } = route.params;
      setCartItems(prev => {
        const existing = prev.find(item => item.id === addedProduct.id);
        if (existing) {
          return prev.map(item => 
            item.id === addedProduct.id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prev, { 
            ...addedProduct, 
            price: parseInt(addedProduct.price.replace('$', '')),
            quantity: 1 
          }];
        }
      });
    }
  }, [route.params?.addedProduct]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Carrito de Compras</h2>
          <p className="text-gray-600 text-sm">{cartItems.length} productos</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingCart size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Tu carrito está vacío</p>
            <button
              onClick={() => navigation.navigate('Home')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explorar productos
            </button>
          </div>
        ) : (
          <>
            {/* Items del carrito */}
            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                    {item.id === 1 ? '📱' : item.id === 2 ? '💻' : '🎧'}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-blue-600 font-semibold">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                    >
                      -
                    </button>
                    <span className="font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="font-semibold text-gray-800">
                    ${item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-blue-600">${total}</span>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => navigation.navigate('Home')}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Seguir comprando
                </button>
                <button className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                  Proceder al pago
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NativeStackNavigator;
