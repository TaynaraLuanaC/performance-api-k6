export function generateProduct() {
  const randomId = Math.floor(Math.random() * 1000000);

  return {
    name: `Produto_${randomId}`,
    price: Math.floor(Math.random() * 1000) + 1,
    category: "Teste",
    quantity: Math.floor(Math.random() * 100) + 1,
    description: "Produto gerado para teste de performance",
    manufacturer: "Teste",
  };
}
