import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';

const mockProduct = {
  id: 1,
  name: 'Producto de prueba',
  price: 99.99,
  description: 'Descripción de prueba',
};

const mockPrismaService = {
  product: {
    create: jest.fn().mockResolvedValue(mockProduct),
    findMany: jest.fn().mockResolvedValue([mockProduct]),
    findUnique: jest.fn().mockResolvedValue(mockProduct),
    update: jest.fn().mockResolvedValue(mockProduct),
    delete: jest.fn().mockResolvedValue(mockProduct),
  },
};

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a product', async () => {
      const dto = { name: 'Producto de prueba', price: 99.99 } as any;
      const result = await service.create(dto);
      
      expect(result).toEqual(mockProduct);
      expect(prisma.product.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = await service.findAll();
      
      expect(result).toEqual([mockProduct]);
      expect(prisma.product.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single product by id', async () => {
      const result = await service.findOne(1);
      
      expect(result).toEqual(mockProduct);
      expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('update', () => {
    it('should update a product successfully', async () => {
      const updateDto = { name: 'Producto actualizado' };
      const result = await service.update(1, updateDto);
      
      expect(result).toEqual(mockProduct);
      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a product successfully', async () => {
      const result = await service.remove(1);
      
      expect(result).toEqual(mockProduct);
      expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});