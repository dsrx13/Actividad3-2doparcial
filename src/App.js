import React, { useState } from 'react';
import './App.css';



function App() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPrice, setShowPrice] = useState(null);
  const [cart, setCart] = useState([]);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [orderTotal, setOrderTotal] = useState(0);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'transferencia'
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price);
  };

  const brands = [
    {
      id: 1,
      name: 'Chevrolet',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDrbnD9ODXoBKq_2CQt1fqJD82M62upQkpTQ&s',
      description: 'Piezas originales y de performance',
      categories: [
        {
          name: 'Motor',
          parts: [
            { name: 'Bloque motor LS 6.2L', price: 28500.00, code: 'CH-LS62' },
            { name: 'Kit cadena distribución Silverado', price: 4200.00, code: 'CH-KCDS' },
            { name: 'Turbocompresor Camaro ZL1', price: 37800.00, code: 'CH-TCZ1' },
            { name: 'Sensores O2 originales', price: 1850.00, code: 'CH-SO2' },
            { name: 'Bomba de combustible', price: 3250.00, code: 'CH-BC' },
            { name: 'Radiador aluminio Silverado', price: 6800.00, code: 'CH-RAS' },
            { name: 'Culata aluminio LS3', price: 12500.00, code: 'CH-CA' },
            { name: 'Kit junta de cabeza', price: 3200.00, code: 'CH-KJH' },
            { name: 'Bujías iridium', price: 450.00, code: 'CH-BI' },
            { name: 'Termostato original', price: 650.00, code: 'CH-TO' },
            { name: 'Bomba de agua', price: 2200.00, code: 'CH-BA' }
          ]
        },
        {
          name: 'Suspensión',
          parts: [
            { name: 'Amortiguadores Tahoe', price: 8400.00, code: 'CH-AT' },
            { name: 'Brazos control Suburban', price: 5500.00, code: 'CH-BCS' },
            { name: 'Kit ballestas Silverado 2500HD', price: 11600.00, code: 'CH-KBS2' },
            { name: 'Barras estabilizadoras', price: 3900.00, code: 'CH-BE' },
            { name: 'Rótulas dirección', price: 920.00, code: 'CH-RD' },
            { name: 'Kit suspensión neumática', price: 25400.00, code: 'CH-KSN' },
            { name: 'Manguetas delanteras', price: 6800.00, code: 'CH-MD' },
            { name: 'Terminales dirección', price: 750.00, code: 'CH-TD' },
            { name: 'Kit reparación suspensión', price: 5800.00, code: 'CH-KRS' }
          ]
        },
        {
          name: 'Exterior',
          parts: [
            { name: 'Parrilla delantera Chrome', price: 4500.00, code: 'CH-PDC' },
            { name: 'Faros LED Corvette C8', price: 13000.00, code: 'CH-FLC8' },
            { name: 'Defensas Colorado', price: 6400.00, code: 'CH-DC' },
            { name: 'Espejos laterales eléctricos', price: 3600.00, code: 'CH-ELE' },
            { name: 'Capó fibra carbono Camaro', price: 17800.00, code: 'CH-CFC' },
            { name: 'Retrovisores con cámara', price: 5200.00, code: 'CH-RC' },
            { name: 'Molduras laterales', price: 2900.00, code: 'CH-ML' }
          ]
        },
        {
          name: 'Transmisión',
          parts: [
            { name: 'Kit reparación transmisión 6L80', price: 12500.00, code: 'CH-KRT6' },
            { name: 'Convertidor de par', price: 6800.00, code: 'CH-CDP' },
            { name: 'Sensores de velocidad', price: 950.00, code: 'CH-SDV' },
            { name: 'Módulo control transmisión', price: 7200.00, code: 'CH-MCT' },
            { name: 'Aceite transmisión Dexron VI', price: 380.00, code: 'CH-ATD' }
          ]
        },
        {
          name: 'Eléctrico',
          parts: [
            { name: 'Alternador 150A', price: 4200.00, code: 'CH-ALT' },
            { name: 'Batería AC Delco', price: 3200.00, code: 'CH-BAT' },
            { name: 'Fusibles varios', price: 150.00, code: 'CH-FUS' },
            { name: 'Kit cableado principal', price: 8500.00, code: 'CH-KCP' }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Ford',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/1200px-Ford_logo_flat.svg.png',
      description: 'Componentes para toda la línea Ford',
      categories: [
        {
          name: 'Motor',
          parts: [
            { name: 'Kit reparación motor EcoBoost', price: 9000.00, code: 'FO-KRE' },
            { name: 'Sobrecárboles Mustang GT', price: 14400.00, code: 'FO-SMG' },
            { name: 'Radiador F-150', price: 7600.00, code: 'FO-RF1' },
            { name: 'Sistema escape completo', price: 10800.00, code: 'FO-SEC' },
            { name: 'Inyectores combustible', price: 1900.00, code: 'FO-IC' },
            { name: 'Termostato original', price: 650.00, code: 'FO-TO' },
            { name: 'Bomba de agua', price: 2200.00, code: 'FO-BA' },
            { name: 'Filtro de aire performance', price: 1200.00, code: 'FO-FAP' },
            { name: 'Correa de accesorios', price: 850.00, code: 'FO-CA' },
            { name: 'Sensores de presión', price: 1250.00, code: 'FO-SDP' }
          ]
        },
        {
          name: 'Transmisión',
          parts: [
            { name: 'Kit reparación transmisión 10R80', price: 13600.00, code: 'FO-KRT' },
            { name: 'Convertidor par Raptor', price: 8400.00, code: 'FO-CPR' },
            { name: 'Sensores de velocidad', price: 1300.00, code: 'FO-SV' },
            { name: 'Cables de cambio', price: 1700.00, code: 'FO-CC' },
            { name: 'Módulo control transmisión', price: 6200.00, code: 'FO-MCT' },
            { name: 'Kit embrague completo', price: 8900.00, code: 'FO-KEC' },
            { name: 'Aceite transmisión sintético', price: 450.00, code: 'FO-ATS' },
            { name: 'Solenoides transmisión', price: 3200.00, code: 'FO-ST' }
          ]
        },
        {
          name: 'Interior',
          parts: [
            { name: 'Asientos cuero Expedition', price: 25000.00, code: 'FO-ACE' },
            { name: 'Pantalla SYNC 4"', price: 7000.00, code: 'FO-PS4' },
            { name: 'Tablero Mustang Mach-E', price: 11600.00, code: 'FO-TMM' },
            { name: 'Consola central premium', price: 4800.00, code: 'FO-CCP' },
            { name: 'Sistema audio B&O', price: 17800.00, code: 'FO-SAB' },
            { name: 'Alfombras premium', price: 2200.00, code: 'FO-AP' },
            { name: 'Volante forrado cuero', price: 4500.00, code: 'FO-VFC' },
            { name: 'Tapetes de hule', price: 1200.00, code: 'FO-TDH' }
          ]
        },
        {
          name: 'Frenos',
          parts: [
            { name: 'Kit frenos delanteros', price: 6800.00, code: 'FO-KFD' },
            { name: 'Pastillas cerámicas', price: 2200.00, code: 'FO-PCE' },
            { name: 'Discos ventilados', price: 3800.00, code: 'FO-DIV' },
            { name: 'Líquido frenos DOT4', price: 350.00, code: 'FO-LFD' }
          ]
        },
        {
          name: 'Exterior',
          parts: [
            { name: 'Faros LED F-150', price: 9800.00, code: 'FO-FLF' },
            { name: 'Parrilla deportiva', price: 4500.00, code: 'FO-PAD' },
            { name: 'Espejos eléctricos', price: 5200.00, code: 'FO-EE' },
            { name: 'Defensas aluminio', price: 7800.00, code: 'FO-DEA' }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Dodge',
      logo: 'https://i0.wp.com/planetdave.com/wp-content/uploads/2024/08/dodge-logo-transparent.png?fit=1278%2C357&ssl=1',
      description: 'Partes para muscle cars y pickups',
      categories: [
        {
          name: 'Performance',
          parts: [
            { name: 'Kit supercharger Hellcat', price: 57800.00, code: 'DO-KSH' },
            { name: 'Sistema escape cat-back Charger', price: 15600.00, code: 'DO-SEC' },
            { name: 'Filtros aire alto flujo', price: 1700.00, code: 'DO-FAF' },
            { name: 'Programadores ECU', price: 9000.00, code: 'DO-PEC' },
            { name: 'Intercooler mejorado', price: 12400.00, code: 'DO-IM' },
            { name: 'Headers acero inoxidable', price: 13400.00, code: 'DO-HAI' },
            { name: 'Kit admisión fría', price: 6800.00, code: 'DO-KAF' },
            { name: 'Bielas forjadas', price: 14500.00, code: 'DO-BF' }
          ]
        },
        {
          name: 'Frenos',
          parts: [
            { name: 'Kit frenos Brembo Challenger', price: 19600.00, code: 'DO-KFC' },
            { name: 'Discos y pastillas Durango', price: 6400.00, code: 'DO-DPD' },
            { name: 'Líneas freno reforzadas', price: 2400.00, code: 'DO-LFR' },
            { name: 'Cilindro maestro', price: 3600.00, code: 'DO-CM' },
            { name: 'Pinzas caliper rojas', price: 8400.00, code: 'DO-PCR' },
            { name: 'Líquido frenos DOT4', price: 350.00, code: 'DO-LFD' },
            { name: 'Sensor ABS', price: 1200.00, code: 'DO-SAB' },
            { name: 'Kit reparación frenos', price: 4500.00, code: 'DO-KRF' }
          ]
        },
        {
          name: 'Eléctrico',
          parts: [
            { name: 'Alternador alta capacidad', price: 6200.00, code: 'DO-AAC' },
            { name: 'Módulos control Ram', price: 4800.00, code: 'DO-MCR' },
            { name: 'Harness cableado completo', price: 9000.00, code: 'DO-HCC' },
            { name: 'Sensores estacionamiento', price: 1900.00, code: 'DO-SE' },
            { name: 'Batería AGM premium', price: 4400.00, code: 'DO-BAP' },
            { name: 'Fusibles varios', price: 250.00, code: 'DO-FV' },
            { name: 'Relés de potencia', price: 350.00, code: 'DO-RP' }
          ]
        },
        {
          name: 'Interior',
          parts: [
            { name: 'Asientos deportivos', price: 18500.00, code: 'DO-AD' },
            { name: 'Volante deportivo', price: 6800.00, code: 'DO-VD' },
            { name: 'Sistema audio premium', price: 12400.00, code: 'DO-SAP' },
            { name: 'Alfombras de lujo', price: 3200.00, code: 'DO-ADL' }
          ]
        },
        {
          name: 'Suspensión',
          parts: [
            { name: 'Kit suspensión deportiva', price: 15600.00, code: 'DO-KSD' },
            { name: 'Amortiguadores ajustables', price: 9800.00, code: 'DO-AA' },
            { name: 'Barras estabilizadoras', price: 4500.00, code: 'DO-BAE' },
            { name: 'Kit suspensión neumática', price: 28500.00, code: 'DO-KSN' }
          ]
        }
      ]
    },
    {
      id: 4,
      name: 'Jeep',
      logo: 'https://logodownload.org/wp-content/uploads/2019/02/jeep-logo-1.png',
      description: 'Accesorios y repuestos para aventura',
      categories: [
        {
          name: 'Off-Road',
          parts: [
            { name: 'Kit elevación 4" Wrangler', price: 17000.00, code: 'JE-KEW4' },
            { name: 'Barras protectoras', price: 6400.00, code: 'JE-BP' },
            { name: 'Neumáticos todo terreno 35"', price: 5800.00, code: 'JE-NTT' },
            { name: 'Winches Warn', price: 15600.00, code: 'JE-WW' },
            { name: 'Kit recuperación completo', price: 8400.00, code: 'JE-KRC' },
            { name: 'Luces LED para techo', price: 4500.00, code: 'JE-LLT' },
            { name: 'Snorkel para vadeo', price: 5200.00, code: 'JE-SV' },
            { name: 'Kit protección bajos', price: 7800.00, code: 'JE-KPB' }
          ]
        },
        {
          name: 'Carrocería',
          parts: [
            { name: 'Puertas tubulares', price: 25000.00, code: 'JE-PT' },
            { name: 'Capotas suaves premium', price: 11600.00, code: 'JE-CSP' },
            { name: 'Guardafangos aluminio', price: 6400.00, code: 'JE-GA' },
            { name: 'Portaequipajes techo', price: 9000.00, code: 'JE-PET' },
            { name: 'Paragolpes acero', price: 13600.00, code: 'JE-PA' },
            { name: 'Espejos laterales reforzados', price: 4200.00, code: 'JE-ELR' },
            { name: 'Ventanas laterales', price: 3800.00, code: 'JE-VL' }
          ]
        },
        {
          name: 'Transmisión 4x4',
          parts: [
            { name: 'Kit reparación transfer case', price: 10400.00, code: 'JE-KRT' },
            { name: 'Ejes delanteros Dana 44', price: 25000.00, code: 'JE-EDD' },
            { name: 'Cubos rueda automáticos', price: 5600.00, code: 'JE-CRA' },
            { name: 'Palieres reforzados', price: 8400.00, code: 'JE-PR' },
            { name: 'Kit reductores 4:1', price: 15600.00, code: 'JE-KR4' },
            { name: 'Diferenciales bloqueables', price: 17800.00, code: 'JE-DB' },
            { name: 'Aceite diferencial sintético', price: 650.00, code: 'JE-ADS' }
          ]
        },
        {
          name: 'Interior',
          parts: [
            { name: 'Asientos resistentes al agua', price: 15600.00, code: 'JE-ARA' },
            { name: 'Sistema audio marinizado', price: 12500.00, code: 'JE-SAM' },
            { name: 'Alfombras de drenaje', price: 3200.00, code: 'JE-ADD' },
            { name: 'Kit limpieza interior', price: 1500.00, code: 'JE-KLI' }
          ]
        },
        {
          name: 'Motor',
          parts: [
            { name: 'Kit reparación motor 3.6L', price: 18500.00, code: 'JE-KRM' },
            { name: 'Filtros de aire off-road', price: 2200.00, code: 'JE-FAO' },
            { name: 'Sistema escape mejorado', price: 9800.00, code: 'JE-SEM' },
            { name: 'Kit mantenimiento completo', price: 4500.00, code: 'JE-KMC' }
          ]
        }
      ]
    },
    {
      id: 5,
      name: 'Nissan',
      logo: 'https://www.pngall.com/wp-content/uploads/13/Nissan-Logo-PNG-Photos.png',
      description: 'Partes originales y de performance para modelos Nissan',
      categories: [
        {
          name: 'Motor',
          parts: [
            { name: 'Kit distribución GT-R R35', price: 18500.00, code: 'NI-KDG' },
            { name: 'Turbina GT-R original', price: 32500.00, code: 'NI-TGO' },
            { name: 'Sensores MAF Sentra', price: 2200.00, code: 'NI-SMS' },
            { name: 'Bomba de gasolina Versa', price: 3800.00, code: 'NI-BGV' },
            { name: 'Radiador aluminio Frontier', price: 7200.00, code: 'NI-RAF' },
            { name: 'Kit junta culata Altima', price: 4500.00, code: 'NI-KJC' },
            { name: 'Termostato original', price: 650.00, code: 'NI-TO' },
            { name: 'Bomba de agua', price: 2200.00, code: 'NI-BA' }
          ]
        },
        {
          name: 'Transmisión',
          parts: [
            { name: 'Kit reparación CVT', price: 14800.00, code: 'NI-KRC' },
            { name: 'Convertidor de par', price: 6800.00, code: 'NI-CDP' },
            { name: 'Sensores velocidad Sentra', price: 1200.00, code: 'NI-SVS' },
            { name: 'Módulo control transmisión', price: 8500.00, code: 'NI-MCT' },
            { name: 'Aceite NS-3 CVT', price: 420.00, code: 'NI-ANC' }
          ]
        },
        {
          name: 'Suspensión',
          parts: [
            { name: 'Amortiguadores deportivos 370Z', price: 9800.00, code: 'NI-AD3' },
            { name: 'Brazos control X-Trail', price: 5200.00, code: 'NI-BCX' },
            { name: 'Kit ballestas Titan', price: 12500.00, code: 'NI-KBT' },
            { name: 'Barras estabilizadoras', price: 3900.00, code: 'NI-BE' },
            { name: 'Rótulas dirección', price: 920.00, code: 'NI-RD' }
          ]
        },
        {
          name: 'Frenos',
          parts: [
            { name: 'Kit frenos GT-R Brembo', price: 22500.00, code: 'NI-KFG' },
            { name: 'Pastillas cerámicas Altima', price: 2400.00, code: 'NI-PCA' },
            { name: 'Discos ventilados', price: 3800.00, code: 'NI-DV' },
            { name: 'Líquido frenos DOT4', price: 350.00, code: 'NI-LFD' }
          ]
        },
        {
          name: 'Exterior',
          parts: [
            { name: 'Faros LED Kicks', price: 8500.00, code: 'NI-FLK' },
            { name: 'Parrilla deportiva', price: 4500.00, code: 'NI-PD' },
            { name: 'Espejos eléctricos', price: 5200.00, code: 'NI-EE' },
            { name: 'Defensas aluminio Frontier', price: 7800.00, code: 'NI-DAF' }
          ]
        }
      ]
    },
    {
      id: 6,
      name: 'Toyota',
      logo: 'https://www.carlogos.org/logo/Toyota-logo-1989-2560x1440.png',
      description: 'Partes originales y accesorios para modelos Toyota',
      categories: [
        {
          name: 'Motor',
          parts: [
            { name: 'Kit distribución Hilux', price: 12500.00, code: 'NI-KDH' },
            { name: 'Sobrecárboles 86/BRZ', price: 14400.00, code: 'NI-S8B' },
            { name: 'Radiador aluminio Tacoma', price: 7600.00, code: 'NI-RAT' },
            { name: 'Sistema escape completo', price: 10800.00, code: 'NI-SEC' },
            { name: 'Inyectores combustible', price: 1900.00, code: 'NI-IC' },
            { name: 'Termostato original', price: 650.00, code: 'NI-TO' },
            { name: 'Bomba de agua', price: 2200.00, code: 'NI-BA' }
          ]
        },
        {
          name: 'Transmisión',
          parts: [
            { name: 'Kit reparación automática', price: 13600.00, code: 'NI-KRA' },
            { name: 'Convertidor de par', price: 6800.00, code: 'NI-CDP' },
            { name: 'Sensores de velocidad', price: 1300.00, code: 'NI-SV' },
            { name: 'Módulo control transmisión', price: 7200.00, code: 'NI-MCT' },
            { name: 'Aceite WS ATF', price: 450.00, code: 'NI-AWA' }
          ]
        },
        {
          name: 'Suspensión',
          parts: [
            { name: 'Kit suspensión deportiva', price: 15600.00, code: 'NI-KSD' },
            { name: 'Amortiguadores ajustables', price: 9800.00, code: 'NI-AA' },
            { name: 'Barras estabilizadoras', price: 4500.00, code: 'NI-BE' },
            { name: 'Kit suspensión neumática', price: 28500.00, code: 'NI-KSN' }
          ]
        },
        {
          name: 'Interior',
          parts: [
            { name: 'Asientos cuero Land Cruiser', price: 25000.00, code: 'NI-ACL' },
            { name: 'Pantalla multimedia', price: 7000.00, code: 'NI-PM' },
            { name: 'Tablero digital Corolla', price: 11600.00, code: 'NI-TDC' },
            { name: 'Sistema audio JBL', price: 17800.00, code: 'NI-SAJ' }
          ]
        },
        {
          name: 'Exterior',
          parts: [
            { name: 'Faros LED RAV4', price: 9800.00, code: 'NI-FLR' },
            { name: 'Parrilla deportiva', price: 4500.00, code: 'NI-PD' },
            { name: 'Espejos eléctricos', price: 5200.00, code: 'NI-EE' },
            { name: 'Defensas aluminio Hilux', price: 7800.00, code: 'NI-DAH' }
          ]
        }
      ]
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value
    });
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedCategory(null);
    setShowPrice(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowPrice(null);
  };

  const handleShowPrice = (partIndex) => {
    setShowPrice(showPrice === partIndex ? null : partIndex);
  };

  const handleQuantityChange = (part, value) => {
    const newValue = Math.max(1, parseInt(value) || 1);
    setQuantities({
      ...quantities,
      [part.code]: newValue
    });
  };

  const addToCart = (part) => {
    const quantity = quantities[part.code] || 1;
    const existingItemIndex = cart.findIndex(item => item.code === part.code);
    
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, {
        ...part,
        quantity: quantity
      }]);
    }
  };

  const handleBackToBrands = () => {
    setSelectedBrand(null);
    setSelectedCategory(null);
    setShowPrice(null);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setShowPrice(null);
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, parseInt(newQuantity) || 1);
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep(1);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const total = calculateTotal();
    setOrderTotal(total);
    console.log('Orden enviada:', { customerInfo, cart, total });
    setCheckoutStep(2);
    setCart([]);
  };

  const handleBackToCart = () => {
    setCheckoutStep(0);
  };

  const handleBackToShop = () => {
    setCheckoutStep(0);
    setShowPrice(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>Luxury Car Parts</h1>
          <p className="subtitle">Calidad garantizada para tus marcas favoritas</p>
          
          {cart.length > 0 && checkoutStep === 0 && (
            <div className="cart-indicator" onClick={() => setShowPrice('cart')}>
              🛒 {cart.reduce((sum, item) => sum + item.quantity, 0)} items - Total: {formatPrice(calculateTotal())}
            </div>
          )}
        </div>
        
        {showPrice === 'cart' ? (
          checkoutStep === 0 ? (
            <div className="cart-container">
              <button className="back-button" onClick={() => setShowPrice(null)}>
                ← Volver
              </button>
              <h2>Tu Carrito de Compras</h2>
              {cart.length === 0 ? (
                <p className="empty-cart">Tu carrito está vacío</p>
              ) : (
                <>
                  <ul className="cart-list">
                    {cart.map((item, index) => (
                      <li key={index} className="cart-item">
                        <div className="cart-item-info">
                          <span className="cart-item-name">{item.name}</span>
                          <span className="cart-item-code">{item.code}</span>
                          <div className="quantity-control">
                            <button 
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(index, e.target.value)}
                            />
                            <button onClick={() => updateQuantity(index, item.quantity + 1)}>
                              +
                            </button>
                          </div>
                          <span className="cart-item-price">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                        <button 
                          className="remove-button"
                          onClick={() => removeFromCart(index)}
                        >
                          Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="cart-total">
                    <span>Total ({cart.reduce((sum, item) => sum + item.quantity, 0)} piezas):</span>
                    <span className="total-amount">{formatPrice(calculateTotal())}</span>
                  </div>
                  <div className="cart-actions">
                    <button className="clear-cart" onClick={() => setCart([])}>
                      Vaciar Carrito
                    </button>
                    <button className="checkout-button" onClick={handleCheckout}>
                      Proceder al Pago
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : checkoutStep === 1 ? (
            <div className="checkout-form-container">
              <button className="back-button" onClick={handleBackToCart}>
                ← Volver al carrito
              </button>
              <h2>Información de Pago</h2>
              <form onSubmit={handleSubmitOrder}>
                <div className="form-group">
                  <label>Nombre Completo:</label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Correo Electrónico:</label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono:</label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Dirección de Envío:</label>
                  <textarea
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Método de Pago:</label>
                  <select
                    name="paymentMethod"
                    value={customerInfo.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <option value="transferencia">Transferencia Bancaria</option>
                    <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                    <option value="efectivo">Efectivo al Recibir</option>
                  </select>
                </div>
                <div className="order-summary">
                  <h3>Resumen de tu Orden</h3>
                  <ul>
                    {cart.map((item, index) => (
                      <li key={index}>
                        {item.name} (x{item.quantity}) - {formatPrice(item.price * item.quantity)}
                      </li>
                    ))}
                  </ul>
                  <div className="order-total">
                    <span>Total:</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
                <button type="submit" className="submit-order-button">
                  Confirmar Pedido
                </button>
              </form>
            </div>
          ) : (
            <div className="order-confirmation">
              <h2>¡Gracias por tu compra!</h2>
              <p>Tu pedido ha sido recibido y está siendo procesado.</p>
              <p>Te hemos enviado un correo con los detalles a {customerInfo.email}</p>
              <div className="order-details">
                <h3>Detalles de tu pedido:</h3>
                <ul>
                  {cart.map((item, index) => (
                    <li key={index}>
                      {item.name} (x{item.quantity}) - {formatPrice(item.price * item.quantity)}
                    </li>
                  ))}
                </ul>
                <p><strong>Total:</strong> {formatPrice(orderTotal)}</p>
                <p><strong>Método de pago:</strong> {
                  customerInfo.paymentMethod === 'transferencia' ? 'Transferencia Bancaria' :
                  customerInfo.paymentMethod === 'tarjeta' ? 'Tarjeta de Crédito/Débito' :
                  'Efectivo al Recibir'
                }</p>
              </div>
              <button 
                className="back-to-shop-button"
                onClick={handleBackToShop}
              >
                Volver a la Tienda
              </button>
            </div>
          )
        ) : !selectedBrand ? (
          <div className="brands-container">
            {brands.map((brand) => (
              <div key={brand.id} className="brand-card" onClick={() => handleBrandSelect(brand)}>
                <img 
                  src={brand.logo} 
                  className="brand-logo" 
                  alt={`Logo ${brand.name}`} 
                />
                <h2>{brand.name}</h2>
                <p>{brand.description}</p>
                <button className="parts-button">Ver Piezas</button>
              </div>
            ))}
          </div>
        ) : selectedBrand && !selectedCategory ? (
          <div className="categories-container">
            <button className="back-button" onClick={handleBackToBrands}>
              ← Volver a marcas
            </button>
            <h2>Piezas para {selectedBrand.name}</h2>
            <div className="category-list">
              {selectedBrand.categories.map((category, index) => (
                <div 
                  key={index} 
                  className="category-card"
                  onClick={() => handleCategorySelect(category)}
                >
                  <h3>{category.name}</h3>
                  <p>{category.parts.length} piezas disponibles</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="parts-container">
            <button className="back-button" onClick={handleBackToCategories}>
              ← Volver a categorías
            </button>
            <h2>{selectedBrand.name} - {selectedCategory.name}</h2>
            <ul className="parts-list">
              {selectedCategory.parts.map((part, index) => (
                <li key={index} className="part-item">
                  <div className="part-info">
                    <span className="part-name">{part.name}</span>
                    <span className="part-code">{part.code}</span>
                  </div>
                  <div className="part-actions">
                    {showPrice === index ? (
                      <div className="price-quantity-container">
                        <span className="part-price">{formatPrice(part.price)}</span>
                        <div className="quantity-selector">
                          <button onClick={() => handleQuantityChange(part, (quantities[part.code] || 1) - 1)}>
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={quantities[part.code] || 1}
                            onChange={(e) => handleQuantityChange(part, e.target.value)}
                          />
                          <button onClick={() => handleQuantityChange(part, (quantities[part.code] || 1) + 1)}>
                            +
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button 
                        className="inquire-button"
                        onClick={() => handleShowPrice(index)}
                      >
                        Consultar precio
                      </button>
                    )}
                    <button 
                      className="add-to-cart-button"
                      onClick={() => addToCart(part)}
                    >
                      Agregar ({quantities[part.code] || 1})
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {showPrice !== 'cart' && checkoutStep === 0 && (
          <div className="contact-section">
            <h2>¿Necesitas una pieza especial?</h2>
            <p>Podemos importar cualquier pieza bajo pedido</p>
            <div className="contact-buttons">
              <button className="contact-button">WhatsApp: +52 55 1234 5678</button>
              <button className="contact-button">Email: contacto@autopartesmx.com</button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;