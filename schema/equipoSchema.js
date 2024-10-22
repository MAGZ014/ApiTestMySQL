import z from "zod";

const equipoSchema = z.object({
  nombre: z.string(),
  marca: z.string(),
  modelo: z.string(),
  gama: z.string(),
  descripcion: z.string(),
  precio: z.string(),
  puntoVenta: z.string().url(),
});

export function validateEquipo(input) {
  return equipoSchema.safeParse(input);
}

export function validatePartialEquipo(input) {
  return equipoSchema.partial().safeParse(input);
}
