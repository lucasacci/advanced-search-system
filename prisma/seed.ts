import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// Predefined categories
const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
  'Beauty',
  'Health',
  'Automotive',
  'Jewelry',
];

// Predefined locations
const locations = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
];

// Predefined tags
const allTags = [
  'new',
  'sale',
  'popular',
  'trending',
  'limited',
  'exclusive',
  'premium',
  'budget',
  'featured',
  'best-seller',
  'discounted',
  'outlet',
  'clearance',
  'seasonal',
  'holiday',
];

// Function to generate a random product
function generateRandomProduct() {
  // Select random category and location
  const category = faker.helpers.arrayElement(categories);
  const location = faker.helpers.arrayElement(locations);
  
  // Generate name based on category
  const name = `${faker.commerce.productAdjective()} ${faker.commerce.product()} ${faker.commerce.productName()}`;
  
  // Generate description
  const description = faker.commerce.productDescription();
  
  // Generate price between 10 and 1000
  const price = parseFloat(
    faker.commerce.price({ min: 10, max: 1000, dec: 2 }),
  );
  
  // Generate stock between 0 and 100
  const stock = faker.number.int({ min: 0, max: 100 });
  
  // Select 2-5 random tags
  const numTags = faker.number.int({ min: 2, max: 5 });
  const tags = faker.helpers.arrayElements(allTags, numTags);
  
  return {
    name,
    description,
    category,
    location,
    price,
    stock,
    tags,
  };
}

async function main() {
  console.log('🌱 Starting product seeding...');
  
  // Clean database
  await prisma.product.deleteMany();
  console.log('🗑️ Database cleaned');
  
  // Generate 1000 products
  const products = Array.from({ length: 1000 }, generateRandomProduct);
  
  // Insert products in batches of 100 for better performance
  const batchSize = 100;
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    await prisma.product.createMany({
      data: batch,
    });
    console.log(
      `✅ Batch ${i / batchSize + 1} of ${Math.ceil(products.length / batchSize)} inserted`,
    );
  }
  console.log('✅ Seeding completed successfully');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
