import type { User } from "@/composables/users/useUsersQuery";

declare module '@formkit/inputs' {
    interface FormKitInputProps<Props extends FormKitInputProps<Props>> {
      // This key and the `type` should match:
      'userSelect': {
        // Define your input `type`:
        type: 'userSelect',
        value?: User | null,
        label?: string,
      }
    }
  }
