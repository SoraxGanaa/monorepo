import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const food = await prisma.category.upsert({
    where: { name: "Food" },
    update: {},
    create: { name: "Food" },
  });

  const businessData = [
    {
      name: "Modern Nomads",
      description: "Монгол үндэсний хоолны сүлжээ ресторан.",
      address: "УБ, СБД, 1-р хороо",
      phone: "99112233",
      email: "info@modernnomads.mn",
      website: "https://modernnomads.mn",
      location: "47.9223, 106.9170",
      facebookUrl: "https://facebook.com/modernnomads",
      instagramUrl: "https://instagram.com/modernnomads",
      timetable: "10:00–22:00",
      logoUrl:
        "https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/nomads_logo.png",
      categoryId: food.id,
    },
    {
      name: "BDS Mongolian BBQ",
      description: "Монгол грилл, олон улсын сонирхолтой хоолтой.",
      address: "УБ, ХУД, 15-р хороо",
      phone: "99001122",
      email: "info@bdsmongolia.mn",
      website: "https://bdsmongolia.mn",
      location: "47.9145, 106.9150",
      facebookUrl: "https://facebook.com/bdsmongolia",
      instagramUrl: "https://instagram.com/bdsmongolia",
      timetable: "11:00–23:00",
      logoUrl:
        "https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/8c0058533b75d83074fb2d54b41789f8.jpg",
      categoryId: food.id,
    },
    {
      name: "Khaan Deli",
      description: "Орчин үеийн монгол болон европ хоолны ресторан.",
      address: "УБ, БЗД, 4-р хороо",
      phone: "99115566",
      email: "contact@khaandeli.mn",
      website: "https://khaandeli.mn",
      location: "47.9260, 106.9300",
      facebookUrl: "https://facebook.com/khaandeli",
      instagramUrl: "https://instagram.com/khaandeli",
      timetable: "09:00–22:00",
      logoUrl:
        "https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/300786139_533820001877874_8270612961028424860_n.jpg",
      categoryId: food.id,
    },
  ];

  for (const b of businessData) {
    await prisma.business.upsert({
      where: { name: b.name },
      update: b,
      create: b,
    });
  }

  console.log("✅ Seed completed:", businessData.length);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => prisma.$disconnect());
