// data/mockData.js (versão atualizada com 4 produtos e links de imagens reais)
export let userVehicles = [
  { id: '1', model: 'Honda Civic', licensePlate: 'ABC-1234', type: 'sedan', year: '2022', color: 'Preto', km: '15000' },
  { id: '2', model: 'Jeep Compass', licensePlate: 'DEF-5678', type: 'suv', year: '2023', color: 'Branco', km: '5000' },
  { id: '3', model: 'VW Gol', licensePlate: 'GHI-9012', type: 'hatch', year: '2020', color: 'Prata', km: '45000' },
];

export const services = [
  { id: 's1', name: 'Lavagem Técnica Detalhada', price: 120.00 },
  { id: 's2', name: 'Higienização Interna Completa', price: 350.00 },
  { id: 's3', name: 'Limpeza e Hidratação de Couro', price: 180.00 },
  { id: 's4', name: 'Limpeza de Motor', price: 150.00 },
  { id: 's5', name: 'Oxi-sanitização (Remoção de Odores)', price: 90.00 },
  { id: 's6', name: 'Polimento Técnico (Remove Riscos)', price: 450.00 },
  { id: 's7', name: 'Enceramento Técnico com Carnaúba', price: 150.00 },
  { id: 's8', name: 'Vitrificação de Pintura (1 Ano)', price: 900.00 },
  { id: 's9', name: 'Selante Sintético de Pintura', price: 250.00 },
  { id: 's10', name: 'Cristalização de Vidros', price: 100.00 },
  { id: 's11', name: 'Remoção de Chuva Ácida dos Vidros', price: 80.00 },
  { id: 's12', name: 'Revitalização de Plásticos Externos', price: 70.00 },
  { id: 's13', name: 'Limpeza e Condicionamento de Pneus', price: 60.00 },
  { id: 's14', name: 'Polimento de Faróis', price: 120.00 },
];

export const vehicleTypeMultipliers = {
  hatch: 1.0,
  sedan: 1.0,
  suv: 1.0,
};

export let confirmedAppointments = [];

// PRODUTOS COM LINKS DE IMAGENS REAIS
// VERSÃO COM 4 PRODUTOS E IMAGENS FUNCIONAIS
// VERSÃO COM 4 PRODUTOS E IMAGENS EM CACHE (LOCAL)
export const products = [
  { 
    id: 'p1', 
    name: 'Cera Premium de Carnaúba', 
    price: 89.90, 
    image: require('../assets/images/cera.jpg') 
  },
  { 
    id: 'p2', 
    name: 'Shampoo Automotivo pH Neutro (500ml)', 
    price: 45.50, 
    image: require('../assets/images/shampoo.jpeg') 
  },
  { 
    id: 'p3', 
    name: 'Kit de Microfibras (3 toalhas)', 
    price: 59.99, 
    image: require('../assets/images/microfibra.jpeg') 
  },
  { 
    id: 'p4', 
    name: 'Limpador de Pneus "Pretinho" Gel', 
    price: 29.90, 
    image: require('../assets/images/pretinho.jpeg') 
  }
];



export let users = [
  { 
    id: 1, 
    name: 'Usuário Teste', 
    email: 'teste@email.com', 
    password: '123', 
    address: 'Rua Exemplo, 123',
    phone: '11987654321',
    cpf: '111.222.333-44' 
  }
];
