import { z } from "zod";


export const signUpValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(3, "First name must be at least 3 characters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(3, "Last name must be at least 3 characters"),

  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can contain only letters, numbers, and underscores"
    ),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),

  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),

  gender: z
    .string()
    .min(1, "Gender is required")
    .refine(
      (value) => ["male", "female", "other"].includes(value),
      "Please select a valid gender"
    ),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine(
      (value) => !isNaN(Date.parse(value)),
      "Please enter a valid date"
    ),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must be at most 50 characters"),
});


export const signInValidationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const contactSchema = z.object({

  name: z.string().min(1, "name is required"),
  email: z.string().email("enter a valid email address"),
  subject: z.string().min(1, "subject is required"),
  message: z.string().min(1, "message is required"),

});


export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),

  image_url: z.string().url("Enter a valid image URL"),

  current_price: z
    .number()
    .min(0, "Must be >= 0"),

  original_price: z
    .number()
    .min(2, "Must be >= 0"),

  discount_percent: z
    .union([z.number()])
    .optional(),

  category_slugs: z
    .array(z.string())
    .min(1, "Select at least one category"),

  section_slugs: z
    .array(z.string())
    .min(1, "Select at least one category"),
});

export type ProductFormValues = z.infer<typeof productSchema>;