import z from "zod";

const equipoSchema = z.object({
  datos: z.string(),
  url: z.string().url(),
  img_url: z.string().url(),
  price: z.number(),
  reviews: z.number(),
  rating: z.number(),
  id_tipo_material: z.number(),
});

export function validateEquipo(input) {
  return equipoSchema.safeParse(input);
}

export function validatePartialEquipo(input) {
  return equipoSchema.partial().safeParse(input);
}
