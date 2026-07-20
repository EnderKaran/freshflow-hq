import "dotenv/config";

export default { // eslint-disable-line import/no-anonymous-default-export
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  },
};