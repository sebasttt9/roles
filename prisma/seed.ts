import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    await prisma.user.upsert({
        where: { email: 'admin@admin.com' },
        update: {},
        create: {
            email: 'admin@admin.com',
            password: adminPassword,
            role: 'ADMIN',  
    },
    });

    await prisma.user.upsert({
        where: { email: 'user@user.com' },
        update: {},
        create: {
            email: 'user@user.com',
            password: userPassword,
            role: 'USER',   
    },
    });

    console.log('🔐 Usuarios sembrados correctamente');
}   

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
    prisma.$disconnect();
    });
