import z from "zod";

const carreraSchema = z.object({
  carrera: z.string(),
  descripcion: z.string(),
});

export function validateCarrera(input) {
  return carreraSchema.safeParse(input);
}

export function validatePartialCarrera(input) {
  return carreraSchema.partial().safeParse(input);
}
