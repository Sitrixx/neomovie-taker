import * as z from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "Veuillez entrez un email" }),
  password: z.string({ required_error: "Veuillez rentrez un mot de passe" }),
});

export const registerSchema = z
  .object({
    name: z.string({ required_error: "Please enter a username." }).min(3, {
      message: "Your username should be at least 3 characters long.",
    }),
    email: z
      .string({ required_error: "Please enter an email address." })
      .email("Please enter a valid email address."),
    password: z
      .string({
        required_error: "Please enter a password.",
      })
      .min(8, {
        message: "The password should be 8 characters long.",
      })
      .max(100)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
        message:
          "The password should be 8 characters long with at least one uppercase letter, one lowercase, one digit and one special character.",
      }),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => confirmPassword === password, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export type TRegisterSchema = z.infer<typeof registerSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;
