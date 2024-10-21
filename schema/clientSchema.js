import z from "zod";

const clientSchema = z.object({
  ClientesNombre: z.string(),
  ClientesDireccion: z.string(),
  ClientesTelefono: z.string(),
  ClientesCelular: z.string(),
  ClientesMail: z.string().email(),
  ClientesObservaciones: z.string(),
  clientesFrec: z.string(),
});

export function validateClient(input) {
  return clientSchema.safeParse(input);
}

export function validatePartialClient(input) {
  return clientSchema.partial().safeParse(input);
}
