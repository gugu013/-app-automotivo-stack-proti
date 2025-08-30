// data/mockData.js
export let userVehicles = [
  { id: '1', model: 'Honda Civic', licensePlate: 'ABC-1234', type: 'sedan', year: '2022', color: 'Preto', km: '15000' },
  { id: '2', model: 'Jeep Compass', licensePlate: 'DEF-5678', type: 'suv', year: '2023', color: 'Branco', km: '5000' },
  { id: '3', model: 'VW Gol', licensePlate: 'GHI-9012', type: 'hatch', year: '2020', color: 'Prata', km: '45000' },
];

// LISTA DE SERVIÇOS EXPANDIDA
export const services = [
  // Limpeza Detalhada
  { id: 's1', name: 'Lavagem Técnica Detalhada', price: 120.00 },
  { id: 's2', name: 'Higienização Interna Completa', price: 350.00 },
  { id: 's3', name: 'Limpeza e Hidratação de Couro', price: 180.00 },
  { id: 's4', name: 'Limpeza de Motor', price: 150.00 },
  { id: 's5', name: 'Oxi-sanitização (Remoção de Odores)', price: 90.00 },
  
  // Proteção e Estética
  { id: 's6', name: 'Polimento Técnico (Remove Riscos)', price: 450.00 },
  { id: 's7', name: 'Enceramento Técnico com Carnaúba', price: 150.00 },
  { id: 's8', name: 'Vitrificação de Pintura (1 Ano)', price: 900.00 },
  { id: 's9', name: 'Selante Sintético de Pintura', price: 250.00 },
  { id: 's10', name: 'Cristalização de Vidros', price: 100.00 },
  
  // Serviços Adicionais
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

export const products = [
  { id: 'p1', name: 'Cera Premium de Carnaúba', price: 89.90, image: 'https://i.imgur.com/7gKss8a.png' },
  { id: 'p2', name: 'Shampoo Automotivo pH Neutro (500ml)', price: 45.50, image: 'https://i.imgur.com/K8E84e6.png' },
  { id: 'p3', name: 'Kit de Microfibras (3 toalhas)', price: 59.99, image: 'https://i.imgur.com/2s42t6g.png' },
  { id: 'p4', name: 'Limpador de Pneus "Pretinho" Gel', price: 29.90, image: 'https://i.imgur.com/K8E84e6.png' },
  { id: 'p5', name: 'Hidratante de Couro', price: 75.00, image: 'https://i.imgur.com/K8E84e6.png' },
  { id: 'p6', name: 'Revitalizador de Plásticos', price: 49.90, image: 'https://i.imgur.com/K8E84e6.png' },
  { id: 'p7', name: 'Limpador Multiuso APC (1L)', price: 38.00, image: 'https://i.imgur.com/K8E84e6.png' },
  { id: 'p8', name: 'Luva de Microfibra para Lavagem', price: 35.00, image: 'https://i.imgur.com/2s42t6g.png' },
  { id: 'p9', name: 'Descontaminante Ferroso (500ml)', price: 99.90, image: 'https://i.imgur.com/K8E84e6.png' },
  { id: 'p10', name: 'Clay Bar (Barra de Argila)', price: 65.00, image: 'https://i.imgur.com/7gKss8a.png' },
  { id: 'p11', name: 'Selante Sintético para Pintura', price: 120.00, image: 'https://i.imgur.com/7gKss8a.png' },
  { id: 'p12', name: 'Escova para Limpeza de Rodas', price: 25.00, image: 'https://i.imgur.com/2s42t6g.png' },
  { id: 'p13', name: 'Limpa Vidros Anti-embaçante', price: 32.50, image: 'https://i.imgur.com/K8E84e6.png' },
  { id: 'p14', name: 'Aromatizante "Carro Novo"', price: 15.00, image: 'https://i.imgur.com/K8E84e6.png' },
  { id: 'p15', name: 'Balde para Lavagem (20L)', price: 40.00, image: 'https://i.imgur.com/2s42t6g.png' },
  { id: 'p16', name: 'Pincel de Detalhamento (Kit c/ 5)', price: 55.00, image: 'https://i.imgur.com/2s42t6g.png' },
  { id: 'p17', name: 'Toalha de Secagem "Waffle"', price: 79.90, image: 'https://i.imgur.com/2s42t6g.png' },
  { id: 'p18', name: 'Aplicador de Espuma (Kit c/ 3)', price: 19.90, image: 'https://i.imgur.com/2s42t6g.png' },
  { id: 'p19', name: 'Removedor de Chuva Ácida', price: 69.90, image: 'https://i.imgur.com/K8E84e6.png' },
  { id: 'p20', name: 'Limpador de Estofados a Seco', price: 48.00, image: 'https://i.imgur.com/K8E84e6.png' },
  { id: 'p21', name: 'Polidor de Metais (Cromo e Alumínio)', price: 62.00, image: 'https://i.imgur.com/7gKss8a.png' },
  { id: 'p22', name: 'Boina de Lã para Polimento', price: 35.00, image: 'https://i.imgur.com/2s42t6g.png' },
  { id: 'p23', name: 'Fita Crepe para Mascaramento', price: 12.00, image: 'https://i.imgur.com/7gKss8a.png' },
  { id: 'p24', name: 'Bolsa Organizadora para Porta-malas', price: 85.00, image: 'https://i.imgur.com/2s42t6g.png' },
  { id: 'p25', name: 'Aspirador de Pó Portátil 12V', price: 150.00, image: 'https://i.imgur.com/7gKss8a.png' },
  { id: 'p26', name: 'Limpador de Ar Condicionado (Granada)', price: 39.90, image: 'https://i.imgur.com/K8E84e6.png' },
  { id: 'p27', name: 'Cristalizador de Para-brisa', price: 42.00, image: 'https://i.imgur.com/K8E84e6.png' },
  { id: 'p28', name: 'Removedor de Piche e Cola', price: 45.00, image: 'https://i.imgur.com/K8E84e6.png' },
  { id: 'p29', name: 'Protetor UV para Painel', price: 52.00, image: 'https://i.imgur.com/K8E84e6.png' },
  { id: 'p30', name: 'Capa Protetora para Carro (Tamanho M)', price: 199.90, image: 'https://i.imgur.com/2s42t6g.png' },
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