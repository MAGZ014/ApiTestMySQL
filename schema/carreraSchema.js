import z from "zod";

const carreraSchema = z.object({
  nombre: z.string(),
  icono: z.string(),
});

export function validateCarrera(input) {
  return carreraSchema.safeParse(input);
}

export function validatePartialCarrera(input) {
  return carreraSchema.partial().safeParse(input);
}
